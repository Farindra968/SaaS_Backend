// auth.routes.ts
import express, { Router } from "express"

import { authLogin, authRegister } from "../../../controller/global/auth/auth.controller";

const router:Router = express.Router()

router.route("/register").post(authRegister);
router.route("/login").post(authLogin)

export default router;
