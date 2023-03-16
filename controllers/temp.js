
// export const updateIdeathon = async (req, res, next) => {
//   const IdeathonMongoId = "6410a3bd2df9aea1303581ae"
//   const p1 = req.user.id
//   const p2 = req.body.pid2
//   const p3 = req.body.pid3
//   try {

//     try {
//       const ideathon = await Ideathon.findById(IdeathonMongoId);
//       console.log(ideathon)
//     } catch (err) {
//       next(err);
//     }


//     const updatedIdeathon = await User.findByIdAndUpdate(
//       IdeathonMongoId,
//       { $set: {
//         teamPid: [{
//           pid1: p1,
//           pid2: p2,
//           pid3: p3,
//         }],
//         individualPid: [p1, p2, p3]
//       } },
//       { new: true }
//     );
//     res.status(200).json(updatedIdeathon);
//   } catch (err) {
//     next(err);
//   }
// };

export const getIdeathon = async (req, res, next) => {
    // const IdeathonMongoId = "6410a3bd2df9aea1303581ae"
    // try {
    //   const ideathon = await Ideathon.findById(IdeathonMongoId);
    //   console.log(ideathon)
    //   res.status(200).json(ideathon);
    // } catch (err) {
    //   next(err);
    // }

    try {
      const ideathon = await Ideathon.find({}, { individualPid: 1, _id:0 })
      console.log(ideathon[3].individualPid)
      res.status(200).json(ideathon);
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
//   export const getHotels = async (req, res, next) => {
//     const { min, max, ...others } = req.query;
//     try {
//       const hotels = await Hotel.find({
//         ...others,
//         cheapestPrice: { $gt: min | 1, $lt: max || 999 },
//       }).limit(req.query.limit);
//       res.status(200).json(hotels);
//     } catch (err) {
//       next(err);
//     }
//   };
