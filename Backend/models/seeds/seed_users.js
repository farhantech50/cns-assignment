export const seed = async (knex) => {
  await knex("users").insert([
    {
      name: "Farhan",
      contact: "1234567890",
      username: "admin",
      password: "0000",
      email: "alice@example.com",
      role: "admin",
    },
    {
      name: "Hasib",
      contact: "9876543210",
      username: "hasib",
      password: "0000",
      email: "bob@example.com",
      role: "user",
    },
  ]);
};
