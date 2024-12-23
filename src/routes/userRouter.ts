import { Router } from "express";
import { loginRequired } from "../middleware/loginRequired";
import { userService } from "../services/userService";
import { handleError } from "../utils/errorHandle";

const router: Router = Router();

// 사용자 정보와 여권 정보 같이 조회하는 함수
router.get("/:user_id", loginRequired.checkLogin.bind(loginRequired), async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const userInfo = await userService.getUserWithPassportById(user_id);

    res.status(200).json({ success: true, data: userInfo });
  } catch (error) {
    handleError(res, error);
  }
});

router.post("/:user_id/deactivate", loginRequired.checkLogin.bind(loginRequired), async (req, res) => {
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

// 여권 정보 생성 및 수정
router.post("/:user_id/passport", loginRequired.checkLogin.bind(loginRequired), async (req, res) => {
  const user_id = req.params.user_id;
  const passportData = req.body; // 여권 정보

  try {
    const upsertedPassport = await userService.upsertPassport(user_id, passportData);

    res.status(200).json({ success: true, data: upsertedPassport });
  } catch (error) {
    handleError(res, error);
  }
});

export default router;
