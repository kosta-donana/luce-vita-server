import supabase from "../supabaseClients";
import { Router, Request, Response } from "express";
import { handleError } from "../utils/errorHandle";
import { setAuthCookies } from "../utils/cookie";
import { loginService, logoutService } from "../services/loginService";

const router = Router();

// 기본 이메일 로그인 라우터
router.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const login = await loginService.emailLogin(email, password);
    const tokens = login.session;

    console.log("success to login", login);

    setAuthCookies(res, tokens);

    res.status(200).json({ success: true, data: login });
  } catch (error) {
    handleError(res, error);
  }
});

// 소셜 로그인 페이지 이동
router.post("/social", async (req: Request, res: Response) => {
  const { provider } = req.body;
  console.log(provider);

  try {
    const social = await loginService.socialLogin(provider);
    res.status(200).json({ success: true, message: "success to redirect social-login" });
  } catch (error) {
    handleError(res, error);
  }
});

// 클라이언트에서 세션 데이터 조회
router.get("/ath/callback", async (req: Request, res: Response) => {
  const { access_token, refresh_token } = req.body;

  if (!access_token || !refresh_token) {
    res.status(400).json({
      success: false,
      message: "require access_token or refresh_token",
    });
  }

  //   쿠키 설정
  setAuthCookies(res, { access_token, refresh_token });

  //   쿠카 설정 후 클라이언트 재전송
  res.status(200).json({
    success: true,
    message: "success to set session",
  });
});

// 로그아웃
router.post("/logout", async (res: Response) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.clearCookie("refresh_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.json({ success: true, message: "로그아웃 성공" });
});

export default router;
