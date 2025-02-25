import knex from "knex";
import knexConfig from "./knexfile.js";

// Step 1: Initialize Knex without specifying the database (for creating the database)
const knexInstance = knex({
  ...knexConfig,
  connection: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    // No database specified here yet
  },
});

// Step 2: Create the database if it doesn't exist
const createDatabase = async () => {
  try {
    await knexInstance.raw(`CREATE DATABASE IF NOT EXISTS project_migration`);
    console.log("Database created or already exists");

    knexInstance.destroy(); // Close the initial connection

    // Step 3: Reconnect to the newly created database
    const knexWithDb = knex({
      ...knexConfig,
      connection: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: "project_migration", // Now specify the new database
      },
    });
    // Step 4: Run migrations
    knexWithDb.migrate
      .latest()
      .then(() => {
        console.log("Migrations applied successfully");
        knexWithDb.destroy(); // Close the connection after migrations
      })
      .catch((err) => {
        console.error("Error running migrations:", err);
        knexWithDb.destroy(); // Close the connection on error
      });

    // Export the knex instance for use across the application
    return knexWithDb;
  } catch (error) {
    console.error("Error creating the database:", error);
    knexInstance.destroy();
    throw error; // Re-throw the error if necessary
  }
};

export default await createDatabase(); // This will return the knex instance connected to the database
