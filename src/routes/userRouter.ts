import { Router } from "express";
import { userService } from "../services/userService";
import { handleError } from "../utils/errorHandle";

const router = Router();

// 사용자 정보와 여권 정보 같이 조회하는 함수
router.get("/:user_id", async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const userInfo = await userService.getUserWithPassportById(user_id);

    res.status(200).json({ success: true, data: userInfo });
  } catch (error) {
    handleError(res, error);
  }
});

router.post("/:user_id/deactivate", async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const deletedUser = await userService.deleteUser(user_id);

    res.status(200).json({ success: true, data: deletedUser });
  } catch (error) {
    handleError(res, error);
  }
});

router.get("/validate/:nickname", async (req, res) => {
  const nickname = req.params.nickname;

  try {
    const { available, message } = await userService.isNicknameAvailable(nickname);

    res.json({ success: true, available, message });
  } catch (error) {
    handleError(res, error);
  }
});

export default router;
