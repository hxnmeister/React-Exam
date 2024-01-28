import express from "express";
import ProjectController from "../controllers/ProjectController.mjs";

const router = express.Router();

router.get('/projects/:id', ProjectController.getAll);

router.post('/projects', ProjectController.add);
router.post('/add-to-project', ProjectController.addActivity);

export default router;