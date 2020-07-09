import routes from "./router";
import multer from "multer";

const multerUpload = multer({ dest: "upload/avatar" });

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "minwoo";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user;
  next();
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const avatarUpload = multerUpload.single("avatar");
