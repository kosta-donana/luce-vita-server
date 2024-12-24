import supabase from "../supabaseClients";

class CommentService {
  // 댓글 추가
  async createComment(post_id: number, content: string, user: any) {
    if (!user) {
      return { success: false, error: "User not authenticated" };
    }

    const newComment = {
      content: content,
      author_id: user.id,
      post_id: post_id,
    };

    const { data, error: insertError } = await supabase.from("comment").insert([newComment]).select("*");

    if (insertError) {
      return { success: false, error: insertError.message };
    }
    return { success: true, data };
  }

  // 댓글 수정
  async editComment(comment_id: number, content: string, post_id: number, user: any) {
    if (!user) {
      return { success: false, error: "User not authenticated" };
    }

    const updatedComment = { content: content };

    const { data, error: updateError } = await supabase
      .from("comment")
      .update([updatedComment])
      .eq("comment_id", comment_id)
      .eq("author_id", user.id)
      .eq("post_id", post_id)
      .select("*"); // 추가 검증

    if (updateError) {
      return { success: false, error: updateError.message };
    }

    return { success: true, data };
  }

  // 댓글 삭제
  async deleteComment(comment_id: number, post_id: number, user: any) {
    if (!user) {
      return { success: false, error: "User not authenticated" };
    }

    if (typeof post_id !== "number") {
      return { success: false, error: "Invalid post_id provided" };
    }

    const { data, error: deleteError } = await supabase
      .from("comment")
      .delete()
      .eq("comment_id", comment_id)
      .eq("author_id", user.id)
      .eq("post_id", post_id)
      .select("*");

    if (deleteError) {
      return { success: false, error: deleteError.message };
    }

    return { success: true, data };
  }
}

const commentService = new CommentService();
export { commentService };

