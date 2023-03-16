import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import { v4 } from 'uuid';



export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });
    console.log("e1")
    await newUser.save();
    console.log("e2")
    const user = await User.findOne({ email: req.body.email });

    // mailing
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          user: 'ujjawalkgp@gmail.com',
          pass: 'oyvziqntqpvlpdti'
      }
  })

  const mailOptions = {
      from: 'ujjawalkgp@gmail.com',
      to: req.body.email,
      subject: `Registration Successful`,
      html: `<h1> Hey ${req.body.name}!! Greetings from COMPOSIT, IIT KHARAGPUR. You have been successfully registered for COMPOSIT. Your registration id is COMP23${req.body.contact} .<h1>`
  }

  transporter.sendMail(mailOptions, (error, info) => {
      if(error){
          console.log(error);
          res.send('error');
      }else{
          // res.redirect('/contact')
          res.status(200).send("User has been created.");
      }
  })
    // res.status(200).send("User has been created.");
  } catch (err) {
    console.log(err, "jkjk")
    // console.log("first")
    next(err);
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
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password!"));

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT
    );

    const { password, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails } });
  } catch (err) {
    next(err);
  }
};

export const logout = (req,res) => {
  res.clearCookie("access_token",{
    sameSite:"none",
    secure:true
}).status(200).json("User has been logged out.")
}