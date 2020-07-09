import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: String,
  createdAt: String,
  creator: String,
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  avatar: String,
  reComments: [{ type: mongoose.Schema.Types.ObjectId, ref: "reComment" }]
});

const model = mongoose.model("Comment", commentSchema);

export default model;
