import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { localAuth } from "../passport/auth.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login",localAuth)
export default router;
