import express from "express";
import ActivityController from "../controllers/ActivityController.mjs";

const router = express.Router();

// router.get('/activities/:id', ActivityController.getAll);
router.get('/activities', ActivityController.getAll);

router.post('/activities', ActivityController.add);

router.delete('/activities/:id', ActivityController.remove);

router.put('/activities/:id', ActivityController.update);

export default router;