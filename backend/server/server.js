const express = require('express');
const { client,
   // createTables
} = require('./db');

const app = express();

app.use(express.json());

const init = async() => {
  await client.connect();
//   console.log('connected to the database');
//   await createTables();
//   console.log('tables created');

  app.listen(3000, () => {
    console.log('server is listening on port 3000!');
  });
};
init();