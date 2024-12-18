import { Router, Request, Response } from "express";
import { handleError } from "../utils/errorHandle";
import { postService } from "../services/postService";

const router = Router();

// 게시글 생성
router.post("/create", async (req: Request, res: Response): Promise<void> => {
  const { title, content, category, attached_file, tags } = req.body;
  const file = attached_file || null;

  try {
    const createPost = await postService.createPost(title, content, category, file, tags);

    console.log(createPost);
    res.status(200).json({ success: true, data: createPost });
  } catch (error) {
    handleError(res, error);
  }
});

// 게시글 수정
router.put("/edit/:post_id", async (req: Request, res: Response): Promise<void> => {
  const post_id = parseInt(req.params.post_id, 10);
  const { title, content, category, attached_file, tags } = req.body;
  const file = attached_file || null;

  try {
    const deletePost = await postService.updatePost(post_id, title, content, category, file, tags);

    console.log(deletePost);
    res.status(200).json({ success: true, data: deletePost });
  } catch (error) {
    handleError(res, error);
  }
});

// 게시글 삭제
router.delete("/delete/:post_id", async (req: Request, res: Response): Promise<void> => {
  const post_id = parseInt(req.params.post_id, 10);

  try {
    const deletePost = await postService.deletePost(post_id);

    console.log(deletePost);
    res.status(200).json({ success: true, data: deletePost });
  } catch (error) {
    handleError(res, error);
  }
});

export default router;
