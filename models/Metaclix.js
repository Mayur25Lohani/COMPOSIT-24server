import mongoose from "mongoose";
const MetaclixSchema = new mongoose.Schema(
  {
    participantId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Metaclix", MetaclixSchema);
