import { User } from "@supabase/supabase-js";
import { Request, Router } from "express";
import { loginRequired } from "../middleware/loginRequired";
import { travelService } from "../services/travelService";
import { handleError } from "../utils/errorHandle";

const router: Router = Router();

interface CustomRequest extends Request {
  user?: User;
  role?: string;
}

router.get("/", loginRequired.checkLogin.bind(loginRequired), async (req: CustomRequest, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: "User not authenticated" });
      return;
    }

    const user_id = req.user.id;
    const travelList = await travelService.fetchTravelListByStatus(user_id);

    res.status(200).json({ success: true, data: travelList });
  } catch (error) {
    handleError(res, error);
  }
});

router.post("/", loginRequired.checkLogin.bind(loginRequired), async (req: CustomRequest, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: "User not authenticated" });
      return;
    }

    const user_id = req.user.id;
    const travelData = req.body;
    const createdTravel = await travelService.createTravel(user_id, travelData);
    res.status(200).json({ success: true, data: createdTravel });
  } catch (error) {
    handleError(res, error);
  }
});

// 여행 조회
router.get("/:travel_id", loginRequired.checkLogin.bind(loginRequired), async (req, res) => {
  try {
    const travel_id = req.params.travel_id;

    const fetchedTravel = await travelService.fetchTravel(travel_id);

    // DB 에서 받아온 user_id와 req.user.id랑 비교해서 같으면 리스트 넘기고, 다르면 에러 넘겨라


    res.status(200).json({ success: true, data: fetchedTravel });
  } catch (error) {
    handleError(res, error);
  }
});

// 여행 업데이트
router.put("/:travel_id", loginRequired.checkLogin.bind(loginRequired), async (req, res) => {
  try {
    const travel_id = req.params.travel_id;
    const travelData = req.body;
    const updatedTravel = await travelService.updateTravel(travel_id, travelData);

    res.status(200).json({ success: true, data: updatedTravel });
  } catch (error) {
    handleError(res, error);
  }
});

// 여행 삭제
router.delete("/:travel_id", loginRequired.checkLogin.bind(loginRequired), async (req, res) => {
  try {
    const travel_id = req.params.travel_id;
    const deletedTravel = await travelService.deleteTravel(travel_id);

    res.status(200).json({ success: true, data: deletedTravel });
  } catch (error) {
    handleError(res, error);
  }
});

// 여행 예산 리스트 가져오기 ( 날짜별 예산 )
router.get("/:travel_id/budgets", loginRequired.checkLogin.bind(loginRequired), async (req, res) => {
  try {
    const travel_id = req.params.travel_id;
    const travelBudgetList = await travelService.fetchTravelBudgetListByTravelId(travel_id);

    res.status(200).json({ success: true, data: travelBudgetList });
  } catch (error) {
    handleError(res, error);
  }
});

// 여행 날짜별로 두 번째 일정까지 가져오기
router.get("/:travel_id/top-schedules", loginRequired.checkLogin.bind(loginRequired), async (req, res) => {
  try {
    const travel_id = req.params.travel_id;
    const fetchedTravelSchedule = await travelService.fetchTravelTopScheduleByDate(travel_id);

    res.status(200).json({ success: true, data: fetchedTravelSchedule });
  } catch (error) {
    handleError(res, error);
  }
});

// 여행 해당 날짜 모든 일정 가져오기
router.get("/:travel_id/schedules/:schedule_date", loginRequired.checkLogin.bind(loginRequired), async (req, res) => {
  try {
    const { travel_id, schedule_date } = req.params;
    const fetchedAllScheduleByDate = await travelService.fetchAllScheduleByDate(travel_id, schedule_date);

    res.status(200).json({ success: true, data: fetchedAllScheduleByDate });
  } catch (error) {
    handleError(res, error);
  }
});

// 여행 상세 일정 추가/수정/삭제
router.post("/:travel_id/schedules", loginRequired.checkLogin.bind(loginRequired), async (req, res) => {
  try {
    const travel_id = req.params.travel_id;
    let scheduleData = req.body;
    scheduleData = { ...scheduleData, travel_id };
    const changedTravelSchedule = await travelService.handleTravelSchedule(scheduleData);

    res.status(200).json({ success: true, data: changedTravelSchedule });
  } catch (error) {
    handleError(res, error);
  }
});

// 특정 날짜 상세 일정 전부 삭제
router.delete("/:travel_id/schedules/:schedule_date", loginRequired.checkLogin.bind(loginRequired), async (req, res) => {
  try {
    const { travel_id, schedule_date } = req.params;
    const deletedSchedules = await travelService.deleteSchedule(travel_id, schedule_date);
    res.status(200).json({ success: true, data: deletedSchedules });
  } catch (error) {
    handleError(res, error);
  }
});

// 여행 상세 일정 is_done 업데이트 (TRUE/FALSE)
router.patch("/schedules/:schedule_id/:is_done", loginRequired.checkLogin.bind(loginRequired), async (req, res) => {
  try {
    // schedule_id를 number로 변환
    const schedule_id = parseInt(req.params.schedule_id, 10);

    // is_done을 boolean으로 변환
    const is_done = req.params.is_done === "true";

    const updatedScheduleIsDone = await travelService.updateIsDoneStatusByScheduleId(schedule_id, is_done);
    res.status(200).json({ success: true, data: updatedScheduleIsDone });
  } catch (error) {
    handleError(res, error);
  }
});

export default router;
