import supabase from "../supabaseClients";

class PostService {
  // 게시물 리스트 조회
  async viewPostList(category: string): Promise<any> {
    const { data, error } = await supabase.from("post").select("*").eq("category", category).select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // 게시물  조회
  async viewPost(category: string, post_id: number): Promise<any> {
    const { data, error } = await supabase
      .from("post")
      .select("*")
      .eq("category", category)
      .eq("post_id", post_id)
      .select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // 게시글 생성
  async createPost(
    user: any,
    title: string,
    content: string,
    category: string,
    attached_file: string,
    tags: string[]
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    if (!user) {
      return { success: false, error: "User not authenticated" };
    }

    const newPost = {
      title: title || "",
      content: content || "",
      category: category || "",
      author_id: user.id,
      attached_file: attached_file || null,
      tags: tags || [],
    };

    const { data, error: insertError } = await supabase.from("post").insert([newPost]).select("*");

    if (insertError) {
      return { success: false, error: insertError.message };
    }

    return { success: true, data: data };
  }

  // 게시글 업데이트
  async updatePost(
    user: any,
    post_id: number,
    title: string,
    content: string,
    category: string,
    attached_file: string,
    tags: string[]
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    if (!user) {
      return { success: false, error: "User not authenticated" };
    }

    const editPost = {
      title,
      content,
      category,
      attached_file: attached_file || null,
      tags,
    };

    const { data, error: updateError } = await supabase
      .from("post")
      .update([editPost])
      .eq("post_id", post_id)
      .eq("author_id", user.id)
      .select("*");

    if (updateError) {
      return { success: false, error: updateError.message };
    }

    return { success: true, data: data };
  }

  // 게시글 삭제
  async deletePost(user: any, post_id: number): Promise<{ success: boolean; data?: any; error?: string }> {
    if (!user) {
      return { success: false, error: "User not authenticated" };
    }

    const { data, error: deleteError } = await supabase
      .from("post")
      .delete()
      .eq("post_id", post_id)
      .eq("author_id", user.id)
      .select("*");

    if (deleteError) {
      return { success: false, error: deleteError.message };
    }

    return { success: true, data: data };
  }
}

const postService = new PostService();
export { postService };
