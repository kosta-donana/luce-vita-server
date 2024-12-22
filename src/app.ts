import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import authRoutes from "./routes/authRouter";
import loginRoutes from "./routes/loginRouter";
import userRoutes from "./routes/userRouter";
import postRoutes from "./routes/postRouter";
import cookieParser from "cookie-parser";
import commentRoutes from "./routes/commentRouter";

const app: Application = express();
dotenv.config();
const PORT: number = Number(process.env.PORT) || 3000;
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// 회원가입, 토큰 재발급
app.use("/signup", authRoutes);

// 로그인, 로그아웃
app.use("/login", loginRoutes);

// user 라우터
app.use("/users", userRoutes);

// 커뮤니티 라우터
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);

app.listen(PORT, function () {
  console.log(`App is listening on port ${PORT} !`);
});
