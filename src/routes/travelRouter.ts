import { Router } from "express";
import { travelService } from "../services/travelService";
import { handleError } from "../utils/errorHandle";

const router = Router();

router.get("/:user_id", async (req, res) => {
    try {
        const user_id = req.params.user_id;

        const travelList = await travelService.fetchTravelListByStatus(user_id);

        res.status(200).json({ success: true, data: travelList });
    } catch (error) {
        handleError(res, error);
    }
});

router.post("/", async (req, res) => {
    try {
        const travelData = req.body;
        const createdTravel = await travelService.createTravel(travelData);
        res.status(200).json({ success: true, data: createdTravel });
    } catch (error) {
        handleError(res, error);
    }
});

// 여행 업데이트
router.put("/:travel_id", async (req, res) => {
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
router.delete("/:travel_id", async (req, res) => {
    try {
        const travel_id = req.params.travel_id;
        const deletedTravel = await travelService.deleteTravel(travel_id);

        res.status(200).json({ success: true, data: deletedTravel });
    } catch (error) {
        handleError(res, error);
    }
});

// 여행 예산 리스트 가져오기 ( 날짜별 예산 )
router.get("/:travel_id/budgets", async (req, res) => {
    try {
        const travel_id = req.params.travel_id;
        const travelBudgetList = await travelService.fetchTravelBudgetListByTravelId(travel_id);

        res.status(200).json({ success: true, data: travelBudgetList });
    } catch (error) {
        handleError(res, error);
    }
});

// 여행 날짜별로 두 번째 일정까지 가져오기
router.get("/:travel_id/top-schedules", async (req, res) => {
    try {
        const travel_id = req.params.travel_id;
        const fetchedTravelSchedule = await travelService.fetchTravelTopScheduleByDate(travel_id);

        res.status(200).json({ success: true, data: fetchedTravelSchedule });
    } catch (error) {
        handleError(res, error);
    }
});

// 여행 해당 날짜 모든 일정 가져오기
router.get("/:travel_id/schedules/:schedule_date", async (req, res) => {
    try {
        const searchData = req.params;
        const fetchedAllScheduleByDate = await travelService.fetchAllScheduleByDate(searchData);

        res.status(200).json({ success: true, data: fetchedAllScheduleByDate });
    } catch (error) {
        handleError(res, error);
    }
});

// 여행 상세 일정 추가/수정/삭제
router.post("/:travel_id/schedules", async (req, res) => {
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

// 특정정 날짜 상세 일정 전부 삭제
router.delete("/:travel_id/schedules/:schedule_date", async (req, res) => {
    try {
        const { travel_id, schedule_date } = req.params;
        const deletedSchedules = await travelService.deleteSchedule(travel_id, schedule_date);
        res.status(200).json({ success: true, data: deletedSchedules });
    } catch (error) {
        handleError(res, error);
    }
});

export default router;