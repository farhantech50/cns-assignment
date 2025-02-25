export const seed = async (knex) => {
  // Delete existing rows
  await knex("project_members").del();

  // Insert new seed entries
  await knex("project_members").insert([
    {
      project_id: 1,
      user: 1,
    },
    {
      project_id: 2,
      user: 2,
    },
    {
      project_id: 3,
      user: 2,
    },
    {
      project_id: 2,
      user: 1,
    },
  ]);
};
