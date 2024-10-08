import { Schema, model } from 'mongoose';

const platformTagSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  }
}, { timestamps: true });

const PlatformTag = model('PlatformTag', platformTagSchema);
export default PlatformTag;
