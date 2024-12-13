import supabase from "../supabaseClients";

class UserModel {
  // 사용자 이메일 조회
  async fetchUserEmail(email: string) {
    const { data, error } = await supabase.from("user_info").select("email");

    if (error) {
      console.error("유저 데이터 DB 조회 실패", error);
      return [];
    }

    return data ? data.map(row => row.email) : [];
  }

  // 사용자 정보와 여권 정보 같이 조회하는 함수
  async findUserWithPassportById(userId: string) {
    const { data, error } = await supabase.from("user").select("*, passport(*)").eq("id", userId);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}

const userModel = new UserModel();
export { userModel };
