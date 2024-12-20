export interface Schedule {
    schedule_id?: string; // optional
    schedule_no: number;
    budget: number;
    schedule_content: string;
}

export interface ReqSchedule {
    travel_id: string;
    schedule_date: string;
    schedule_list: Schedule[]; // Schedule 타입 배열
}
