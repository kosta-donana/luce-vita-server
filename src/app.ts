import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import authRoutes from "./routes/authRouter";
import commentRoutes from "./routes/commentRouter";
import loginRoutes from "./routes/loginRouter";
import postRoutes from "./routes/postRouter";
import travelRoutes from "./routes/travelRouter";
import userRoutes from "./routes/userRouter";
import { specs, swaggerUi } from "./swagger/swagger";

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
// travel 관련 라우터
app.use("/travels", travelRoutes);
// country 관련 라우터
app.use("/countries", travelRoutes);

// 커뮤니티 라우터
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);

// swagger API 
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, function () {
  console.log(`App is listening on port ${PORT} !`);
});
