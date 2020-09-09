import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'room',
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Chat', chatSchema);
