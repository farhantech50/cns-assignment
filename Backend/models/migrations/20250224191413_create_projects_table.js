export const up = (knex) =>
  knex.schema.createTable("projects", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("intro").notNullable();
    table.integer("owner_id").unsigned().notNullable(); // Ensure this matches the type of `users.id`
    table.string("status").notNullable();
    table.date("startDateTime");
    table.date("endDateTime");

    // Foreign key relationship
    table
      .foreign("owner_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });

export const down = (knex) => knex.schema.dropTable("projects");
