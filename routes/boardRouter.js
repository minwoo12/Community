import express from "express";
import routes from "../router";
import {
  board,
  boardDetail,
  boardPage,
  boardWrite,
  postBoardWrite,
  boardEdit,
  boardDelete,
  postBoardEdit
} from "../controllers/boardController";

const boardRouter = express.Router();

boardRouter.get(routes.boardMain(), board);

boardRouter.get(routes.boardWrite, boardWrite);
boardRouter.post(routes.boardWrite, postBoardWrite);

boardRouter.get(routes.boardDetail(), boardDetail);

boardRouter.get(routes.boardEdit(), boardEdit);
boardRouter.post(routes.boardEdit(), postBoardEdit);

boardRouter.get(routes.boardDelete(), boardDelete);

export default boardRouter;
