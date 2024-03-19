import mongoose from "mongoose";
const AccommodationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    paymentDetails: {
      type: String,
      required: true,
      unique: true
    },
    regID: {
      type: String,
      required: true,
      unique: true
    },
  },
  { timestamps: true }
);

export default mongoose.model("Accommodation", AccommodationSchema);
