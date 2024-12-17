import { userModel } from "../models/userModel";

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
    console.log(deletedUser);
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
}

const userService = new UserService();
export { userService };
