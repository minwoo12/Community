import express from "express";
import routes from "../router";
import {
  me,
  avatarEdit,
  postAvatarEdit,
  userEdit,
  changePassword,
  postUserEdit,
  postChangePassword,
  userDetail
} from "../controllers/userController";
import { avatarUpload, onlyPrivate } from "../middleware";

const userRouter = express.Router();

userRouter.get(routes.me(), onlyPrivate, me);

userRouter.get(routes.avatar, onlyPrivate, avatarEdit);

userRouter.post(routes.avatar, onlyPrivate, avatarUpload, postAvatarEdit);

userRouter.get(routes.changePassword, onlyPrivate, changePassword);

userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);

userRouter.get(routes.userDetail(), userDetail);

userRouter.get(routes.userEdit(), onlyPrivate, userEdit);

userRouter.post(routes.userEdit(), onlyPrivate, postUserEdit);

export default userRouter;
