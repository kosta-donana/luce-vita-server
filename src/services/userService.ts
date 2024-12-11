import { userModel } from '../models/userModel';

class UserService {

    async getUserWithPassportById(userId : string) {
        const userWithPassport = await userModel.findUserWithPassportById(userId);

        if (!userWithPassport || userWithPassport.length === 0) {
            throw new Error('User Info not found');
        }
        return userWithPassport; 
    }

}

const userService = new UserService();
export { userService };
