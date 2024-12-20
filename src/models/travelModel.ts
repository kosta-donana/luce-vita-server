import supabase from "../supabaseClients";
import { Travel } from "../types/travel.type";

class TravelModel {
    // 여행 리스트를 조회
    async getTravelListByUserId(user_id: string) {
        const { data, error } = await supabase
            .from("travel")
            .select("*, country(country_name, currency)")
            .eq("user_id", user_id) // user_id로 필터링
            .order("start_date", { ascending: false }); // start_date를 기준으로 내림차순 정렬
        console.log("data", data);
        if (error) {
            throw new Error(error.message);
        }

        return data;
    }

    // 여행 생성
    async insertTravel(travelData: Travel) {
        const { data, error } = await supabase.from("travel").insert(travelData).select("*");

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }

    // 여행 업데이트
    async updateTravelByTravelId(travel_id: string, travelData: Travel) {
        const { data, error } = await supabase.from("travel").update(travelData).eq("travel_id", travel_id).select("*");

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }

    // 여행 삭제
    async deleteTravelByTravelId(travel_id: string) {
        const { data, error } = await supabase.from("travel").delete().eq("travel_id", travel_id).select("*");

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }

    async getTravelBudgetListByTravelId(travel_id: string) {
        const { data, error } = await supabase
            .from("schedule")
            .select("schedule_date, budget")
            .eq("travel_id", travel_id)
            .order("schedule_date");

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }

    // 여행에서 날짜별로 두 번째 일정까지 가져옴
    async getTravelTopScheduleByDate(travel_id: string) {
        const { data, error } = await supabase.rpc("get_grouped_schedule", {
            travel_id_param: travel_id,
            limit_rows: 2,
        });

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }


}

const travelModel = new TravelModel();
export { travelModel };

