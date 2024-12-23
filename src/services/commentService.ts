import supabase from "../supabaseClients";

class CommentService {
  // 댓글 추가
  async createComment(post_id: number, content: string, user: any) {
    if (!user) {
      console.error("User authentication failed");
      return { success: false, error: "User not authenticated" };
    }

    const newComment = {
      content: content,
      author: user.id,
      post_id: post_id,
    };

    const { data, error: insertError } = await supabase.from("comment").insert([newComment]).select("*");

    if (insertError) {
      console.error("Fail to insert Comment into Database", insertError.message);
      return { success: false, error: insertError.message };
    }
    return { success: true, data };
  }

  // 댓글 수정
  async editComment(comment_id: number, content: string, post_id: number, user: any) {
    if (!user) {
      console.error("User authentication failed");
      return { success: false, error: "User not authenticated" };
    }

    const updatedComment = { content: content };

    const { data, error: updateError } = await supabase
      .from("comment")
      .update([updatedComment])
      .eq("comment_id", comment_id)
      .eq("author", user.id)
      .eq("post_id", post_id)
      .select("*"); // 추가 검증

    if (updateError) {
      console.error("Fail to update Comment", updateError.message);
      return { success: false, error: updateError.message };
    }

    return { success: true, data };
  }

  // 댓글 삭제
  async deleteComment(comment_id: number, post_id: number, user: any) {
    if (!user) {
      console.error("User authentication failed");
      return { success: false, error: "User not authenticated" };
    }

    if (typeof post_id !== "number") {
      return { success: false, error: "Invalid post_id provided" };
    }

    const { data, error: deleteError } = await supabase
      .from("comment")
      .delete()
      .eq("comment_id", comment_id)
      .eq("author", user.id)
      .eq("post_id", post_id)
      .select("*");

    if (deleteError) {
      console.error("Fail to delete Comment", deleteError.message);
      return { success: false, error: deleteError.message };
    }

    return { success: true, data };
  }
}

const commentService = new CommentService();
export { commentService };
