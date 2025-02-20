import { createProject } from "../models/queries.js";

export const newProject = async (req, res) => {
  try {
    const {
      name,
      intro,
      ownerId,
      status,
      startDateTime,
      endDateTime,
      projectMembers,
    } = req.body;

    createProject(
      name,
      intro,
      ownerId,
      status,
      startDateTime,
      endDateTime,
      projectMembers
    ).then((result) => {
      if (result.success) {
        res.status(200).json({ message: "Project created successfully!" });
      } else {
        res.status(500).json({ message: result.message });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
