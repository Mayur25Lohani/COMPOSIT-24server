import mongoose from "mongoose";
const ExcavateSchema = new mongoose.Schema(
  {
    individualPid: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Excavate", ExcavateSchema);
