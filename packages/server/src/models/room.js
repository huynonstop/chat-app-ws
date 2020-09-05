import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    users: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
      },
    ],
    type: {
      type: String,
      default: 'NOT_SET',
    },
  },
  { timestamps: true },
);

export default mongoose.model('Room', roomSchema);
