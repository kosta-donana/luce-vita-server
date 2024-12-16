import dotenv from "dotenv";
import express, { Application } from "express";
import authRoutes from "./routes/authRouter";
import loginRoutes from "./routes/loginRouter";
import userRoutes from "./routes/userRouter";

const app: Application = express();
dotenv.config();
const PORT: number = Number(process.env.PORT) || 3000;
app.use(express.json());

// 회원가입, 토큰 재발급
app.use("/signup", authRoutes);

// 로그인, 로그아웃
app.use("/login", loginRoutes);

// user 라우터
app.use("/user", userRoutes);

app.listen(PORT, function () {
  console.log(`App is listening on port ${PORT} !`);
});
