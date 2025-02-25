export default {
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "qwerty",
    database: "project_migration",
  },
  migrations: {
    directory: "./models/migrations",
  },
  seeds: {
    directory: "./seeds",
  },
};
