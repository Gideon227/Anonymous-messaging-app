import mongoose, { Document, Schema, Types } from 'mongoose';
import Link from './link';

// Define the interface for the User document
export interface IUser extends Document {
  username: string;
  avatar: number,
  linksCreated?: Types.ObjectId[], 
  createdAt: Date;
}

// Define the User schema
const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: Number,
    required: true
  },
  linksCreated: {
    type: [Types.ObjectId],
    ref: Link,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

// Create the User model
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;