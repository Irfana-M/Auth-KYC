import { IUser } from "../interfaces/user.interface";
import { UserDTO } from "../dtos/user.dto";

export const mapUserToDTO = (user: Omit<IUser, "password">): UserDTO => {
    return {
        id: user._id.toString(),
        email: user.email,
        kycSubmitted: !!user.kycSubmitted,
    };
};