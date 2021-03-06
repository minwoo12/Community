import Board from "../models/Board";
import Comment from "../models/Comment";
import User from "../models/User";
import reComment from "../models/reComment";
import moment from "moment";
import "moment-timezone";
import routes from "../router";

export const board = async (req, res) => {
  const {
    params: { page }
  } = req;
  const board = await Board.find({})
    .populate("creator")
    .sort({ createdAt: -1 });
  const pages = Math.floor(board.length / 10) + 1;
  res.render("./board/board", {
    pageTitle: "Community",
    board,
    pages,
    page
  });
};

export const boardDetail = async (req, res) => {
  const {
    query: { reText, commentId },
    params: { id }
  } = req;
  const board = await Board.findById(id)
    .populate("comments")
    .populate("creator");
  board.views += 1;
  board.save();
  const reComments = await reComment.find({});
  let today = moment().format("YYYY-MM-DD HH:mm:ss");
  const user = await User.findById(req.user.id);
  const comment = await Comment.findById(commentId).populate("reComments");
  if (reText) {
    const newReComment = await reComment.create({
      text: reText,
      createdAt: today,
      creator: user.name,
      creatorId: user.id,
      avatar: user.avatar,
      parentComment: commentId
    });
    comment.reComments.push(newReComment.id);
    comment.save();
  }
  res.render("./board/boardDetail", {
    pageTitle: "boardDetail",
    board,
    reComments
  });
};

export const boardWrite = (req, res) =>
  res.render("./board/boardWrite", { pageTitle: "boardWrite" });

export const postBoardWrite = async (req, res) => {
  const {
    body: { title, content },
    user
  } = req;
  const board = await Board.find({});
  const pages = Math.floor(board.length / 10) + 1;
  moment.tz.setDefault("Asia/Seoul");
  let today = moment().format("YYYY-MM-DD HH:mm:ss");
  try {
    const newBoard = await Board.create({
      number: board.length + 1,
      title,
      content,
      creator: user.id,
      createdAt: today,
      pages
    });
    req.user.boards.push(newBoard.id);
    req.user.save();
    res.redirect(routes.boardDetail(newBoard.id));
  } catch (error) {
    console.log(error);
    res.render("./board/boardWrite", { pageTitle: "Community" });
  }
};

export const boardEdit = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const board = await Board.findById(id);
    res.render("./board/boardEdit", { pageTitle: "Community", board });
  } catch (error) {
    res.status(400);
    res.redirect(routes.home);
  }
};

export const postBoardEdit = async (req, res) => {
  const {
    body: { title, content },
    params: { id }
  } = req;
  try {
    await Board.findOneAndUpdate({ _id: id }, { title, content });
    res.redirect(routes.boardDetail(id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.boardEdit(id));
  }
};

export const boardDelete = async (req, res) => {
  const {
    params: { id }
  } = req;
  const board = await Board.findById(id);
  const boards = await Board.find({});
  let boardArray = [];
  boardArray = boards;
  try {
    await Board.findOneAndRemove({ _id: id });
    for (let i = board.number; i <= boards.length; i++) {
      if (boardArray[i] !== undefined) {
        await Board.findOneAndUpdate(
          { _id: boardArray[i].id },
          { number: boardArray[i].number - 1 }
        );
        if (board.pages === 1) {
          for (let i = 1; i <= boards.length; i++) {
            if (i % 10 === 0) {
              if (boardArray[i] === undefined) {
                break;
              } else {
                await Board.findOneAndUpdate(
                  { _id: boardArray[i].id },
                  { pages: boardArray[i].pages - 1 }
                );
              }
            }
          }
        } else {
          for (let i = board.pages * 10; i < boards.length; i++) {
            if (i % 10 === 0) {
              if (boardArray[i] === undefined) {
                break;
              } else {
                await Board.findOneAndUpdate(
                  { _id: boardArray[i].id },
                  { pages: boardArray[i].pages - 1 }
                );
              }
            }
          }
        }
      }
    }
    res.redirect(`/board${routes.boardMain(1)}`);
  } catch (error) {
    console.log(error);
    res.redirect(routes.boardHome);
  }
};

export const postBoardComment = async (req, res) => {
  const {
    params: { id },
    body: { comment }
  } = req;
  try {
    let today = moment().format("YYYY-MM-DD HH:mm:ss");
    const board = await Board.findById(id);
    const user = await User.findById(req.user.id);
    const newComment = await Comment.create({
      text: comment,
      createdAt: today,
      creator: user.name,
      creatorId: user.id,
      avatar: user.avatar
    });
    board.comments.push(newComment.id);
    board.save();
    user.comments.push(newComment.id);
    user.save();
  } catch (error) {
    console.log(error);
  } finally {
    res.end();
  }
};

export const postBoardCommentDelete = async (req, res) => {
  const {
    headers: { referer },
    params: { id }
  } = req;
  const boardId = referer.split("/board/")[1];
  try {
    await Comment.findOneAndDelete({ _id: id });
    res.redirect(routes.boardDetail(boardId));
  } catch (error) {
    console.log(error);
  }
};

export const postBoardCommentEdit = async (req, res) => {};
