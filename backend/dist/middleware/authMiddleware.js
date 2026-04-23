"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const httpStatusCode_1 = require("../constants/httpStatusCode");
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("AUTH HEADER:", req.headers.authorization);
    if (!authHeader?.startsWith('Bearer ')) {
        res.status(httpStatusCode_1.HttpStatusCode.UNAUTHORIZED).json({ success: false, message: 'No token provided' });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(httpStatusCode_1.HttpStatusCode.UNAUTHORIZED).json({ success: false, message: 'Invalid token' });
    }
};
exports.authMiddleware = authMiddleware;
