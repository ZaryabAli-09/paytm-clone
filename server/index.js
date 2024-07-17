import express from "express";
import { dbConnection } from "./db.js";
import dotenv from "dotenv";
import cors from "cors";
import UserRouter from "./routes/user.routes.js";
import AccountRouter from "./routes/account.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/account", AccountRouter);

app.listen(process.env.PORT, () => {
  console.log(`app is listning on ${process.env.PORT}`);
  dbConnection();
});
