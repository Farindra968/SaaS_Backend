import express from "express";
import { getUser } from "../controller/user.controller";

const Router = express.Router();

// User Routes
Router.route("/").get(getUser)


export default Router;