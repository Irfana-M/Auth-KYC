export type UserDTO = {
    id: string;
    email: string;
    kycSubmitted: boolean;
};

export type AuthResponseDTO = {
    accessToken: string;
    refreshToken: string;
};

export type RegisterResponseDTO = {
    user: UserDTO;
};

export type PaginatedUsersDTO = {
    users: UserDTO[];
    total: number;
    pages: number;
}