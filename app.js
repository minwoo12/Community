import path from "path";
import express from "express";
import routes from "./router";
import helmet from "helmet";
import logger from "morgan";
import middleware from "./middleware";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

import "./passport";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

import boardRouter from "./routes/boardRouter";
import globalRouter from "./routes/globalRouter";
import userRouter from "./routes/userRouter";
import apiRouter from "./routes/apiRouter";

const app = express();

const CokieStore = MongoStore(session);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, `views/pages`));

app.use(helmet());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CokieStore({ mongooseConnection: mongoose.connection })
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/static", express.static("static"));

app.use(middleware);

app.use(routes.home, globalRouter);
app.use(routes.board, boardRouter);
app.use(routes.user, userRouter);
app.use(routes.api, apiRouter);

export default app;
