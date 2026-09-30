import { verifyAccessToken } from '../modules/auth/tokenService.js';

export async function requireAuth(request, response, next) {
  const authorization = request.headers.authorization;

  if (!authorization?.startsWith('Bearer ')) {
    return response.status(401).json({
      error: 'AUTHENTICATION_REQUIRED',
      message: 'A valid access token is required.'
    });
  }

  const token = authorization.slice('Bearer '.length);

  try {
    const payload = await verifyAccessToken(token);

    if (!payload.sub) {
      return response.status(401).json({
        error: 'INVALID_ACCESS_TOKEN',
        message: 'The access token does not contain a user.'
      });
    }

    request.user = {
      id: payload.sub,
      email: payload.email,
      name: payload.name
    };

    next();
  } catch {
    response.status(401).json({
      error: 'INVALID_ACCESS_TOKEN',
      message: 'The access token is invalid or expired.'
    });
  }
}