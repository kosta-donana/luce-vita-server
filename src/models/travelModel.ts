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

}

const travelModel = new TravelModel();
export { travelModel };
