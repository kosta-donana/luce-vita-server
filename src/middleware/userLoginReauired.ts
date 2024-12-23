// import jwt from "jsonwebtoken";
// import { Request, Response, NextFunction } from "express";

// class LoginRequired {
//   async loginRequired(req: Request, res: Response, next: NextFunction) {
//     if (!process.env.JWT_SECRET) {
//       console.error("JWT_SECRET is not defined in the environment variables.");
//       process.exit(1); // 앱 강제종료
//     }

//     const token = req.cookies?.token;
//     if (!token) {
//       res.status(401).json({ success: false, message: "Unauthorised" });
//     }

//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET!);
//       console.log(decoded);

//       // req 객체에 user 속성 추가
//       (req as any).user = decoded;

//       next();
//     } catch (error) {
//       res.status(401).json({ success: false, message: "invalid token" });
//     }
//   }
// }

// const loginRequired = new LoginRequired();
// export { loginRequired };
