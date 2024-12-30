import { NextFunction, Request, Response } from "express";
import supabase, { emailToClient } from "../supabaseClients";

class LoginRequired {
  async checkLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.cookies.email) {
        throw new Error("No email");
      }

      const { data, error } = await emailToClient.get(req.cookies.email).auth.getUser();

      // 로그인 여부 확인
      if (!data || !data.user || !data.user.id) {
        res.status(401).json({ success: false, error: "User not found" });
        return;
      }

      // 역할(role) 조회
      const { data: roleData, error: roleError } = await supabase
        .from("user_info")
        .select("role")
        .eq("user_id", data.user.id)
        .single();

      if (roleError || !roleData) {
        res.status(403).json({ success: false, error: "Role not found" });
        return;
      }

      // 요청 객체에 사용자 정보와 역할 추가
      (req as any).user = data.user;
      (req as any).role = roleData.role;

      next(); // 다음 미들웨어로 전달
    } catch (error) {
      console.error("Error in checkLogin middleware:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }
}

const loginRequired = new LoginRequired();
export { loginRequired };
