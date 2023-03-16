import mongoose from "mongoose";
const IdeathonSchema = new mongoose.Schema(
  {
    individualPid: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ideathon", IdeathonSchema);
