const routes = {
  home: "/",
  search: "/search",
  signUp: "/signUp",
  login: "/login",
  logout: "/logout",

  //board
  board: "/board",
  boardMain: page => {
    if (page) {
      return `/main/${page}`;
    } else {
      return "/main/:page";
    }
  },
  boardDetail: id => {
    if (id) {
      return `/board/${id}`;
    } else {
      return "/:id";
    }
  },
  boardWrite: "/write",
  boardEdit: id => {
    if (id) {
      return `/board/${id}/edit`;
    } else {
      return "/:id/edit";
    }
  },
  boardDelete: id => {
    if (id) {
      return `/board/${id}/delete`;
    } else {
      return "/:id/delete";
    }
  },

  //user
  user: "/user",
  me: id => {
    if (id) {
      return `/user/${id}/me`;
    } else {
      return "/:id/me";
    }
  },
  userDetail: id => {
    if (id) {
      return `/user/${id}`;
    } else {
      return "/user/:id";
    }
  },
  userEdit: "/:id/edit",
  changePassword: "/:id/changePassword",
  userDelete: "/:id/Delete",
  avatar: "/upload",

  //comment
  api: "/api",
  addBoardComment: "/:id/boardComment",
  deleteBoardComment: id => {
    if (id) {
      return `/api/${id}/delete`;
    } else {
      return "/:id/delete";
    }
  },
  editBoardComment: "/:id/edit",
  addBoardReComment: "/:id/boardReComment"
};

export default routes;
