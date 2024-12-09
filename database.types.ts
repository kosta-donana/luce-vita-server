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
          countryNo: number;
          countryCode: string;
          countryName: string;
          currency: string;
        };
      };

      users: {
        Row: {
          userId: string;
          userPw: string;
          nickname: string;
          userProfile: string;
          role: Enumerator;
          passNum: number;
          createdAt: Date;
        };
        Insert: {
          userId: string;
          userPw: string;
          nickname: string | null;
          userProfile: string | null;
          role: Enumerator;
          passNum: number | null;
          createdAt: Date;
        };
        Update: {
          userId?: never;
          userPw: string;
          nickname: string | null;
          userProfile: string | null;
          role?: never;
          passNum: number | null;
          createdAt?: never;
        };
      };

      passport: {
        Row: {
          passNum: string;
          passName: string;
          countryNo: number;
          issueDate: Date;
          expireDate: Date;
        };
        Insert: {
          passNum: string | null;
          passName: string | null;
          countryNo: number | null;
          issueDate: Date | null;
          expireDate: Date | null;
        };
        Update: {
          passNum: string | null;
          passName: string | null;
          countryNo: number | null;
          issueDate: Date | null;
          expireDate: Date | null;
        };
      };

      schedule: {
        Row: {
          scheduleId: number;
          tripId: number;
          scheduleDate: Date;
          budget: number;
          scheduleContext: string;
          scheduleNo: number;
        };
        Insert: {
          scheduleId?: never;
          tripId?: never;
          scheduleDate: Date;
          budget: number | null;
          scheduleContext: string | null;
          scheduleNo: number;
        };
        Update: {
          scheduleId?: never;
          tripId?: never;
          scheduleDate: Date;
          budget: number | null;
          scheduleContext: string | null;
          scheduleNo: number;
        };
      };

      trip: {
        Row: {
          tripId: number;
          userId: string;
          countryNo: number;
          localName: string;
          startDate: Date;
          endDate: Date;
          address: string;
          title: string;
          tripImg: string;
          budgetTotal: number;
          tag: string;
          memo: string;
        };
        insert: {
          tripId?: never;
          userId: string;
          countryNo: number;
          localName: string | null;
          startDate: Date | null;
          endDate: Date | null;
          address: string | null;
          title: string | null;
          tripImg: string | null;
          budgetTotal: number | null;
          tag: string | null;
          memo: string | null;
        };
        update: {
          tripId?: never;
          userId?: never;
          countryNo: number;
          localName: string | null;
          startDate: Date | null;
          endDate: Date | null;
          address: string | null;
          title: string | null;
          tripImg: string | null;
          budgetTotal: number | null;
          tag: string | null;
          memo: string | null;
        };
      };
    };
  };
}
