import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import adminRoute from "./routes/admin.js";
import usersRoute from "./routes/users.js";
import eventRegistrationRoute from "./routes/eventRegistration.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import crypto from "crypto";
import Stripe from "stripe";
import Razorpay from "razorpay";
import nodemailer from "nodemailer";
import Accommodation from "./models/Accommodation.js";

const PORT = process.env.PORT || 8800;

const app = express();

dotenv.config();

const stripe = new Stripe(
  "sk_test_51OqsJ5SCPuWiCxONXvSsW83Vv36PmkMLm01jnkY7rlVJTrs4l5roSGueCUMy2MogFI3cH4w6ZL9i9A2Z2w0agv4x00zviUwtPU"
);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://composit2k24.onrender.com",
      "https://composit.onrender.com",
      "https://compositAdm.onrender.com",
      "https://composit.onrender.com/admin",
      "https://composit.in",
      "https://compositAdm.in",
      "https://composit.in/admin",
      "*",
    ],
  })
);
app.use(cookieParser());
app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/eventRegistration", eventRegistrationRoute);
app.use("/admin", adminRoute);

app.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = req.body;
    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).send("Error");
    }

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

// app.post("/order/validate", async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//     req.body;

//   const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
//   // order_id + "|" + razorpay_payment_id, secret
//   sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
//   const digest = sha.digest("hex");
//   if (digest !== razorpay_signature) {
//     return res.status(400).json({ msg: "Transaction is not legit!" });
//   }

//   res.json({
//     msg: "success",
//     orderId: razorpay_order_id,
//     paymentId: razorpay_payment_id,
//   });
// });

// app.post("/api/payment", async (req, res) => {
//   const { amount, token } = req.body;

//   try {
//     // Create a charge using Stripe
//     const charge = await stripe.charges.create({
//       amount: amount,
//       currency: "usd",
//       source: token,
//       description: "Payment for services/products",
//     });

//     // If successful, send success response
//     res
//       .status(200)
//       .json({ success: true, message: "Payment processed successfully" });
//   } catch (error) {
//     // If error, send error response
//     console.error("Error processing payment:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Error processing payment" });
//   }
// });

// app.post("/api/create-checkout-session", async (req, res) => {
//   const data = [
//     {
//       name: req.body.name,
//       registrationId: req.body.registrationId,
//     },
//   ];
//   console.log(data);

//   const lineItems = data.map((data) => ({
//     price_data: {
//       currency: "inr",
//       product_data: {
//         name: data.name
//       },
//       unit_amount: 400 * 100, // Amount should be in smallest currency unit (e.g., cents)
//     },
//     quantity: 1,
//   }));

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items: lineItems,
//     mode: "payment",
//     success_url: `http://localhost:3000/success`,
//     cancel_url: `http://localhost:3000/cancel`,
//   });

//     res.json({id:session.id});
// });

app.post("/accommodation", async (req, res, next) => {
  try {
    const newAccommodation = new Accommodation(req.body);
    await newAccommodation.save();
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL,
        pass: process.env.PASS,
      },
    });
    const mailOptions = {
      from: process.env.MAIL,
      // bcc: "ujjawalrr@gmail.com",
      bcc: 'lohanimayuresh2551@gmail.com',
      to: `${req.body.email}`,
      subject: "Payment Details for COMPOSIT 2024 Accommodation",
      html: `Hey <b>${req.body.name}</b>. We are verifying your payment and will give you a confirmation regarding the same within 24 hours.
          <br> 
          <b>Payment Details</b> <br> 
          <b>Name: </b> ${req.body.name} <br> 
          <b>Email: </b> ${req.body.email} <br> 
          <b>Registration ID: </b> ${req.body.regID} <br> 
          <b>Transaction ID: </b> ${req.body.paymentDetails}
          `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      res.status(200).json("Payment is getting verified. We will mail you upon verification!");
    });
  } catch (error) {
    next(error);
  }
});

app.post("/contact", async (req, res, next) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL,
        pass: process.env.PASS,
      },
    });
    const mailOptions = {
      from: process.env.MAIL,
      to: "lohanimayuresh2551@gmail.com",
      subject: "Important Message From COMPOSIT Website",
      html: `User <b>${req.body.name}</b> is trying to contact you via <b>${req.body.email}</b>. <br> <b>Subject:</b> ${req.body.subject} <br> <b>Message:</b> ${req.body.message}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      res.status(200).json("Message sent!");
    });
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(PORT, () => {
  connect();
  console.log("Connected to backend!!");
});
