export const seed = async (knex) => {
  // Delete existing rows
  await knex("projects").del();

  // Insert new seed entries
  await knex("projects").insert([
    {
      name: "Project Alpha",
      intro: "This is the first project focused on AI development.",
      owner_id: 1, // Make sure this owner_id exists in the users table
      status: "pre",
      startDateTime: null,
      endDateTime: "2025-12-31",
    },
    {
      name: "Project Beta",
      intro: "A project aimed at developing new marketing strategies.",
      owner_id: 2, // Make sure this owner_id exists in the users table
      status: "start",
      startDateTime: "2025-02-01",
      endDateTime: "2025-08-31",
    },
    {
      name: "Project Gamma",
      intro: "A collaborative project for enhancing customer experience.",
      owner_id: 1, // Make sure this owner_id exists in the users table
      status: "end",
      startDateTime: "2025-03-01",
      endDateTime: "2025-11-30",
    },
  ]);
};
