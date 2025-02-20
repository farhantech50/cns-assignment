import pool from "./databaseConnection.js";
import bcrypt from "bcryptjs";

export async function createUser(
  name,
  contact,
  username,
  password,
  email,
  role
) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      `
      INSERT INTO users (name, contact, username, password, email, role)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [name, contact, username, hashedPassword, email, role]
    );
    return { success: true, userId: result.insertId };
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      // MySQL error code for duplicate entry
      return { success: false, message: "Username already exists!" };
    }
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function getUserByUsername(userName) {
  const [rows] = await pool.query(
    `
  SELECT * 
  FROM users
  WHERE username = ?
  `,
    [userName]
  );
  return rows[0];
}
export async function getAllUsers() {
  const [rows] = await pool.query(
    `
  SELECT * 
  FROM users
  `
  );
  return rows;
}

export async function createProject(
  name,
  intro,
  ownerId,
  status,
  startDateTime,
  endDateTime,
  projectMembers
) {
  try {
    return pool
      .query(
        `
      INSERT INTO projects (name, intro, owner_id, status, startDateTime, endDateTime)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
        [name, intro, ownerId, status, startDateTime, endDateTime]
      )
      .then(async (res) => {
        const values = projectMembers.map((userId) => [
          res[0].insertId,
          userId,
        ]);
        return pool.query(
          `
        INSERT INTO project_members (project_id, user) VALUES ?
        `,
          [values]
        );
      })
      .then((res) => {
        // Check if affectedRows is greater than 0, indicating success
        if (res[0].affectedRows > 0) {
          return { success: true };
        } else {
          return {
            success: false,
            message: "No members were added to the project",
          };
        }
      });
  } catch (error) {
    console.error("Error creating project:", error);
    return { success: false, message: "Error creating project" };
  }
}
export async function findProjectById(id) {
  const [rows] = await pool.query(
    `
    SELECT * FROM projects 
    WHERE owner_id = ${id}
  `
  );
  return { success: true, message: rows };
}

export async function findProjectMembers(id) {
  const [rows] = await pool.query(
    `
    SELECT users.name
    FROM project_members 
    JOIN projects ON project_members.project_id = projects.id
    JOIN users ON project_members.user = users.id
    WHERE projects.id = ${id};
  `
  );
  let memberNames = [];
  rows.map((data) => {
    memberNames.push(data.name);
  });
  return { success: true, message: memberNames };
}

export async function findAllProject() {
  const [rows] = await pool.query(
    `
  SELECT * 
  FROM projects
  `
  );
  return { success: true, message: rows };
}
