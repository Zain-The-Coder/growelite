import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true,
    },
    role: {
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
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer rating",
      },
    },
    text: {
      type: String,
      required: true,
      minlength: 20,
      maxlength: 1000,
      trim: true,
    },
    published: {
      type: Boolean,
      default: true,
      index: true,
    },
    tokenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReviewToken",
      default: null,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Compound index for querying published reviews ordered by creation date
ReviewSchema.index({ published: 1, createdAt: -1 });
ReviewSchema.index({ createdAt: -1 });

export default mongoose.models.Review ||
  mongoose.model("Review", ReviewSchema);
