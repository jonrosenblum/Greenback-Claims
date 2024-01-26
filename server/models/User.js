const pgp = require('pg-promise')();
const db = pgp('postgres://jonrosenblum:Jnrsnblm1!@localhost:5432/greenbackclaims');

const createUserTable = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
  )
`;

db.none(createUserTable)
  .then(() => {
    console.log('User table created successfully');
  })
  .catch(error => {
    console.error('Error creating user table:', error);
  });

module.exports = db;
