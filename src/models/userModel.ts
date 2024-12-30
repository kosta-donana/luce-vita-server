import supabase from "../supabaseClients";
import { Passport } from "../types/passport.type";

class UserModel {
  // 사용자 이메일 조회
  async fetchUserEmail(email: string): Promise<string[]> {
    const { data, error } = await supabase.from("user_info").select("user_email").eq("user_email", email);

    if (error) {
      return [];
    }

    return data ? data.map(row => row.user_email) : [];
  }

  // 탈퇴 유저 정보 조회
  async deletedUser(email: string): Promise<string[]> {
    const { data, error } = await supabase
      .from("user_info")
      .select("user_email") // 필요한 필드만 선택
      .eq("is_deleted", true)
      .eq("user_email", email);

    if (error) {
      console.error("Error fetching deleted user:", error.message);
      throw new Error("Failed to fetch deleted user data.");
    }

    return data ? data.map(row => row.user_email) : [];
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

  async findNickname(nickname: string) {
    const { data: existingNickname, error } = await supabase
      .from("user_info")
      .select("nickname")
      .eq("nickname", nickname)
      .select("*"); // 중복 아니면 []

    if (error) {
      throw new Error(error.message);
    }

    if (existingNickname && existingNickname.length > 0) {
      // 중복이면
      return existingNickname;
    } else {
      // 중복 아니면
      return null;
    }
  }

  // passport 테이블에 user_id 존재하는지 찾고, 없으면 insert, 있으면 update 수행
  async upsertPassportById(user_id: string, passportData: Passport) {
    // passport 테이블에 userid 있는지 확인
    const { data: existingPassport, error: fetchError } = await supabase
      .from("passport")
      .select("*")
      .eq("user_id", user_id)
      .select("*"); // 없으면 [] 빈 리스트 넘어옴

    if (fetchError) {
      throw new Error("Error fetching passport data: " + fetchError.message);
    }

    if (existingPassport && existingPassport.length > 0) {
      // passport 정보가 존재하면 업데이트
      const { data, error: updateError } = await supabase
        .from("passport")
        .update(passportData)
        .eq("user_id", user_id)
        .select("*");

      if (updateError) {
        throw new Error("Error Updating Passport: " + updateError.message);
      }

      return data; // 업데이트된 passport 정보 반환
    } else {
      // passport 정보가 없으면 인서트
      const { data, error: insertError } = await supabase
        .from("passport")
        .insert([{ user_id: user_id, ...passportData }])
        .select("*");

      if (insertError) {
        throw new Error("Error Inserting Passport: " + insertError.message);
      }
      return data; // 새로 인서트된 passport 정보 반환
    }
  }
}

const userModel = new UserModel();
export { userModel };
