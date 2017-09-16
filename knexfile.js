'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/hh-challenge-dev'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
