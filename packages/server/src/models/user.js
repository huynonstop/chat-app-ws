import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    inviteCode: {
      type: String,
      default: new Date().getTime().toString(),
    },
  },
  { timestamps: true },
);

export default mongoose.model('User', userSchema);
