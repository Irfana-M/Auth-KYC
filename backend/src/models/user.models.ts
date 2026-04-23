import mongoose, { Schema, Document } from 'mongoose';
import type { IUser } from '../interfaces/user.interface';

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    kycSubmitted: {
      type: Boolean,
      default: false,
    },
    kycImageUrl: String,
    kycVideoUrl: String,
  },

  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);