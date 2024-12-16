import { userModel } from "../models/userModel";

class UserService {
  async getUserWithPassportById(userId: string) {
    const userWithPassport = await userModel.findUserWithPassportById(userId);

    if (!userWithPassport || userWithPassport.length === 0) {
      throw new Error("User Info not found");
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
