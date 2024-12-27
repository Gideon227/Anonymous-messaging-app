import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the User document
export interface IUser extends Document {
  username: string;
  avatar: number,
  createdAt: Date;
}

// Define the User schema
const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  avatar: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

// Create the User model
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;