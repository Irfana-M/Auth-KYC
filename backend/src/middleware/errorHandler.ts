import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../constants/httpStatusCode";
import logger from "../utils/logger";
import { AppError } from "../types/appError";

const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
  let message = "Internal Server Error";

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message;
  }

  logger.error(message, err);

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;