import { Router } from "express";
import * as cookiesController from "../controllers/cookiesController.js";

const router = Router();

router.get("/cookies-set", cookiesController.cookiesSet);
router.get("/cookies-get", cookiesController.cookiesGet);

export default router;
