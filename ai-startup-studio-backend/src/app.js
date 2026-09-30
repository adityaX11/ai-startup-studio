import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { checkDatabaseConnection } from './db/client.js';

export function createApp() {
  const app = express();
  const allowedOrigin =
    process.env.CORS_ORIGIN || 'http://localhost:5173';

  app.disable('x-powered-by');

  app.use(helmet());

  app.use(
    cors({
      origin: allowedOrigin,
      credentials: true
    })
  );

  app.use(express.json({ limit: '1mb' }));

  app.use(
    morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev')
  );

  app.get('/', (_request, response) => {
    response.json({
      status: 'ok',
      service: 'ai-startup-studio-backend',
      message: 'API is running',
      endpoints: {
        health: '/api/health',
        readiness: '/api/ready'
      }
    });
  });

  app.get('/api/health', (_request, response) => {
    response.json({
      status: 'ok',
      service: 'ai-startup-studio-backend',
      timestamp: new Date().toISOString()
    });
  });

  app.get('/api/ready', async (_request, response) => {
    try {
      await checkDatabaseConnection();

      response.status(200).json({
        status: 'ready',
        database: 'available',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Database readiness check failed:', error.message);

      response.status(503).json({
        status: 'not_ready',
        database: 'unavailable',
        error: 'DATABASE_UNAVAILABLE',
        message:
          process.env.NODE_ENV === 'development'
            ? error.message
            : 'Database is currently unavailable.'
      });
    }
  });

  app.use((_request, response) => {
    response.status(404).json({
      error: 'NOT_FOUND',
      message: 'The requested resource was not found.'
    });
  });

  app.use((error, _request, response, _next) => {
    console.error('Unhandled server error:', error);

    response.status(500).json({
      error: 'INTERNAL_SERVER_ERROR',
      message:
        process.env.NODE_ENV === 'development'
          ? error.message
          : 'An unexpected server error occurred.'
    });
  });

  return app;
}