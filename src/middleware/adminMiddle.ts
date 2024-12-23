import { Request, Response, NextFunction } from "express";

class Admin {
  async checkAdminRole(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { category } = req.body;
    const user = (req as any).user;
    const role = (req as any).role;

    if (!user || !role) {
      res.status(401).json({ success: false, error: "User not authenticated" });
    }

    if (category === "notice" && role !== "admin") {
      res.status(403).json({ success: false, error: "Only admin can perform this action for notice posts" });
    }

    next();
  }
}

const admin = new Admin();
export { admin };
