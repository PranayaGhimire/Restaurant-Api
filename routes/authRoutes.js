import express from "express";
import { login, register } from "../controllers/authController.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post('/register',upload.none(),register);
router.post('/login',upload.none(),login);

export default router;