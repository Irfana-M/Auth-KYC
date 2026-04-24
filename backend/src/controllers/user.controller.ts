import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";

import { IUserService } from "../interfaces/userService.interface";
import { HttpStatusCode } from "../constants/httpStatusCode"
import logger from "../utils/logger";
import ms from "ms";
import { AppError } from "../types/appError";
import { MESSAGES } from "../constants/messages";

@injectable()
export class UserController {
  constructor(
    @inject(TYPES.UserService) private userService: IUserService
  ) { }

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new AppError(
          MESSAGES.REQUIRED_FIELDS,
          HttpStatusCode.BAD_REQUEST
        );
      }
      const { user } = await this.userService.register(email, password);

      logger.info(`User registered: ${email}`);

      res.status(HttpStatusCode.CREATED).json({
        success: true,
        message: MESSAGES.REGISTER_SUCCESS,
        data: user,
      });
    } catch (error: unknown) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new AppError(
          MESSAGES.REQUIRED_FIELDS,
          HttpStatusCode.BAD_REQUEST
        );
      }
      const { accessToken, refreshToken } = await this.userService.login(email, password);
      const expires = process.env.REFRESH_COOKIE_EXPIRES;

      if (!expires) {
        throw new Error("REFRESH_COOKIE_EXPIRES not defined in .env");
      }
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: ms(expires as ms.StringValue),
      })
      logger.info(`User logged in: ${email}`);

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: MESSAGES.LOGIN_SUCCESS,
        data: { accessToken },
      });
    } catch (error: unknown) {
      next(error);
    }
  };


  refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies?.refreshToken;

      if (!refreshToken) {
        throw new AppError(
          MESSAGES.NO_REFRESH_TOKEN,
          HttpStatusCode.UNAUTHORIZED
        );
      }

      const { accessToken } = await this.userService.refreshToken(refreshToken);

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: MESSAGES.TOKEN_REFRESHED,
        data: { accessToken },
      });
    } catch (error) {
      next(error);
    }
  }


  logout = async (req: Request, res: Response) => {

    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'none',
      secure: true
    });

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.LOGOUT_SUCCESS,
    });
  };


  getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = (req.query.search as string) || "";

      const data = await this.userService.getUsersPaginated(
        page,
        limit,
        search
      );

      console.log(data)

      res.status(HttpStatusCode.OK).json({
        success: true,
        data,
      });
    } catch (error: unknown) {
      next(error);
    }
  };
}