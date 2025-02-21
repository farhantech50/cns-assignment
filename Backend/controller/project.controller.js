import {
  createProject,
  findProjectById,
  findProjectMembers,
  findAllProject,
  deleteProjectById,
} from "../models/queries.js";
import { getUserByID } from "../models/queries.js";

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

    const result = await createProject(
      name,
      intro,
      ownerId,
      status,
      startDateTime,
      endDateTime,
      projectMembers
    );

    if (result.success) {
      return res.status(200).json({ message: "Project created successfully!" });
    } else {
      return res.status(500).json({ message: result.message });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internaadasdsl Server Error",
      error: error.message || "Unknown error",
    });
  }
};

export const projectById = async (req, res) => {
  const { id } = req.params;
  try {
    findProjectById(id).then(async (result) => {
      const updated = await Promise.all(
        result.message.map(async (data) => {
          const ownerName = await getUserByID(data.owner_id);
          return { ...data, owner_id: ownerName };
        })
      );
      if (result.success) {
        res.status(200).json({ message: updated });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const allProject = async (req, res) => {
  try {
    findAllProject().then(async (result) => {
      const updated = await Promise.all(
        result.message.map(async (data) => {
          const ownerName = await getUserByID(data.owner_id);
          return { ...data, owner_id: ownerName };
        })
      );
      if (result.success) {
        res.status(200).json({ message: updated });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const projectMembers = async (req, res) => {
  const { id } = req.params;

  try {
    findProjectMembers(id).then((result) => {
      if (result.success) {
        res.status(200).json({ message: result.message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    deleteProjectById(id).then((result) => {
      if (result.success) {
        res.status(200).json({ message: result.message });
      } else {
        res.status(500).json({ message: result.message });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
