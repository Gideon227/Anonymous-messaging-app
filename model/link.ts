import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ILink extends Document {
  linkId: string,
  participants: string[];
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const Link = mongoose.models?.Link || mongoose?.model<ILink>('Link', linkSchema);

export default Link;