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
        console.log(travelData);
        const insertedTravel = await travelModel.insertTravel(travelData);

        if (!insertedTravel || insertedTravel.length === 0) {
            throw new Error("Failed to create the travel record.");
        }

        return insertedTravel;
    }


}

const travelService = new TravelService();
export { travelService };
