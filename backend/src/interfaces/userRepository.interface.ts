import { IUser } from "./user.interface";

export interface IUserRepository {
  findByEmail(email: string): Promise<IUser | null>;
  create(userData: { email: string; password: string }): Promise<IUser>;
  findAllPaginated(page: number, limit: number, search?: string): Promise<{
    users: Omit<IUser, 'password'>[];
    total: number;
    pages: number;
  }>;
}