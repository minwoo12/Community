import mongoose from "mongoose";

const reComment = new mongoose.Schema({
  text: String,
  createdAt: String,
  creator: String,
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  avatar: String,
  parentComment: String,
  reComments: [{ type: mongoose.Schema.Types.ObjectId, ref: "reComment" }]
});

const model = mongoose.model("reComment", reComment);

export default model;
