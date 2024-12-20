import { travelModel } from "../models/travelModel";
import { ResTravel, Travel } from "../types/travel.type";

class TravelService {
    // 모든 여행 리스트 조회해서 현재 날짜 기준으로 예정인/진행중인/종료된 여행으로 분류
    async fetchTravelListByStatus(user_id: string) {
        const currentDate = new Date();
        const travelList = await travelModel.getTravelListByUserId(user_id); // 모든 여행 리스트 가져옴

        // 현재 날짜와 비교
        const upcomingTravels = travelList.filter((travel: ResTravel) => new Date(travel.start_date) > currentDate);
        const ongoingTravels = travelList.filter(
            (travel: ResTravel) => new Date(travel.start_date) <= currentDate && new Date(travel.end_date) >= currentDate
        );

        const completedTravels = travelList.filter((travel: ResTravel) => new Date(travel.end_date) < currentDate);

        return {
            upcomingTravels,
            ongoingTravels,
            completedTravels,
        };
    }

    // 여행 생성
    async createTravel(travelData: Travel) {
        const insertedTravel = await travelModel.insertTravel(travelData);

        if (!insertedTravel || insertedTravel.length === 0) {
            throw new Error("Failed to create the travel record.");
        }

        return insertedTravel;
    }

    // 여행 업데이트
    async updateTravel(travel_id: string, travelData: Travel) {
        const updatedTravel = await travelModel.updateTravelByTravelId(travel_id, travelData);

        if (!updatedTravel || updatedTravel.length === 0) {
            throw new Error("Travel not found");
        }

        return updatedTravel;
    }

    // 여행 삭제
    async deleteTravel(travel_id: string) {
        const deletedTravel = await travelModel.deleteTravelByTravelId(travel_id);

        if (!deletedTravel || deletedTravel.length === 0) {
            throw new Error("Travel not found or could not be deleted.");
        }

        return deletedTravel;
    }

    async fetchTravelBudgetListByTravelId(travel_id: string) {
        // 여행의 일정 날짜와 예산 가져옴
        const travelBudgetList = await travelModel.getTravelBudgetListByTravelId(travel_id);

        if (!travelBudgetList || travelBudgetList.length === 0) {
            throw new Error("Travel not found or no budgets available.");
        }

        return travelBudgetList;
    }

    // 여행에서 날짜별로 상위 스케쥴만 가져옴
    async fetchTravelTopScheduleByDate(travel_id: string) {
        const selectedTravelByDate = await travelModel.getTravelTopScheduleByDate(travel_id);

        if (!selectedTravelByDate || selectedTravelByDate.length === 0) {
            throw new Error("Travel not found or no schedules available");
        }

        return selectedTravelByDate;
    }

    // 여행 해당 날짜 모든 일정 가져오기
    async fetchAllScheduleByDate(searchData: { travel_id: string, schedule_date: string }) {
        const selectedAllScheduleByDate = await travelModel.getAllScheduleByDate(searchData);

        if (!selectedAllScheduleByDate || selectedAllScheduleByDate.length === 0) {
            throw new Error("No schedules found for the specified date");
        }

        return selectedAllScheduleByDate;
    }

}

const travelService = new TravelService();
export { travelService };

