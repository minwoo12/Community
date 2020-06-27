import express from "express";
import routes from "../router";
import {
  postBoardComment,
  postBoardCommentDelete,
  postBoardCommentEdit,
  postBoardReComment
} from "../controllers/boardController";

const apiRouter = express.Router();

apiRouter.post(routes.addBoardComment, postBoardComment);

apiRouter.post(routes.addBoardReComment, postBoardReComment);

apiRouter.post(routes.editBoardComment, postBoardCommentEdit);

apiRouter.get(routes.deleteBoardComment(), postBoardCommentDelete);

export default apiRouter;
