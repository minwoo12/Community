import routes from "./router";

const localMiddleware = (req, res, next) => {
  res.locals.siteName = "minwoo";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user;
  next();
};

export default localMiddleware;
