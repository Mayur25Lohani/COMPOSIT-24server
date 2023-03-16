import mongoose from "mongoose";
const TechnovaSchema = new mongoose.Schema(
  {
    individualPid: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Technova", TechnovaSchema);
