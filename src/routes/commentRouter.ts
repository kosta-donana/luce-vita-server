import { Request, Response, Router } from "express";
import { admin } from "../middleware/adminMiddle";
import { loginRequired } from "../middleware/loginRequired";
import { commentService } from "../services/commentService";
import { handleError } from "../utils/errorHandle";

const router: Router = Router();

// 댓글 생성
router.post(
  "/",
  loginRequired.checkLogin.bind(loginRequired),
  admin.checkAdminRole.bind(admin),
  async (req: Request, res: Response): Promise<void> => {
    const { post_id, content } = req.body;
    const user = (req as any).user;

    if (!user) {
      res.status(401).json({ success: false, error: "User not authenticated" });
    }

    try {
      const createComment = await commentService.createComment(post_id, content, user);

      res.status(200).json({ success: true, data: createComment });
    } catch (error) {
      handleError(res, error);
    }
  }
);

// 댓글 수정
router.put(
  "/:comment_id",
  loginRequired.checkLogin.bind(loginRequired),
  admin.checkAdminRole.bind(admin),
  async (req: Request, res: Response): Promise<void> => {
    const comment_id = parseInt(req.params.comment_id, 10);
    const { post_id, content } = req.body;
    const user = (req as any).user;

    if (!user) {
      res.status(401).json({ success: false, error: "User not authenticated" });
    }

    try {
      const updateComment = await commentService.editComment(comment_id, content, post_id, user);

      res.status(200).json({ success: true, data: updateComment });
    } catch (error) {
      handleError(res, error);
    }
  }
);

// 댓글 삭제
router.delete(
  "/:comment_id",
  loginRequired.checkLogin.bind(loginRequired),
  admin.checkAdminRole.bind(admin),
  async (req: Request, res: Response): Promise<void> => {
    const comment_id = parseInt(req.params.comment_id, 10);
    const post_id = parseInt(req.body.post_id, 10);
    const user = (req as any).user;

    if (!user) {
      res.status(401).json({ success: false, error: "User not authenticated" });
    }

    if (isNaN(comment_id) || isNaN(post_id)) {
      res.status(400).json({ success: false, error: "Invalid comment_id or post_id" });
    }

    try {
      const deleteComment = await commentService.deleteComment(comment_id, post_id, user);

      res.status(200).json({ success: true, data: deleteComment });
    } catch (error) {
      handleError(res, error);
    }
  }
);

export default router;
