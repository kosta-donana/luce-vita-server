import supabase from "../supabaseClients";
import { Request, Response, NextFunction } from "express";

class LoginRequired {
  async checkLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { data, error } = await supabase.auth.getUser();
    console.log("로그인 미들웨어", data);
    console.log("로그인 미들웨어", error);

    // 로그인 여부 확인
    if (!data || !data.user || !data.user.id) {
      // throw new Error("user not found");
      res.status(401).json({ success: false, error: "User not found" });
      return;
    }

    try {
      // 역할(role) 조회
      const { data: roleData, error: roleError } = await supabase
        .from("user_info")
        .select("role")
        .eq("user_id", data.user.id)
        .single();

      if (roleError || !roleData) {
        // throw new Error("role not found");
        res.status(403).json({ success: false, error: "Role not found" });
        return;
      }

      // 요청 객체에 사용자 정보와 역할 추가
      (req as any).user = data.user;
      (req as any).role = roleData.role;

      next(); // 다음 미들웨어로 전달
    } catch (err) {
      console.error("Error in checkLogin middleware:", err);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }
}

const loginRequired = new LoginRequired();
export { loginRequired };
