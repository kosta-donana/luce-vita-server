import { Router } from "express";
import { userService } from "../services/userService";

const router = Router();

// 사용자 정보와 여권 정보 같이 조회하는 함수
router.get("/:user_id", async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const userInfo = await userService.getUserWithPassportById(user_id);

    res.status(200).json({ success: true, data: userInfo });
  } catch (error) {
    // error가 Error 인스턴스인지 확인
    if (error instanceof Error) {
      res.status(404).json({
        success: false,
        error: error.message,
      });
    } else {
      // Error 인스턴스가 아닌 경우
      res.status(500).json({
        success: false,
        error: String(error),
      });
    }
  }
});

export default router;
