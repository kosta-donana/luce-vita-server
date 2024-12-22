import { Request, Response, NextFunction } from "express";
import supabase from "../supabaseClients";

class LoadUserService {
  // 로그인된 유저 정보를 가져오는 함수
  async loadUserInfo(): Promise<{ user: any; role?: any; error?: string }> {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
      console.error("Fail to load user login info", error?.message);
      return { user: null, error: "User not authenticated" };
    }

    const { data: roleData, error: roleError } = await supabase
      .from("user_info")
      .select("role")
      .eq("user_id", data.user.id) // user_id로 필터링
      .single();

    if (roleError) {
      console.error("Fail to load user role", roleError.message);
      return { user: data.user, error: "Failed to retrieve role" };
    }

    return { user: data.user, role: roleData.role };
  }
}

class Admin {
  private loadUserInfo: LoadUserService;

  constructor(loadUserInfo: LoadUserService) {
    this.loadUserInfo = loadUserInfo; // 의존성 주입
  }

  async checkAdminRole(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { category } = req.body;
    const { user, role, error } = await this.loadUserInfo.loadUserInfo();

    if (error || !user) {
      res.status(401).json({ success: false, error: "User not authenticated" });
    }

    // req에 user와 role을 설정 (다른 미들웨어 및 라우터 사용 가능)
    (req as any).user = user;
    (req as any).role = role;

    if (category === "notice" && role !== "admin") {
      res.status(403).json({ success: false, error: "Only admin can perform this action for notice posts" });
    }

    next();
  }
}

const userService = new LoadUserService();
const admin = new Admin(userService);
export { userService, admin };
