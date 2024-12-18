import supabase from "../supabaseClients";

class LoadUserService {
  // 로그인된 유저 정보를 가져오는 함수
  async loadUserInfo(): Promise<{ user: any; error?: string }> {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
      console.error("Fail to load user login info", error?.message);
      return { user: null, error: "User not authenticated" };
    }

    return { user: data.user };
  }
}

class PostService {
  private userInfo: LoadUserService;

  constructor(userInfo: LoadUserService) {
    this.userInfo = userInfo; // 의존성 주입
  }

  // 게시글 생성
  async createPost(
    title: string,
    content: string,
    category: string,
    attached_file: string,
    tags: string[]
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    const { user, error } = await this.userInfo.loadUserInfo();

    if (error || !user || !user.id) {
      return { success: false, error: "User not authenticated or invalid user data" };
    }

    const newPost = {
      title: title || "", // null 방지
      content: content || "",
      category: category || "",
      author: user.id,
      attached_file: attached_file || null,
      tags: tags || [],
    };

    console.log("Inserting post:", newPost);

    const { data, error: insertError } = await supabase.from("post").insert([newPost]);

    if (insertError) {
      console.error("Database insert error:", insertError.message);
      return { success: false, error: insertError.message };
    }

    return { success: true, data: data };
  }

  async updatePost(
    post_id: number,
    title: string,
    content: string,
    category: string,
    attached_file: string,
    tags: string[]
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    const { user, error } = await this.userInfo.loadUserInfo();

    if (error || !user) {
      return { success: false, error: "User not authenticated" };
    }
    console.log("current user:", user);

    const editPost = {
      title,
      content,
      category,
      attached_file: attached_file || null,
      tags,
    };

    // 게시글 db에 업데이트
    const { data, error: updateError } = await supabase
      .from("post")
      .update([editPost])
      .eq("post_id", post_id)
      .eq("author", user.id);

    if (updateError) {
      console.error("Fail to insert post into database", updateError.message);
      return { success: false, error: updateError.message };
    }
    console.log("Post updated successfully", data);
    return { success: true, data: data };
  }

  //   게시글 삭제
  async deletePost(post_id: number): Promise<{ success: boolean; data?: any; error?: string }> {
    const { user, error } = await this.userInfo.loadUserInfo();

    if (error || !user) {
      return { success: false, error: "User not authenticated" };
    }

    const { data, error: deleteError } = await supabase
      .from("post")
      .delete()
      .eq("post_id", post_id)
      .eq("author", user.id);

    if (deleteError) {
      return { success: false, error: "Fail to delete the post" };
    }

    return { success: true, data: data };
  }
}

const userInfo = new LoadUserService();
const postService = new PostService(userInfo);
export { postService };
