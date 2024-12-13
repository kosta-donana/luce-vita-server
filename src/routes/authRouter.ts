import { Router } from "express";
import { verifyService, otpService, tokenService } from "../services/authService";
import { handleError } from "../utils/errorHandle";
import { setAuthCookies } from "../utils/cookie";

const router = Router();

// 회원가입 라우터
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = await verifyService.existingUser(email, password);
    res.status(200).json({ success: true, data: newUser });
  } catch (error) {
    handleError(res, error);
  }
});

// otp 인증 라우터
router.post("/verify", async (req, res) => {
  const { email, token } = req.body;

  try {
    const verified = await otpService.verifyOtp(email, token);
    res.status(200).json({ success: true, data: verified });
  } catch (error) {
    handleError(res, error);
  }
});

// 토큰 재발급
router.post("/token", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    res.status(401).json({ message: "refresh Token을 확인할 수 없습니다." });
  }

  try {
    const tokens = await tokenService.reissuedToken(refreshToken);

    // 쿠키 설정
    setAuthCookies(res, tokens);

    res.status(200).json({ success: true, data: tokens });
  } catch (error) {
    handleError(res, error);
  }
});

export default router;
