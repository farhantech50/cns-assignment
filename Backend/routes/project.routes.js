import express from "express";
import {
  newProject,
  projectById,
  projectMembers,
  allProject,
  deleteProject,
  editProject,
} from "../controller/project.controller.js";
import { newPDF } from "../controller/pdf.controller.js";

import { authenticate, adminAllowed } from "../middleware/protect.js";
const router = express.Router();

//router.use(authenticate);
router.post("/newProject", newProject);
router.post("/editProject/:id", editProject);
router.delete("/deleteProject/:id", deleteProject);
router.get("/allProject", allProject);
router.get("/projectById/:id", projectById);
router.get("/projectMember/:id", projectMembers);
router.get("/generatePdf/:id", newPDF);

export default router;
