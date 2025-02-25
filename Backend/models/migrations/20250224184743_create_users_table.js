export const up = (knex) =>
  knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("contact").unique().notNullable();
    table.string("username").unique().notNullable();
    table.string("password").notNullable();
    table.string("email").notNullable();
    table.string("role").notNullable();
    table.timestamps(true, true);
  });

export const down = (knex) => knex.schema.dropTable("users");
