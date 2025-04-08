import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ILink extends Document {
  linkId: string,
  participants: string[];
  password: string;
  createdBy: string;
  createdAt: Date;
}

const linkSchema = new Schema<ILink>({
  linkId:{
    type: String,
    required: true,
    unique: true,
  },
  participants: {
    type: [String],
    default: [],
  },
  password: {
    type: String,
  },
  createdBy: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const Link = mongoose.models?.Link || mongoose?.model<ILink>('Link', linkSchema);

export default Link;