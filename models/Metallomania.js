import mongoose from "mongoose";
const MetallomaniaSchema = new mongoose.Schema(
  {
    participantId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Metallomania", MetallomaniaSchema);
