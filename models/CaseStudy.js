import mongoose from "mongoose";
const CaseStudySchema = new mongoose.Schema(
  {
    individualPid: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CaseStudy", CaseStudySchema);
