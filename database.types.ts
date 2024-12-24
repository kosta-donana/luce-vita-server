declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SUPABASE_URL: string;
      SUPABASE_KEY: string;
    }
  }
}

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      country: {
        Row: {
          country_no: number;
          country_code: string;
          country_name: string;
          currency: string;
        };
      };

      user_info: {
        Row: {
          user_id: string;
          user_email: string;
          nickname: string;
          user_profile: string;
          role: string;
          is_deleted: boolean;
          created_at: Date;
          updated_at: Date;
        };
        Insert: {
          user_id: string;
          user_email: string;
          nickname: string | null;
          user_profile: string | null;
          role: string;
          is_deleted: boolean;
          created_at: Date;
          updated_at: Date;
        };
        Update: {
          user_id?: never;
          user_email?: never;
          nickname: string | null;
          user_profile: string | null;
          role?: never;
          created_at?: never;
          updated_at: Date;
        };
      };

      passport: {
        Row: {
          passport_id: string;
          user_id: string;
          pass_num: string;
          pass_name: string;
          country_no: number;
          issue_date: Date;
          expire_date: Date;
        };
        Insert: {
          passport_id: string;
          user_id: string;
          pass_num: string | null;
          pass_name: string | null;
          country_no: number | null;
          issue_date: Date | null;
          expire_date: Date | null;
        };
        Update: {
          passport_id?: never;
          user_id: string;
          pass_num: string | null;
          pass_name: string | null;
          country_no: number | null;
          issue_date: Date | null;
          expire_date: Date | null;
        };
      };

      schedule: {
        Row: {
          schedule_id: number;
          travel_id: number;
          schedule_date: Date;
          budget: number;
          schedule_content: string;
          schedule_no: number;
          is_done: boolean;
        };
        Insert: {
          schedule_id?: never;
          travel_id?: never;
          schedule_date: Date;
          budget: number | null;
          schedule_content: string | null;
          schedule_no: number;
          is_done: boolean;
        };
        Update: {
          schedule_id?: never;
          travel_id?: never;
          schedule_date: Date;
          budget: number | null;
          schedule_content: string | null;
          schedule_no: number;
          is_done: boolean;
        };
      };

      travel: {
        Row: {
          travel_id: number;
          user_id: string;
          travel_title: string;
          local_name: string;
          country_no: number;
          start_date: Date;
          end_date: Date;
          address: string;
          travel_img: string;
          budget_total: number;
          tags: string[];
          memo: string;
        };
        insert: {
          travel_id?: never;
          user_id: string;
          travel_title: string | null;
          local_name: string | null;
          country_no: number;
          start_date: Date | null;
          end_date: Date | null;
          address: string | null;
          travel_img: string | null;
          budget_total: number | null;
          tags: string[] | null;
          memo: string | null;
        };
        update: {
          travel_id?: never;
          user_id?: never;
          travel_title: string | null;
          local_name: string | null;
          country_no: number;
          start_date: Date | null;
          end_date: Date | null;
          address: string | null;
          travel_img: string | null;
          budget_total: number | null;
          tags: string[] | null;
          memo: string | null;
        };
      };
    };
  };
}
