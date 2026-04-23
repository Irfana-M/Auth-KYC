import { AuthResponseDTO, PaginatedUsersDTO, RegisterResponseDTO } from "../dtos/user.dto";


export interface IUserService {
    register(email: string, password: string): Promise<RegisterResponseDTO>;
    login(email: string, password: string): Promise<AuthResponseDTO>;
    getUsersPaginated(page: number, limit: number, search: string):Promise<PaginatedUsersDTO>;
    refreshToken(refreshToken: string): Promise<{ accessToken: string}>
}