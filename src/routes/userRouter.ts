import { Router } from "express";
import { userService } from "../services/userService";

const router = Router();

// 사용자 ID로 사용자와 여권 정보 조회
router.get("/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const userInfo = await userService.getUserWithPassportById(userId);

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

router.post("/:user_id/deactivate", async (req, res) => {
  try {
    const user_id = req.params.user_id;
    console.log(user_id);
    const deletedUser = await userService.deleteUser(user_id);
    console.log("router", deletedUser);
    res.status(200).json({ success: true, data: deletedUser });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        error: String(error),
      });
    }
  }
});

export default router;
