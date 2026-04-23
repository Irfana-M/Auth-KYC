import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpStatusCode } from '../constants/httpStatusCode';
import { AuthRequest } from '../interfaces/authRequest.interface';

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    console.log("AUTH HEADER:", req.headers.authorization);
    if(!authHeader?.startsWith('Bearer ')) {
        res.status(HttpStatusCode.UNAUTHORIZED).json({ success: false, message: 'No token provided' });
        return;
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as { id: string };
        req.user = decoded;
        next();
    } catch (error) {
        res.status(HttpStatusCode.UNAUTHORIZED).json({ success: false, message: 'Invalid token'});
    }
}