import mongoose from "mongoose";
const SchoolQuizSchema = new mongoose.Schema(
  {
    individualPid: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SchoolQuiz", SchoolQuizSchema);
