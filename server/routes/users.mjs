import express from "express";
import UserController from "../controllers/UserController.mjs";

const router = express.Router();

router.get('/users', UserController.getAll);

export default router;