import dotenv from 'dotenv';

dotenv.config();

const port = Number(process.env.PORT || 4000);

const { createApp } = await import('./app.js');

const app = createApp();

app.listen(port, () => {
  console.log(
    `AI Startup Studio backend running at http://localhost:${port}`
  );
});