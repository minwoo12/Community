import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/folio2", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", error => console.log(`Not Connected on:${error}`));
db.once("open", () => console.log("Connected on DB"));
