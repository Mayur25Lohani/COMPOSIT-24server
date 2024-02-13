import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { v4 } from "uuid";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    // await newUser.save();
    // res.status(200).send("User has been created.");
    if (user === null) {
      await newUser.save();
      // mailing
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
        to: req.body.email,
        subject: `Registration Successful`,
        html: `<p> Hey <span style="color: #00CA79; font-weight:600">${req.body.name}</span>!! Greetings from COMPOSIT, IIT KHARAGPUR. You have been successfully registered for COMPOSIT 2024. Your registration id is <span style="color: #00CA79; font-weight:600">${req.body.regID}</span> .</p>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.send("error in mailing");
        } else {
          // res.redirect('/contact')
          res
            .status(200)
            .send(
              `Hey ${req.body.name}!! Greetings from COMPOSIT, IIT KHARAGPUR. You have been successfully registered for COMPOSIT. Your registration id is ${req.body.regID}`
            );
          // res.status(200).send("User has been created and mailed");
        }
      });
      // res.status(200).send("User has been created.");
      // res.status(200).send(`Hey ${req.body.name}!! Greetings from COMPOSIT, IIT KHARAGPUR. You have been successfully registered for COMPOSIT. Your registration id is ${req.body.regID}`);
    } else {
      console.log("dont save");
      res
        .status(400)
        .send(`This email is already registered with name ${req.body.name}.`);
    }

    // const user = await User.findOne({ email: req.body.email });
  } catch (err) {
    console.log(err, "Error in creating user");
    // console.log("first")
    res
      .status(400)
      .send(
        "Your registration was not completed. Please check all fields and try again. If the problem persists please contact us."
      );
    // res.status(500).send(err);
  }
};
export const login = async (req, res, next) => {
  // console.log("bad",req)
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) return next(createError(400, "Wrong password!"));
    const { password, ...otherDetails } = user._doc;

    res.status(200).json({ ...otherDetails });

    // const token = jwt.sign(
    //   { id: user._id },
    //   process.env.JWT
    // );

    // const { password, ...otherDetails } = user._doc;
    // res
    //   .cookie("access_token", token, {
    //     httpOnly: true,
    //   })
    //   .status(200)
    //   .json({ details: { ...otherDetails } });
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};
