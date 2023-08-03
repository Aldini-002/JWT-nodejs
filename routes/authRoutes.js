import { Router } from "express";
import * as authController from "../controllers/authController.js";

const router = Router();

// auth
router.get("/signup", authController.signup);
router.post("/signup", authController.signupPost);
router.get("/signin", authController.signin);
router.post("/signin", authController.signinPost);
router.get("/signout", authController.signout);

export default router;
