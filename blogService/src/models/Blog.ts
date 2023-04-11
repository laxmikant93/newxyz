import { Document, model, Schema, ObjectId } from 'mongoose';

const schema = new Schema(
  {
    title: String,
    content: String,
    imageUrl: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export interface IBlog extends Document {
  title: String,
  content: String,
  imageUrl?: String,
  user: ObjectId,
  isDeleted: boolean,
}

export default model("Blog", schema);
