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

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.search, search);

globalRouter.get(routes.signUp, signUp);
globalRouter.post(routes.signUp, postSignUp);

globalRouter.get(routes.login, login);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.logout, logout);

export default globalRouter;
