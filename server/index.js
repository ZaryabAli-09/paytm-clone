import express from "express";
import { dbConnection } from "./db.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: "include",
  })
);
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`app is listning on ${process.env.PORT}`);
  dbConnection();
});
