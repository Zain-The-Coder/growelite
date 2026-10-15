import mongoose from "mongoose";

const ReviewTokenSchema = new mongoose.Schema(
  {
    tokenHash: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    label: {
      type: String,
      maxlength: 100,
      trim: true,
      default: "",
    },
    company: {
      type: String,
      maxlength: 100,
      trim: true,
      default: "",
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    usedAt: {
      type: Date,
      default: null,
    },
    revokedAt: {
      type: Date,
      default: null,
    },
    reviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
      default: null,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// TTL index to automatically remove tokens 30 days after they expire
ReviewTokenSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 30 * 24 * 60 * 60 }
);

export default mongoose.models.ReviewToken ||
  mongoose.model("ReviewToken", ReviewTokenSchema);
