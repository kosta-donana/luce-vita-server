import { Request, Response, Router } from "express";
import { loginService, logoutService } from "../services/loginService";
import { setAuthCookies } from "../utils/cookie";
import { handleError } from "../utils/errorHandle";
import { emailToClient, setNewClient } from "../supabaseClients";

const router: Router = Router();

// 기본 이메일 로그인 라우터
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  setNewClient(email);

  try {
    const login = await loginService.emailLogin(email, password);
    const tokens = login.session;

    setAuthCookies(res, tokens, email);

    res.status(200).json({ success: true, data: login });
  } catch (error) {
    handleError(res, error);
    emailToClient.delete(email);
  }
});

// 소셜 로그인 페이지 이동
router.post("/social", async (req: Request, res: Response) => {
  const { provider } = req.body;

  try {
    const social = await loginService.socialLogin(provider);
    res.status(200).json({ success: true, message: "success to redirect: " + social });
  } catch (error) {
    handleError(res, error);
  }
});

// 클라이언트에서 세션 데이터 조회
router.get("/auth/callback", async (req: Request, res: Response) => {
  const { access_token, refresh_token } = req.body;

  if (!access_token || !refresh_token) {
    res.status(400).json({
      success: false,
      message: "require access_token or refresh_token",
    });
  }

  setAuthCookies(res, { access_token, refresh_token });

  res.status(200).json({
    success: true,
    message: "success to set session",
  });
});

// 로그아웃
router.post("/logout", async (req: Request, res: Response) => {
  const logout = await logoutService.logout();

  // 쿠키 삭제
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });
  res.clearCookie("refresh_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });
  res.clearCookie("email", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });

  if (req.cookies.email) {
    emailToClient.delete(req.cookies.email);
  }

  res.json({ success: true, message: "로그아웃 성공" });
});

export default router;
