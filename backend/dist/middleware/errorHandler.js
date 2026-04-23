"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatusCode_1 = require("../constants/httpStatusCode");
const logger_1 = __importDefault(require("../utils/logger"));
const appError_1 = require("../types/appError");
const errorHandler = (err, req, res, next) => {
    let statusCode = httpStatusCode_1.HttpStatusCode.INTERNAL_SERVER_ERROR;
    let message = "Internal Server Error";
    if (err instanceof appError_1.AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err instanceof Error) {
        message = err.message;
    }
    logger_1.default.error(message, err);
    res.status(statusCode).json({
        success: false,
        message,
    });
};
exports.default = errorHandler;
