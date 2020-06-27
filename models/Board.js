import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  number: {
    type: Number,
    default: 1
  },
  pages: {
    type: Number,
    default: 1
  },
  title: {
    type: String,
    isrequired: "Title is required"
  },
  content: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: String,
  views: {
    default: 1,
    type: Number
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

const model = mongoose.model("Board", boardSchema);

export default model;
