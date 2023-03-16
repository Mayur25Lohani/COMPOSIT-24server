import mongoose from "mongoose";
const EnigmaSchema = new mongoose.Schema(
  {
    individualPid: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Enigma", EnigmaSchema);
