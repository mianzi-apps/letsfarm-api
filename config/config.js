require('dotenv').config();
const env={
  "development": {
    "use_env_variable": "DATABASE_URL",
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql",
  },
  "test": {
    "use_env_variable": "TEST_DATABASE_URL",
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
};

module.exports = env;
