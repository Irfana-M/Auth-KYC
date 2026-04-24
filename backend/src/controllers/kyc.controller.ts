import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { HttpStatusCode } from "../constants/httpStatusCode";
import { MESSAGES } from "../constants/messages";
import { AppError } from "../types/appError";
import { IKycService } from "../interfaces/kycService.interface";
import { AuthRequest } from "../interfaces/authRequest.interface";
@injectable()
export class KycController {
    constructor(
        @inject(TYPES.KycService) private kycService: IKycService,

    ) { }

    uploadKyc = async (req: AuthRequest, res: Response) => {
        try {

            const files = req.files as
                | { image?: Express.Multer.File[]; video?: Express.Multer.File[] }
                | undefined;

            if (!files || !files.image || !files.video) {
                throw new AppError(
                    MESSAGES.KYC.REQUIRED,
                    HttpStatusCode.BAD_REQUEST
                );
            }

            const userId = req.user?.id;

            if (!userId) {
                throw new AppError(
                    MESSAGES.UNAUTHORIZED,
                    HttpStatusCode.UNAUTHORIZED
                );
            }

            const result = await this.kycService.uploadKyc(
                userId,
                files.image[0],
                files.video[0]
            );

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: MESSAGES.KYC.SUCCESS,
                data: result,
            });

        } catch (error: any) {
            const statusCode =
                error instanceof AppError
                    ? error.statusCode
                    : HttpStatusCode.INTERNAL_SERVER_ERROR;

            res.status(statusCode).json({
                success: false,
                message:
                    error.message || MESSAGES.COMMON.INTERNAL_ERROR,
            });
        }
    };
}