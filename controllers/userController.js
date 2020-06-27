import User from "../models/User";

export const me = async (req, res) => {
  const {
    params: { id }
  } = req;
  const user = await User.findById(id).populate("boards");
  res.render("me", { pageTitle: user.name, user });
};

export const avatarUpload = async (req, res) => {
  res.render("avatarUpload");
};

export const postAvatarUpload = async (req, res) => {
  res.render("avatarUpload");
};
