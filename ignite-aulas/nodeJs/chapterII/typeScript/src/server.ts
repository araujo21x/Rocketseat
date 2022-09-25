import app from './app';
import database from './database';

database.initialize().then(() => {
  console.log(`serve on: ${process.env.PORT}`);
  app.listen(process.env.PORT);
});
