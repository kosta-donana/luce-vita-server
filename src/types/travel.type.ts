export interface Travel {
    travel_title: string;
    user_id: string;
    country_no: number;
    local_name: string;
    start_date: string;
    end_date: string;
    address: string;
    travel_img: string;
    budget_total: number;
    memo: string;
    tags: string[]
}

export interface ResTravel extends Travel {
    travel_id: string;
    country: {
        currency: string;
        country_name: string;
    }
}