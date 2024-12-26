import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import authRoutes from "./routes/authRouter";
import commentRoutes from "./routes/commentRouter";
import countryRoutes from "./routes/countryRouter";
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
app.use("/api/signup", authRoutes);

// 로그인, 로그아웃
app.use("/api", loginRoutes);

// user 라우터
app.use("/api/users", userRoutes);
// travel 관련 라우터
app.use("/api/travels", travelRoutes);
// country 관련 라우터
app.use("/api/countries", countryRoutes);

// 커뮤니티 라우터
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

// swagger API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, function () { });
module.exports = app;
