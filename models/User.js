import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    isrequired: "name is required"
  },
  email: {
    type: String,
    isrequired: "email is required"
  },
  avatar: String,
  createdAt: String,
  boards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board"
    }
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", userSchema);

export default model;
