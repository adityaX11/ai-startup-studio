import { checkDatabaseConnection, pool } from './client.js';

try {
  const databaseInfo = await checkDatabaseConnection();

  console.log('PostgreSQL connection is working.');
  console.table(databaseInfo);
} catch (error) {
  console.error('PostgreSQL diagnostic failed:', error.message);
  console.error('Verify DATABASE_URL and Docker port mapping.');
  process.exitCode = 1;
} finally {
  await pool.end();
}