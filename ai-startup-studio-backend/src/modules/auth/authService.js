import argon2 from 'argon2';

import { pool } from '../../db/client.js';
import {
  createAccessToken,
  createRefreshToken,
  hashRefreshToken
} from './tokenService.js';

function publicUser(row) {
  return {
    id: row.id,
    name: row.display_name,
    email: row.email
  };
}

function createAuthError(message, statusCode, code) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.code = code;
  return error;
}

export async function registerUser({ name, email, password }) {
  const passwordHash = await argon2.hash(password, {
    type: argon2.argon2id
  });

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const existingUser = await client.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rowCount > 0) {
      throw createAuthError(
        'An account with this email already exists.',
        409,
        'EMAIL_ALREADY_EXISTS'
      );
    }

    const result = await client.query(
      `
        INSERT INTO users (
          email,
          display_name,
          password_hash,
          auth_provider
        )
        VALUES ($1, $2, $3, 'local')
        RETURNING id, email, display_name
      `,
      [email, name, passwordHash]
    );

    const user = result.rows[0];
    const refreshToken = await createRefreshToken(user.id);

    await client.query(
      `
        INSERT INTO refresh_tokens (
          user_id,
          token_hash,
          expires_at
        )
        VALUES ($1, $2, $3)
      `,
      [
        refreshToken.userId,
        refreshToken.tokenHash,
        refreshToken.expiresAt
      ]
    );

    await client.query('COMMIT');

    const accessToken = await createAccessToken({
      id: user.id,
      email: user.email,
      displayName: user.display_name
    });

    return {
      user: publicUser(user),
      accessToken,
      refreshToken: refreshToken.token
    };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function loginUser({ email, password }) {
  const result = await pool.query(
    `
      SELECT id, email, display_name, password_hash
      FROM users
      WHERE email = $1
    `,
    [email]
  );

  const user = result.rows[0];

  if (!user || !user.password_hash) {
    throw createAuthError(
      'Invalid email or password.',
      401,
      'INVALID_CREDENTIALS'
    );
  }

  const passwordMatches = await argon2.verify(
    user.password_hash,
    password
  );

  if (!passwordMatches) {
    throw createAuthError(
      'Invalid email or password.',
      401,
      'INVALID_CREDENTIALS'
    );
  }

  const refreshToken = await createRefreshToken(user.id);

  await pool.query(
    `
      INSERT INTO refresh_tokens (
        user_id,
        token_hash,
        expires_at
      )
      VALUES ($1, $2, $3)
    `,
    [
      refreshToken.userId,
      refreshToken.tokenHash,
      refreshToken.expiresAt
    ]
  );

  const accessToken = await createAccessToken({
    id: user.id,
    email: user.email,
    displayName: user.display_name
  });

  return {
    user: publicUser(user),
    accessToken,
    refreshToken: refreshToken.token
  };
}

export async function getUserById(userId) {
  const result = await pool.query(
    `
      SELECT id, email, display_name
      FROM users
      WHERE id = $1
    `,
    [userId]
  );

  return result.rows[0] ? publicUser(result.rows[0]) : null;
}

export async function rotateRefreshToken(rawToken) {
  const tokenHash = hashRefreshToken(rawToken);
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const result = await client.query(
      `
        SELECT
          refresh_tokens.id AS refresh_token_id,
          refresh_tokens.user_id,
          users.email,
          users.display_name
        FROM refresh_tokens
        INNER JOIN users
          ON users.id = refresh_tokens.user_id
        WHERE refresh_tokens.token_hash = $1
          AND refresh_tokens.revoked_at IS NULL
          AND refresh_tokens.expires_at > NOW()
      `,
      [tokenHash]
    );

    const session = result.rows[0];

    if (!session) {
      throw createAuthError(
        'Invalid refresh token.',
        401,
        'INVALID_REFRESH_TOKEN'
      );
    }

    await client.query(
      `
        UPDATE refresh_tokens
        SET revoked_at = NOW()
        WHERE id = $1
      `,
      [session.refresh_token_id]
    );

    const nextRefreshToken = await createRefreshToken(
      session.user_id
    );

    await client.query(
      `
        INSERT INTO refresh_tokens (
          user_id,
          token_hash,
          expires_at
        )
        VALUES ($1, $2, $3)
      `,
      [
        nextRefreshToken.userId,
        nextRefreshToken.tokenHash,
        nextRefreshToken.expiresAt
      ]
    );

    await client.query('COMMIT');

    const user = {
      id: session.user_id,
      email: session.email,
      displayName: session.display_name
    };

    const accessToken = await createAccessToken(user);

    return {
      user: {
        id: user.id,
        name: user.displayName,
        email: user.email
      },
      accessToken,
      refreshToken: nextRefreshToken.token
    };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function revokeRefreshToken(rawToken) {
  if (!rawToken) {
    return;
  }

  await pool.query(
    `
      UPDATE refresh_tokens
      SET revoked_at = NOW()
      WHERE token_hash = $1
        AND revoked_at IS NULL
    `,
    [hashRefreshToken(rawToken)]
  );
}