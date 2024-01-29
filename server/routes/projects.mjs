import express from "express";
import ProjectController from "../controllers/ProjectController.mjs";

const router = express.Router();

router.get('/projects/:id', ProjectController.getAll);

router.post('/projects', ProjectController.add);
router.post('/add-to-project', ProjectController.addActivity);

router.delete('/projects/:id', ProjectController.remove);

export default router;