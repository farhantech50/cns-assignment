import express from "express";
import {
  newProject,
  projectById,
  projectMembers,
  allProject,
} from "../controller/project.controller.js";
import { authenticate, adminAllowed } from "../middleware/protect.js";
const router = express.Router();

router.post("/newProject", newProject);
router.get("/allProject", allProject);
router.get("/projectById/:id", projectById);
router.get("/projectMember/:id", projectMembers);

export default router;
