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
  ): Promise<any> {
    if (!user) {
      throw new Error("User not authenticated");
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
      throw new Error(insertError.message);
    }

    return data;
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
  ): Promise<any> {
    if (!user) {
      throw new Error("User not authenticated");
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
      throw new Error(updateError.message);
    }

    return data;
  }

  // 게시글 삭제
  async deletePost(user: any, post_id: number): Promise<any> {
    if (!user) {
      throw new Error("User not authenticated");
    }

    const { data, error: deleteError } = await supabase
      .from("post")
      .delete()
      .eq("post_id", post_id)
      .eq("author_id", user.id)
      .select("*");

    if (deleteError) {
      throw new Error(deleteError.message);
    }

    return data;
  }
}

const postService = new PostService();
export { postService };
