require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL || "postgresql://user:password@localhost:5432/taskmanager",
    dialect: "postgres"
  },
  test: {
    url: process.env.DATABASE_URL || "postgresql://user:password@localhost:5432/taskmanager_test",
    dialect: "postgres"
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres"
  }
};
