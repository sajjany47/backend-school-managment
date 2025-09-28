import express from "express";
import { UserSignUp } from "./user.controller";

const UserRoutes = express.Router();

UserRoutes.route("/register").post(UserSignUp);

export default UserRoutes;
