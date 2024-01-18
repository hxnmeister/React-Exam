import express from "express";
import ActivityController from "../controllers/ActivityController.mjs";

const router = express.Router();

router.get('/activities', ActivityController.getAll);

router.post('/activities', ActivityController.add);

export default router;