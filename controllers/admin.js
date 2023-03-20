import User from "../models/User.js";

export const getAllUsers = async (req,res,next)=>{
    try {
      const user = await User.find({}, { _id:0 })
      console.log(user)
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
    // await Ideathon.find({}, { individualPid: 1, _id:0 }, function(err, result) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log(result)
    //     // res.json(result);
    //   }
    // });
  };