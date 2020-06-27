import app from "./app";
import dotenv from "dotenv";
dotenv.config();

import "./db";

import "./models/Board";
import "./models/User";

const PORT = process.env.PORT;

const handleListening = () => {
  console.log(`Listening on:http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
