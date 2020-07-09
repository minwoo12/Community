import User from "../models/User";
import routes from "../router";

export const me = async (req, res) => {
  const {
    params: { id }
  } = req;
  const user = await User.findById(id).populate("boards");
  res.render("./user/me", { pageTitle: user.name, user });
};

export const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  const user = await User.findById(id).populate("boards");
  res.render("./user/userDetail", { pageTitle: user.name, user });
};

export const userEdit = async (req, res) => {
  res.render("./user/userEdit", { user: req.user });
};

export const postUserEdit = async (req, res) => {
  const {
    user,
    body: { name, email }
  } = req;
  try {
    await User.findByIdAndUpdate({ _id: user.id }, { name, email });
    res.redirect(routes.me(user.id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.userEdit(user.id));
  }
};

export const changePassword = (req, res) => {
  res.render("./user/changePassword");
};

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPasswordVerify }
  } = req;
  try {
    if (newPassword !== newPasswordVerify) {
      res.status(400);
      res.redirect(routes.changePassword);
    } else {
      await req.user.changePassword(oldPassword, newPassword);
      res.redirect(routes.me(req.user.id));
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.changePassword);
  }
};

export const avatarEdit = async (req, res) => {
  res.render("./user/avatarUpload");
};

export const postAvatarEdit = async (req, res) => {
  const { user, file } = req;
  try {
    await User.findByIdAndUpdate(
      { _id: user.id },
      {
        avatar: file ? file.path : req.user.avatar
      }
    );
    res.redirect(routes.me(user.id));
  } catch (error) {
    console.log(error);
  }
};
