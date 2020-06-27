import express from "express";
import routes from "../router";
import { me, avatarUpload } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.me(), me);

userRouter.get(routes.avatar, avatarUpload);

export default userRouter;
