import dotenv from "dotenv";
import express, { Application } from "express";
import authRoutes from "./routes/authRouter";
import loginRoutes from "./routes/loginRouter";
import userRoutes from "./routes/userRouter";
import communityRouter from "./routes/communityRouter";
import cookieParser from "cookie-parser";
// import cors from "cors";

const app: Application = express();
dotenv.config();
const PORT: number = Number(process.env.PORT) || 3000;
app.use(express.json());
app.use(cookieParser());
// app.use(cors());

// 회원가입, 토큰 재발급
app.use("/signup", authRoutes);

// 로그인, 로그아웃
app.use("/login", loginRoutes);

// user 라우터
app.use("/user", userRoutes);

// community 라우터 (게시글 및 댓글 생성, 수정, 삭제)
app.use("/community", communityRouter);

app.listen(PORT, function () {
  console.log(`App is listening on port ${PORT} !`);
});
