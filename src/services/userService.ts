import { userModel } from "../models/userModel";
import { Passport } from "../types/passport.type";

class UserService {
  async getUserWithPassportById(user_id: string) {
    const userWithPassport = await userModel.findUserWithPassportById(user_id);

    if (!userWithPassport || userWithPassport.length === 0) {
      throw new Error("User not found");
    }
    return userWithPassport;
  }

  // 회원 탈퇴
  async deleteUser(user_id: string) {
    const deletedUser = await userModel.deleteUserById(user_id);

    if (!deletedUser || deletedUser.length === 0) {
      throw new Error("User not found");
    }
    return deletedUser;
  }

  async isNicknameAvailable(nickname: string) {
    const existingNickname = await userModel.findNickname(nickname);
    // 이미 존재하면 truly 값, 없으면 falsy 값 넘어옴
    // 뒤집어서 닉네임이 존재하면 false, 없으면 true 반환해줌
    return {
      available: !existingNickname,
      message: existingNickname ? "Nickname is already taken." : "Nickname is available.",
    };
  }

  async upsertPassport(user_id: string, passportData: Passport) {
    const upsertedPassport = await userModel.upsertPassportById(user_id, passportData);

    if (!upsertedPassport || upsertedPassport.length === 0) {
      throw new Error("User not found or error updating passport");
    }
    return upsertedPassport;
  }
}

const userService = new UserService();
export { userService };

