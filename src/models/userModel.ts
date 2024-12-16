import supabase from "../supabaseClients";

class UserModel {
  // 사용자 이메일 조회
  async fetchUserEmail(email: string) {
    const { data, error } = await supabase.from("user_info").select("user_email").eq("user_eamil", email);

    if (error) {
      console.error("유저 데이터 DB 조회 실패", error);
      return [];
    }

    return data ? data.map((row) => row.user_email) : [];
  }

  // 사용자 ID로 사용자와 여권 정보 조회
  async findUserWithPassportById(user_id: string) {
    const { data, error } = await supabase
      .from("user_info")
      .select(
        `
                *,
                passport(*, 
                    country(country_name)
                )
            `
      )
      .eq("user_id", user_id);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // 회원 탈퇴
  async deleteUserById(user_id: string) {
    console.log(user_id);
    const { data, error } = await supabase
      .from("user_info")
      .update({ is_deleted: true })
      .eq("user_id", user_id)
      .select("*");
    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}

const userModel = new UserModel();
export { userModel };
