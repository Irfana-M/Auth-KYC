import { injectable } from "inversify";
import { IUser } from "../interfaces/user.interface";
import { IUserRepository } from "../interfaces/userRepository.interface";
import User from "../models/user.models";

@injectable()
export class UserRepository implements IUserRepository {

    async findByEmail(email: string): Promise<IUser | null> {
        return User.findOne({ email });
    }

    async create(userData: { email: string; password: string }): Promise<IUser> {
        const user = new User(userData);
        return user.save();
    }

    async findAllPaginated(page: number = 1, limit: number = 10, search = '') {
        page = Math.max(1, page);
        limit = Math.max(10, limit);

        const skip = (page - 1) * limit;

        const query = search ? { email: { $regex: search, $options: 'i' } } : {};

        const [users, total] = await Promise.all([
            User.find(query)
                .select('-password')
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 }),
            User.countDocuments(query),
        ]);
        console.log(users);

        return {
            users,
            total,
            pages: Math.ceil(total / limit),
        }
    }
}