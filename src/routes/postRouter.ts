import { Router, Request, Response } from "express";
import { handleError } from "../utils/errorHandle";
import { postService } from "../services/postService";
import { admin } from "../middleware/adminMiddle";

const router: Router = Router();

// 게시글 조회
router.get("/:category", async (req: Request, res: Response) => {
  const { category } = req.params;

  try {
    const post = await postService.viewPost(category);

    console.log(post);
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    handleError(res, error);
  }
});

// 게시글 생성
router.post("/create", admin.checkAdminRole.bind(admin), async (req: Request, res: Response): Promise<void> => {
  console.log("request body:", req.body);
  const { title, content, category, attached_file, tags } = req.body;
  const file = attached_file || null;
  const user = (req as any).user;
  console.log(user);

  if (!user) {
    res.status(401).json({ success: false, error: "User not authenticated" });
  }

  try {
    const createPost = await postService.createPost(user, title, content, category, file, tags);

    console.log(createPost);
    res.status(200).json({ success: true, data: createPost });
  } catch (error) {
    handleError(res, error);
  }
});

// 게시글 수정
router.put("/edit/:post_id", admin.checkAdminRole.bind(admin), async (req: Request, res: Response): Promise<void> => {
  const post_id = parseInt(req.params.post_id, 10);
  const { title, content, category, attached_file, tags } = req.body;
  const file = attached_file || null;
  const user = (req as any).user;
  console.log(user);

  if (!user) {
    res.status(401).json({ success: false, error: "User not authenticated" });
  }

  try {
    const updatePost = await postService.updatePost(user, post_id, title, content, category, file, tags);

    console.log(updatePost);
    res.status(200).json({ success: true, data: updatePost });
  } catch (error) {
    handleError(res, error);
  }
});

// 게시글 삭제
router.delete(
  "/delete/:post_id",
  admin.checkAdminRole.bind(admin),
  async (req: Request, res: Response): Promise<void> => {
    const post_id = parseInt(req.params.post_id, 10);
    const user = (req as any).user;

    if (!user) {
      res.status(401).json({ success: false, error: "User not authenticated" });
    }

    try {
      const deletePost = await postService.deletePost(user, post_id);

      console.log(deletePost);
      res.status(200).json({ success: true, data: deletePost });
    } catch (error) {
      handleError(res, error);
    }
  }
);

export default router;
