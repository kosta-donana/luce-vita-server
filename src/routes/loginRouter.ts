import supabase from "../supabaseClients";
import { Router } from "express";
import { handleError } from "../utils/errorHandle";
import { setAuthCookies } from "../utils/cookie";
import { loginService, logoutService } from "../services/loginService";

const router = Router();

// 기본 이메일 로그인 라우터
router.post("/", async (req, res) => {
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

// 소셜 로그인 라우터
router.get("/ath/callback", async (req, res) => {
  const { access_token, refresh_token } = req.body;

  if (!access_token || !refresh_token) {
    res.status(400).json({
      success: false,
      message: "require access_token or refresh_token",
    });
  }

  //   쿠키 설정
  setAuthCookies(res, { access_token, refresh_token });
  res.status(200).json({
    success: true,
    message: "success to set session",
  });
});

// 로그아웃
router.post("/logout", async (req, res) => {
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
