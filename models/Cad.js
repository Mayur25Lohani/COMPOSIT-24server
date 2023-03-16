import mongoose from "mongoose";
const CadSchema = new mongoose.Schema(
  {
    individualPid: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Cad", CadSchema);
