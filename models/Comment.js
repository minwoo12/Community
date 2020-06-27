import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: String,
  createdAt: Number,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const model = mongoose.model("Comment", commentSchema);

export default model;
