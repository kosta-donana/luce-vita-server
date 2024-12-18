import jwt from "jsonwebtoken";
import { Request, Response, NextFunction, RequestHandler } from "express";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

// RequestHandler를 사용해 타입 일관성 보장
const loginRequired = (req, res, next) => {
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not defined in the environment variables.");
    process.exit(1); // 앱 강제 종료
  }

  const token = req.cookies?.token; // ?. 사용해서 안전하게 접근
  if (!token) {
    return res.status(401).json({ message: "Unauthorised" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log(decoded);

    // req 객체에 user 속성 추가
    (req as any).user = decoded; // 타입 강제 단언
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default loginRequired;
