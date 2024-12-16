import { userModel } from "../models/userModel";

class UserService {
  async getUserWithPassportById(user_id: string) {
    const userWithPassport = await userModel.findUserWithPassportById(user_id);

    if (!userWithPassport || userWithPassport.length === 0) {
      throw new Error("User not found");
    }
    return userWithPassport;
  }
}

const userService = new UserService();
export { userService };
