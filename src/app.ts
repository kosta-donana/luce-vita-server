import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import { cors } from "cors";
import userRoutes from "./routes/userRouter";
import authRoutes from "./routes/authRouter";
import loginRoutes from "./routes/loginRouter";

const app: Application = express();
dotenv.config();
const PORT: number = Number(process.env.PORT) || 3000;

// 회원가입, 토큰 재발급
app.use("/signup", authRoutes);

// 로그인
app.use("/login", loginRoutes);

// user 정보 조회
app.use("/user", userRoutes);

app.listen(PORT, function () {
  console.log(`App is listening on port ${PORT} !`);
});
