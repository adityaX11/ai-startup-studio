import {
  getUserById,
  loginUser,
  registerUser,
  revokeRefreshToken,
  rotateRefreshToken
} from './authService.js';

import {
  getRefreshCookieOptions,
  refreshCookieName
} from './tokenService.js';

function setRefreshCookie(response, token) {
  response.cookie(
    refreshCookieName,
    token,
    getRefreshCookieOptions()
  );
}

function clearRefreshCookie(response) {
  response.clearCookie(
    refreshCookieName,
    getRefreshCookieOptions()
  );
}

export async function register(request, response, next) {
  try {
    const result = await registerUser(request.body);

    setRefreshCookie(response, result.refreshToken);

    response.status(201).json({
      user: result.user,
      accessToken: result.accessToken
    });
  } catch (error) {
    next(error);
  }
}

export async function login(request, response, next) {
  try {
    const result = await loginUser(request.body);

    setRefreshCookie(response, result.refreshToken);

    response.json({
      user: result.user,
      accessToken: result.accessToken
    });
  } catch (error) {
    next(error);
  }
}

export async function me(request, response, next) {
  try {
    const user = await getUserById(request.user.id);

    if (!user) {
      return response.status(401).json({
        error: 'USER_NOT_FOUND',
        message: 'The authenticated user no longer exists.'
      });
    }

    response.json({ user });
  } catch (error) {
    next(error);
  }
}

export async function refresh(request, response, next) {
  try {
    const token = request.cookies[refreshCookieName];

    if (!token) {
      return response.status(401).json({
        error: 'REFRESH_TOKEN_REQUIRED',
        message: 'Refresh token is required.'
      });
    }

    const result = await rotateRefreshToken(token);

    setRefreshCookie(response, result.refreshToken);

    response.json({
      user: result.user,
      accessToken: result.accessToken
    });
  } catch (error) {
    next(error);
  }
}

export async function logout(request, response, next) {
  try {
    const token = request.cookies[refreshCookieName];

    await revokeRefreshToken(token);
    clearRefreshCookie(response);

    response.json({
      success: true
    });
  } catch (error) {
    next(error);
  }
}