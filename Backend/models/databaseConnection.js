import mysql from "mysql2";
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

pool
  .getConnection()
  .then((connection) => {
    console.log("Database connected");
    connection.release();
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
  });

export default pool;
