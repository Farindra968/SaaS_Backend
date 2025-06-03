// auth.routes.ts
import express, { Router } from "express"

import { authRegister } from "../../../controller/global/auth/auth.controller";

const router:Router = express.Router()

router.route("/register").post(authRegister);

export default router;
