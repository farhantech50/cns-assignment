export const up = (knex) =>
  knex.schema.createTable("project_members", (table) => {
    table.increments("id").primary();
    table.integer("project_id").unsigned().notNullable();
    table.integer("user").unsigned().notNullable();

    // Foreign key relationship
    table
      .foreign("project_id")
      .references("id")
      .inTable("projects")
      .onDelete("CASCADE");

    table.foreign("user").references("id").inTable("users").onDelete("CASCADE");
  });

export const down = (knex) => knex.schema.dropTable("project_members");
