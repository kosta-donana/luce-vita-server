import { Request, Response, Router } from "express";
import { admin } from "../middleware/adminMiddle";
import { loginRequired } from "../middleware/loginRequired";
import { postService } from "../services/postService";
import { handleError } from "../utils/errorHandle";

const router: Router = Router();

// 게시글 리스트 조회
router.get("/:category", loginRequired.checkLogin.bind(loginRequired), async (req: Request, res: Response) => {
  const { category } = req.params;

  try {
    const post = await postService.viewPostList(category);

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    handleError(res, error);
  }
});

// 상세 게시글 조회
router.get("/:category/:post_id", loginRequired.checkLogin.bind(loginRequired), async (req: Request, res: Response) => {
  const { category } = req.params;
  const post_id = parseInt(req.params.post_id, 10);

  try {
    const post = await postService.viewPost(category, post_id);

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    handleError(res, error);
  }
});

// 게시글 생성
router.post(
  "/create",
  loginRequired.checkLogin.bind(loginRequired),
  admin.checkAdminRole.bind(admin),
  async (req: Request, res: Response): Promise<void> => {
    const { title, content, category, attached_file, tags } = req.body;
    const file = attached_file || null;
    const user = (req as any).user;

    if (!user) {
      res.status(401).json({ success: false, error: "User not authenticated" });
    }

    try {
      const createPost = await postService.createPost(user, title, content, category, file, tags);

      res.status(200).json({ success: true, data: createPost });
    } catch (error) {
      handleError(res, error);
    }
  }
);

// 게시글 수정
router.put(
  "/edit/:post_id",
  loginRequired.checkLogin.bind(loginRequired),
  admin.checkAdminRole.bind(admin),
  async (req: Request, res: Response): Promise<void> => {
    const post_id = parseInt(req.params.post_id, 10);
    const { title, content, category, attached_file, tags } = req.body;
    const file = attached_file || null;
    const user = (req as any).user;

    if (!user) {
      res.status(401).json({ success: false, error: "User not authenticated" });
    }

    try {
      const updatePost = await postService.updatePost(user, post_id, title, content, category, file, tags);

      res.status(200).json({ success: true, data: updatePost });
    } catch (error) {
      handleError(res, error);
    }
  }
);

// 게시글 삭제
router.delete(
  "/delete/:post_id",
  loginRequired.checkLogin.bind(loginRequired),
  admin.checkAdminRole.bind(admin),
  async (req: Request, res: Response): Promise<void> => {
    const post_id = parseInt(req.params.post_id, 10);
    const user = (req as any).user;

    if (!user) {
      res.status(401).json({ success: false, error: "User not authenticated" });
    }

    try {
      const deletePost = await postService.deletePost(user, post_id);

      res.status(200).json({ success: true, data: deletePost });
    } catch (error) {
      handleError(res, error);
    }
  }
);

export default router;
