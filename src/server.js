const knex = require('knex');
const app = require('./app.js');
const {PORT,DATABASE_URL} = require('./config.js');

const db = knex({
  client: 'pg',
  connection: "postgres://hjmrhidldqjlac:735e546cb2ecd38acd81afc1d21caeb85b50d563b6e5ccee45fe740b85ae1ed9@ec2-23-21-229-200.compute-1.amazonaws.com:5432/d9ruaatoggduqh?ssl=true"
});

app.set('db', db);

app.listen(process.env.PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});
