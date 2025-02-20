import express from "express";
import { newProject, projectById } from "../controller/project.controller.js";
import { authenticate, adminAllowed } from "../middleware/protect.js";
const router = express.Router();

router.post("/newProject", newProject);
router.get("/projectById/:id", projectById);

export default router;
