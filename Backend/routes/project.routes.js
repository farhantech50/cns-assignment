import express from "express";
import { newProject } from "../controller/project.controller.js";
import { authenticate, adminAllowed } from "../middleware/protect.js";
const router = express.Router();

router.post("/newProject", newProject);

export default router;
