import express from "express";
import ProjectController from "../controllers/ProjectController.mjs";

const router = express.Router();

router.get('/projects/:id', ProjectController.getAll);

router.post('/projects', ProjectController.add);

export default router;