import mongoose, { Schema, models } from "mongoose";

interface Request {
  sender_id: string;
  receiver_id: string; // ✅ fixed
  skillOffered: string[];
  skillNeeded: string[];
  status: string;
  message: string;
  createdAt: Date; // ✅ fixed typo
}

const RequestSchema = new Schema<Request>({
  sender_id: {
    type: String,
    required: true,
  },
  receiver_id: { // ✅ fixed
    type: String,
    required: true,
  },
  skillOffered: {
    type: [String],
    required: true,
  },
  skillNeeded: {
    type: [String],
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    required: true,
  },
  message: {
    type: String,
    default: "I am interested in swapping skills with you!",
  },
  createdAt: { // ✅ fixed typo
    type: Date,
    default: Date.now,
  },
});

export default models.RequestModel || mongoose.model("RequestModel", RequestSchema);