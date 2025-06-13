
import express, { Router } from "express";
import InstituteController from "../../controller/institute/institute.controller";

const router:Router = express.Router();

router.route("/").post(InstituteController.createInstitute)

export default router