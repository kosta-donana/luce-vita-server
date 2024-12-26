import { Request, Response, Router } from "express";
import { otpService, tokenService, verifyService } from "../services/authService";
import { setAuthCookies } from "../utils/cookie";
import { handleError } from "../utils/errorHandle";

const router: Router = Router();

// 회원가입 라우터
router.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const newUser = await verifyService.existingUser(email, password);
    res.status(200).json({ success: true, data: newUser });
  } catch (error) {
    handleError(res, error);
  }
});

// otp 인증 라우터
router.post("/verify", async (req: Request, res: Response) => {
  const { email, token } = req.body;

  try {
    const verified = await otpService.verifyOtp(email, token);

    const { access_token, refresh_token } = verified.session || {};

    if (access_token && refresh_token) {
      setAuthCookies(res, { access_token, refresh_token });
    } else {
      res.status(400).json({ success: false, message: "invalid Tokens" });
    }
    res.status(200).json({ success: true, data: verified });
  } catch (error) {
    handleError(res, error);
  }
});

// 토큰 재발급
router.post("/token", async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    res.status(401).json({ message: "refresh Token을 확인할 수 없습니다." });
    return;
  }

  try {
    const tokens = await tokenService.reissuedToken(refreshToken);

    setAuthCookies(res, tokens);

    res.status(200).json({ success: true, data: tokens });
  } catch (error) {
    handleError(res, error);
  }
});

export default router;
