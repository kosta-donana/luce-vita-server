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
          countryno: number;
          countrycode: string;
          countryname: string;
          currency: string;
        };
      };

      users: {
        Row: {
          id: string;
          email: string;
          userpw: string;
          nickname: string;
          userprofile: string;
          role: Enumerator;
          createdat: Date;
        };
        Insert: {
          id: string;
          email: string;
          userpw: string;
          nickname: string | null;
          userprofile: string | null;
          role: Enumerator;
          createdat: Date;
        };
        Update: {
          id?: never;
          email?: never; 
          userPw: string;
          nickname: string | null;
          userprofile: string | null;
          role?: never;
          createdat?: never;
        };
      };

      passport: {
        Row: {
          passid: string;
          userid: string;
          passnum: string;
          passname: string;
          countryno: number;
          issuedate: Date;
          expiredate: Date;
        };
        Insert: {
          passid: string;
          userid: string;
          passNum: string | null;
          passName: string | null;
          countryNo: number | null;
          issueDate: Date | null;
          expireDate: Date | null;
        };
        Update: {
          passid?: never;
          userid: string;
          passnum: string | null;
          passname: string | null;
          countryno: number | null;
          issuedate: Date | null;
          expiredate: Date | null;
        };
      };

      schedule: {
        Row: {
          scheduleid: number;
          tripid: number;
          scheduledate: Date;
          budget: number;
          schedulecontext: string;
          scheduleno: number;
        };
        Insert: {
          scheduleid?: never;
          tripid?: never;
          scheduledate: Date;
          budget: number | null;
          schedulecontext: string | null;
          scheduleno: number;
        };
        Update: {
          scheduleid?: never;
          tripid?: never;
          scheduledate: Date;
          budget: number | null;
          schedulecontext: string | null;
          scheduleno: number;
        };
      };

      trip: {
        Row: {
          tripid: number;
          userid: string;
          countryno: number;
          localname: string;
          startdate: Date;
          enddate: Date;
          address: string;
          title: string;
          tripimg: string;
          budgettotal: number;
          tag: string;
          memo: string;
        };
        insert: {
          tripid?: never;
          userid: string;
          countryno: number;
          localname: string | null;
          startdate: Date | null;
          enddate: Date | null;
          address: string | null;
          title: string | null;
          tripimg: string | null;
          budgettotal: number | null;
          tag: string | null;
          memo: string | null;
        };
        update: {
          tripid?: never;
          userid?: never;
          countryno: number;
          localname: string | null;
          startdate: Date | null;
          enddate: Date | null;
          address: string | null;
          title: string | null;
          tripimg: string | null;
          budgettotal: number | null;
          tag: string | null;
          memo: string | null;
        };
      };
    };
  };
}
