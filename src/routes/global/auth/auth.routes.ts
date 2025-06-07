// auth.routes.ts
import express, { Router } from "express"

import authController from "../../../controller/global/auth/auth.controller";

const router:Router = express.Router()

router.route("/register").post(authController.authRegister);
router.route("/login").post(authController.authlogin)

export default router;
