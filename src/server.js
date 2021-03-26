const knex = require('knex');
const app = require('./app.js');
const config = require('./config.js');
const PORT = config.PORT;
//, DATABASE_URL 

// const db = knex({
//   client: 'pg',
//   connection: DATABASE_URL
// });

// app.set('db', db);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
