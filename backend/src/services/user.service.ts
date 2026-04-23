import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { IUserRepository } from '../interfaces/userRepository.interface';
import { IUser } from '../interfaces/user.interface';
import { MESSAGES } from '../constants/messages';
import { inject, injectable } from 'inversify';
import { IUserService } from '../interfaces/userService.interface';
import { TYPES } from '../types';
import { AuthResponseDTO, PaginatedUsersDTO, RegisterResponseDTO } from '../dtos/user.dto';
import { mapUserToDTO } from '../mappers/user.mapper';
import { AppError } from '../types/appError';
import { HttpStatusCode } from '../constants/httpStatusCode';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.UserRepository) private _userRepo: IUserRepository
  ) { }

  async register(email: string, password: string): Promise<RegisterResponseDTO> {
    if (!email || !password) {
      throw new AppError(
        MESSAGES.REQUIRED_FIELDS,
        HttpStatusCode.BAD_REQUEST
      );
    }

    const existing = await this._userRepo.findByEmail(email);
    if (existing) {
      throw new AppError(
        MESSAGES.USER_EXISTS,
        HttpStatusCode.BAD_REQUEST
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this._userRepo.create({
      email,
      password: hashedPassword,
    });

    return {
      user: mapUserToDTO(user),
    };
  }

  async login(email: string, password: string): Promise<AuthResponseDTO> {
    if (!email || !password) {
      throw new AppError(
        MESSAGES.REQUIRED_FIELDS,
        HttpStatusCode.BAD_REQUEST
      );
    }

    const user = await this._userRepo.findByEmail(email);
    if (!user) {
      throw new AppError(
        MESSAGES.INVALID_CREDENTIALS,
        HttpStatusCode.UNAUTHORIZED
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError(
        MESSAGES.INVALID_CREDENTIALS,
        HttpStatusCode.UNAUTHORIZED
      );
    }

    const accessToken = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_ACCESS_SECRET as string,
      { expiresIn: process.env.JWT_ACCESS_EXPIRES as SignOptions['expiresIn'] }
    );

    const refreshToken = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_REFRESH_SECRET as string,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES as SignOptions['expiresIn'] }
    );

    return { accessToken, refreshToken };
  }

  
  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    if (!refreshToken) {
      throw new AppError(MESSAGES.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED);
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as { id: string };
      const accessToken = jwt.sign(
        { id: decoded.id },
        process.env.JWT_ACCESS_SECRET as string,
        { expiresIn: '15m' }
      );

      return { accessToken };
    } catch (error) {
      throw new AppError(MESSAGES.TOKEN_EXPIRED, HttpStatusCode.UNAUTHORIZED);
    }
  }


  async getUsersPaginated(
    page: number,
    limit: number,
    search: string
  ): Promise<PaginatedUsersDTO> {
    const result = await this._userRepo.findAllPaginated(page, limit, search);

    return {
      users: result.users.map(mapUserToDTO),
      total: result.total,
      pages: result.pages,
    };
  }
}