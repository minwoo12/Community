import express from "express";
import routes from "../router";
import {
  home,
  search,
  signUp,
  login,
  postLogin,
  logout,
  postSignUp
} from "../controllers/globalController";
import { onlyPublic, onlyPrivate } from "../middleware";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.search, search);

globalRouter.get(routes.signUp, onlyPublic, signUp);
globalRouter.post(routes.signUp, onlyPublic, postSignUp);

globalRouter.get(routes.login, onlyPublic, login);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);

export default globalRouter;
