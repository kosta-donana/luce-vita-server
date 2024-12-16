import supabase from "./supabaseClients";

class UserModel {
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
}

const userModel = new UserModel();
export { userModel };
