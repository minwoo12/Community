import passport from "passport";
import routes from "../router";
import Board from "../models/Board";
import User from "../models/User";

export const home = (req, res) => {
  res.render("home", { pageTitle: "Home" });
};

export const search = async (req, res) => {
  const {
    query: { term }
  } = req;
  let boards = [];
  try {
    boards = await Board.find({
      title: { $regex: term, $options: "i" }
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", term, boards });
};

export const signUp = (req, res) => {
  res.render("signUp", { pageTitle: "signUp" });
};

export const postSignUp = async (req, res) => {
  const {
    body: { name, email, password, password2 }
  } = req;
  try {
    if (password !== password2) {
      res.status(400);
      res.render("signUp", { pageTitle: "signUp" });
    } else {
      const user = await User({ name, email });
      await User.register(user, password);
      console.log(req.user);
      res.redirect(routes.home);
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.signUp);
  }
};

export const login = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home
});

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};
