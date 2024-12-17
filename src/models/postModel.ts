import supabase from "../supabaseClients";

class PostData {
  async fetchPostDataByUserid(author: string): Promise<any> {
    const { data, error } = await supabase.from("post").select("*").eq("author", author);

    if (error) {
      console.error("Fail to load post data by user_id", error);
      return [];
    }

    return data || [];
  }

  async fetchPostDataByPostid(post_id: string): Promise<any> {
    const { data, error } = await supabase.from("post").select("*").eq("post_id", post_id);

    if (error) {
      console.error("Fail to load post data by post_id", error);
      return [];
    }

    return data || [];
  }
}

class CommentData {
  async fetchCommentDataByUserid(author: string): Promise<any> {
    const { data, error } = await supabase.from("comment").select("*").eq("author", author);

    if (error) {
      console.error("Fail to load comment data by user_id", error);
      return [];
    }

    return data || [];
  }
}

const postData = new PostData();
const commentData = new CommentData();

export { postData, commentData };
