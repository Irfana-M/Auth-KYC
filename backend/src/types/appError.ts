import { HttpStatusCode } from "../constants/httpStatusCode";

export class AppError extends Error {
    statusCode: HttpStatusCode;

    constructor(message: string, statusCode: HttpStatusCode) {
        super(message);
        this.statusCode = statusCode;
    }

}