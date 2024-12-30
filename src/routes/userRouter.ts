import { User } from "@supabase/supabase-js";
import { Request, Router } from "express";
import { loginRequired } from "../middleware/loginRequired";
import { userService } from "../services/userService";
import { handleError } from "../utils/errorHandle";

const router: Router = Router();

interface CustomRequest extends Request {
  user?: User;
  role?: string;
}

// 사용자 정보와 여권 정보 같이 조회하는 함수
router.get("/", loginRequired.checkLogin.bind(loginRequired), async (req: CustomRequest, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: "User not authenticated" });
      return;
    }

    const user_id = req.user.id;
    const userInfo = await userService.getUserWithPassportById(user_id);

    res.status(200).json({ success: true, data: userInfo });
  } catch (error) {
    handleError(res, error);
  }
});

router.post("/deactivate", loginRequired.checkLogin.bind(loginRequired), async (req: CustomRequest, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: "User not authenticated" });
      return;
    }

    const user_id = req.user.id;
    const deletedUser = await userService.deleteUser(user_id);

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

    res.status(200).json({ success: true, data: deletedUser });
  } catch (error) {
    handleError(res, error);
  }
});

router.get("/validate/:nickname", async (req, res) => {
  try {
    const nickname = req.params.nickname;
    const { available, message } = await userService.isNicknameAvailable(nickname);

    res.json({ success: true, available, message });
  } catch (error) {
    handleError(res, error);
  }
});

// 여권 정보 생성 및 수정
router.post("/passport", loginRequired.checkLogin.bind(loginRequired), async (req: CustomRequest, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: "User not authenticated" });
      return;
    }

    const passportData = req.body; // 여권 정보
    const user_id = req.user.id;
    const upsertedPassport = await userService.upsertPassport(user_id, passportData);

    res.status(200).json({ success: true, data: upsertedPassport });
  } catch (error) {
    handleError(res, error);
  }
});

export default router;
