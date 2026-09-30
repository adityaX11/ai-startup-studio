import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required');
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000
});

pool.on('error', (error) => {
  console.error('Unexpected PostgreSQL pool error:', error.message);
});

export async function checkDatabaseConnection() {
  const result = await pool.query(`
    SELECT
      1 AS ok,
      current_user,
      current_database(),
      inet_server_addr() AS server_address,
      inet_server_port() AS server_port
  `);

  return result.rows[0];
}