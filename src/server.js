const knex = require('knex');
const app = require('./app.js');
const {PORT,DATABASE_URL} = require('./config.js');

const db = knex({
  client: 'pg',
  connection: DATABASE_URL
});

app.set('db', db);

app.listen(process.env.PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});
