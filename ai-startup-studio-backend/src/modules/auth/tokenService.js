import { SignJWT, jwtVerify } from 'jose';

import {
  createOpaqueToken,
  hashToken
} from '../../utils/crypto.js';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

if (!accessTokenSecret) {
  throw new Error('ACCESS_TOKEN_SECRET is required');
}

if (!refreshTokenSecret) {
  throw new Error('REFRESH_TOKEN_SECRET is required');
}

const accessKey = new TextEncoder().encode(accessTokenSecret);
const refreshKey = new TextEncoder().encode(refreshTokenSecret);

export const refreshCookieName = 'ai_startup_refresh_token';

export function getRefreshCookieOptions() {
  const isProduction = process.env.NODE_ENV === 'production';
  const secureCookie = process.env.COOKIE_SECURE === 'true';

  return {
    httpOnly: true,
    secure: secureCookie || isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    path: '/api/auth',
    maxAge: 7 * 24 * 60 * 60 * 1000
  };
}

export async function createAccessToken(user) {
  return new SignJWT({
    email: user.email,
    name: user.displayName
  })
    .setProtectedHeader({
      alg: 'HS256',
      typ: 'JWT'
    })
    .setSubject(user.id)
    .setIssuer('ai-startup-studio-api')
    .setAudience('ai-startup-studio-web')
    .setIssuedAt()
    .setExpirationTime(
      process.env.ACCESS_TOKEN_EXPIRES_IN || '15m'
    )
    .sign(accessKey);
}

export async function verifyAccessToken(token) {
  const { payload } = await jwtVerify(token, accessKey, {
    issuer: 'ai-startup-studio-api',
    audience: 'ai-startup-studio-web'
  });

  return payload;
}

export async function createRefreshToken(userId) {
  const token = createOpaqueToken();
  const tokenHash = hashToken(token);

  const expiresAt = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000
  );

  return {
    token,
    tokenHash,
    userId,
    expiresAt
  };
}

export function hashRefreshToken(token) {
  return hashToken(token);
}