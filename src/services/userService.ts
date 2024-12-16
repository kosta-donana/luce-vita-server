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
}

const userService = new UserService();
export { userService };
