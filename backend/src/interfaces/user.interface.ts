import { Document } from "mongoose";

export interface IUser extends Document {
    email: string;
    password: string;
    kycSubmitted: boolean;
    kycImageUrl?: string;
    kycVideoUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
}