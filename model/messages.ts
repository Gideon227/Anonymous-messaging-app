import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './user';

// Define the interface for the Message document
export interface IMessage extends Document {
  chatRoomId: string;
  message: string;
  createdAt: Date;
  senderId: IUser['_id'];
  _id: string;
}

// Define the Message schema
const messageSchema = new Schema<IMessage>({
  chatRoomId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  senderId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

// Create the Message model
const Message = mongoose.models.Message || mongoose.model<IMessage>('Message', messageSchema);

export default Message;