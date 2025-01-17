import supabase from "../supabaseClients";
import { ReqSchedule, Schedule } from "../types/schedule.type";
import { Travel } from "../types/travel.type";

class TravelModel {
    // 여행 리스트를 조회
    async getTravelListByUserId(user_id: string) {
        const { data, error } = await supabase
            .from("travel")
            .select("*, country(country_name, currency)")
            .eq("user_id", user_id) // user_id로 필터링
            .order("start_date", { ascending: false }); // start_date를 기준으로 내림차순 정렬
        if (error) {
            throw new Error(error.message);
        }

        return data;
    }

    // 여행 생성
    async insertTravel(user_id: string, travelData: Travel) {
        const { data, error } = await supabase.from("travel").insert({ user_id, ...travelData }).select("*");

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }

    // 여행 조회
    async getTravelByTravelId(travel_id: string) {
        const { data, error } = await supabase.from("travel").select("*, country(country_name, currency)").eq("travel_id", travel_id);

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

    // 여행 해당 날짜 모든 일정 가져오기
    async getAllScheduleByDate(travel_id: string, schedule_date: string) {
        const { data, error } = await supabase
            .from("schedule")
            .select("*")
            .eq("travel_id", travel_id)
            .eq("schedule_date", schedule_date)
            .order("schedule_no"); // start_date를 기준으로 내림차순 정렬

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }


    /* 여행 상세 일정 schedule_id 확인해서 추가/업데이트/삭제 한 번에 처리 */
    async modifyTravelSchedule(scheduleData: ReqSchedule) {
        const { travel_id, schedule_date, schedule_list } = scheduleData;

        let insertedSchedule = [];
        let deletedSchedule = [];

        // 1. 새로운 일정과 기존 일정 분리
        const newSchedules = schedule_list.filter((s) => !s.schedule_id); // schedule_id 없는 새 일정
        const updatedSchedules = schedule_list.filter((s) => s.schedule_id); // schedule_id 있는 기존 일정

        // 2. 기존 일정의 scheduleId 목록 가져오기
        const { data: existingSchedules, error: fetchError } = await supabase
            .from("schedule")
            .select("schedule_id")
            .eq("travel_id", travel_id)
            .eq("schedule_date", schedule_date);

        if (fetchError) throw new Error(fetchError.message);

        const existingScheduleIds = new Set(existingSchedules.map((s) => s.schedule_id));
        const updatedScheduleIds = new Set(updatedSchedules.map((s) => s.schedule_id));

        // 3. 삭제 대상 계산 (차집합)
        const deleteScheduleIds = [...existingScheduleIds].filter((id) => !updatedScheduleIds.has(id));
        // const deleteScheduleIds = existingScheduleIds.difference(updatedScheduleIds); // node 버전 22.0.0 이상

        // 4. 삭제 처리
        if (deleteScheduleIds.length > 0) {
            const { data: fetchedDeletedSchedule, error: deleteError } = await supabase
                .from("schedule")
                .delete()
                .in("schedule_id", deleteScheduleIds)
                .select("*");

            // null일 경우 빈 배열로 초기화
            deletedSchedule = fetchedDeletedSchedule ?? [];

            if (deleteError) throw new Error("Failed to delete schedules.");
        }

        // 5. 새 일정 삽입
        if (newSchedules.length > 0) {
            const newSchedulesWithMeta = newSchedules.map((s) => ({
                ...s,
                travel_id,
                schedule_date,
            }));

            const { data: fetchedInsertedSchedule, error: insertError } = await supabase
                .from("schedule")
                .insert(newSchedulesWithMeta)
                .select("*");

            insertedSchedule = fetchedInsertedSchedule ?? [];

            if (insertError) throw new Error("Failed to insert new schedules.");
        }

        const updatedSchedule = await this.updateTravelSchedule(updatedSchedules); // 배열로 던져줌

        return {
            insertedSchedule,
            updatedSchedule,
            deletedSchedule,
        };
    }

    // 여행 상세 일정 수정  ( 내용, 예산, 순서 )
    async updateTravelSchedule(scheduleData: Schedule[]) {

        // 병렬로 업데이트 수행
        const updatePromises = scheduleData.map(async (schedule) => {
            const { data, error } = await supabase
                .from("schedule")
                .update({
                    schedule_no: schedule.schedule_no,
                    schedule_content: schedule.schedule_content,
                    budget: schedule.budget,
                })
                .eq("schedule_id", schedule.schedule_id)
                .select("*")
                .single();

            if (error) {
                throw error;
            }

            return data;
        });

        try {
            // 모든 업데이트 작업 동시 실행
            const results = await Promise.all(updatePromises);
            return results;
        } catch (error) {
        }
    }

    // 특정 날짜 상세 일정 전부 삭제
    async deleteScheduleByScheduleDate(travel_id: string, schedule_date: string) {
        const { data, error } = await supabase
            .from("schedule")
            .delete()
            .eq("travel_id", travel_id)
            .eq("schedule_date", schedule_date)
            .select("*");

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }

    // 여행 상세 일정 is_done 업데이트 (TRUE/FALSE)
    async updateIsDone(schedule_id: number, is_done: boolean) {
        const { data, error } = await supabase
            .from("schedule")
            .update({
                is_done: is_done,
            })
            .eq("schedule_id", schedule_id)
            .select("*");

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }

}

const travelModel = new TravelModel();
export { travelModel };

