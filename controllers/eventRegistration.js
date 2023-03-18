import Metaclix from "../models/Metaclix.js";
import Metallomania from "../models/Metallomania.js";
import Techtoon from "../models/Techtoon.js";
import Enigma from "../models/Enigma.js";
import SchoolQuiz from "../models/SchoolQuiz.js";
import Cad from "../models/Cad.js";
import CaseStudy from "../models/CaseStudy.js";
import Excavate from "../models/Excavate.js";
import Ideathon from "../models/Ideathon.js";
import Technova from "../models/Technova.js";

export const registerMetaclix = async (req, res, next) => {
  const newRegistration = new Metaclix({ participantId: req.body.participantId });
  try {
    const savedRegistration = await newRegistration.save();
    res.status(200).json(savedRegistration);
  } catch (err) {
    next(err)
  }
};

export const registerMetallomania = async (req, res, next) => {
  const newRegistration = new Metallomania({ participantId: req.body.participantId });
  try {
    const savedRegistration = await newRegistration.save();
    res.status(200).json(savedRegistration);
  } catch (err) {
    next(err)
  }
};

export const registerTechtoon = async (req, res, next) => {
  const newRegistration = new Techtoon({ participantId: req.body.participantId });
  try {
    const savedRegistration = await newRegistration.save();
    res.status(200).json(savedRegistration);
  } catch (err) {
    next(err)
  }
};

export const registerEnigma = async (req, res, next) => {
  const p1 = req.body.pid1
  const p2 = req.body.pid2
  try {
    const enigma = await Enigma.find({}, { individualPid: 1, _id:0 })
    let errorMsg = ""
    for (let index = 0; index < enigma.length; index++) {
      const element = enigma[index].individualPid;
      if (element.includes(p1, 0) === true) {
        errorMsg = "You are already registered"
      } else if (element.includes(p2, 0) === true && p2!==undefined) {
        errorMsg = "Participant 2 is already registered"
      }
    }
    if (errorMsg === "") {
      const newRegistration = new Enigma({
        individualPid: [p1, p2]
      });
      try {
        const savedRegistration = await newRegistration.save();
        res.status(200).json(savedRegistration);
      } catch (err) {
        next(err)
      }
    } else {
      res.status(400).json(errorMsg)
    }
  } catch (err) {
    next(err);
  }
};

export const registerSchoolquiz = async (req, res, next) => {
  const p1 = req.body.pid1
  const p2 = req.body.pid2
  try {
    const schoolQuiz = await SchoolQuiz.find({}, { individualPid: 1, _id:0 })
    let errorMsg = ""
    for (let index = 0; index < schoolQuiz.length; index++) {
      const element = schoolQuiz[index].individualPid;
      if (element.includes(p1, 0) === true) {
        errorMsg = "You are already registered"
      } else if (element.includes(p2, 0) === true && p2!==undefined) {
        errorMsg = "Participant 2 is already registered"
      }
    }
    if (errorMsg === "") {
      const newRegistration = new SchoolQuiz({
        individualPid: [p1, p2]
      });
      try {
        const savedRegistration = await newRegistration.save();
        res.status(200).json(savedRegistration);
      } catch (err) {
        next(err)
      }
    } else {
      res.status(400).json(errorMsg)
    }
  } catch (err) {
    next(err);
  }
};

export const registerCad = async (req, res, next) => {
  const p1 = req.body.pid1
  const p2 = req.body.pid2
  const p3 = req.body.pid3
  try {
    const cad = await Cad.find({}, { individualPid: 1, _id:0 })
    let errorMsg = ""
    for (let index = 0; index < cad.length; index++) {
      const element = cad[index].individualPid;
      if (element.includes(p1, 0) === true) {
        errorMsg = "You are already registered"
      } else if (element.includes(p2, 0) === true && p2!== undefined) {
        errorMsg = "Participant 2 is already registered"
      } else if (element.includes(p3, 0) === true && p3!== undefined) {
        errorMsg = "Participant 3 is already registered"
      }
    }
    if (errorMsg === "") {
      const newRegistration = new Cad({
        individualPid: [p1, p2, p3]
      });
      try {
        const savedRegistration = await newRegistration.save();
        res.status(200).json(savedRegistration);
      } catch (err) {
        next(err)
      }
    } else {
      res.status(400).json(errorMsg)
    }
  } catch (err) {
    next(err);
  }
};


export const registerCasestudy = async (req, res, next) => {
  const p1 = req.body.pid1
  const p2 = req.body.pid2
  const p3 = req.body.pid3
  try {
    const caseStudy = await CaseStudy.find({}, { individualPid: 1, _id:0 })
    let errorMsg = ""
    for (let index = 0; index < caseStudy.length; index++) {
      const element = caseStudy[index].individualPid;
      if (element.includes(p1, 0) === true) {
        errorMsg = "You are already registered"
      } else if (element.includes(p2, 0) === true && p2!==undefined) {
        errorMsg = "Participant 2 is already registered"
      } else if (element.includes(p3, 0) === true && p3!==undefined) {
        errorMsg = "Participant 3 is already registered"
      }
    }
    if (errorMsg === "") {
      const newRegistration = new CaseStudy({
        individualPid: [p1, p2, p3]
      });
      try {
        const savedRegistration = await newRegistration.save();
        res.status(200).json(savedRegistration);
      } catch (err) {
        next(err)
      }
    } else {
      res.status(400).json(errorMsg)
    }
  } catch (err) {
    next(err);
  }
};


export const registerExcavate = async (req, res, next) => {
  const p1 = req.body.pid1
  const p2 = req.body.pid2
  const p3 = req.body.pid3
  try {
    const excavate = await Excavate.find({}, { individualPid: 1, _id:0 })
    let errorMsg = ""
    for (let index = 0; index < excavate.length; index++) {
      const element = excavate[index].individualPid;
      if (element.includes(p1, 0) === true) {
        errorMsg = "You are already registered"
      } else if (element.includes(p2, 0) === true && p2!==undefined) {
        errorMsg = "Participant 2 is already registered"
      } else if (element.includes(p3, 0) === true && p3!==undefined) {
        errorMsg = "Participant 3 is already registered"
      }
    }
    if (errorMsg === "") {
      const newRegistration = new Excavate({
        individualPid: [p1, p2, p3]
      });
      try {
        const savedRegistration = await newRegistration.save();
        res.status(200).json(savedRegistration);
      } catch (err) {
        next(err)
      }
    } else {
      res.status(400).json(errorMsg)
    }
  } catch (err) {
    next(err);
  }
};

export const registerIdeathon = async (req, res, next) => {
  const p1 = req.body.pid1
  const p2 = req.body.pid2
  const p3 = req.body.pid3
  try {
    const ideathon = await Ideathon.find({}, { individualPid: 1, _id:0 })
    let errorMsg = ""
    for (let index = 0; index < ideathon.length; index++) {
      const element = ideathon[index].individualPid;
      if (element.includes(p1, 0) === true) {
        errorMsg = "You are already registered"
      } else if (element.includes(p2, 0) === true && p2!==undefined) {
        errorMsg = "Participant 2 is already registered"
      } else if (element.includes(p3, 0) === true && p3!==undefined) {
        errorMsg = "Participant 3 is already registered"
      }
    }
    if (errorMsg === "") {
      const newRegistration = new Ideathon({
        individualPid: [p1, p2, p3]
      });
      try {
        const savedRegistration = await newRegistration.save();
        res.status(200).json(savedRegistration);
      } catch (err) {
        next(err)
      }
    } else {
      res.status(400).json(errorMsg)
    }
  } catch (err) {
    next(err);
  }
};

export const registerTechnova = async (req, res, next) => {
  const p1 = req.body.pid1
  const p2 = req.body.pid2
  const p3 = req.body.pid3
  try {
    const technova = await Technova.find({}, { individualPid: 1, _id:0 })
    let errorMsg = ""
    for (let index = 0; index < technova.length; index++) {
      const element = technova[index].individualPid;
      if (element.includes(p1, 0) === true) {
        errorMsg = "You are already registered"
      } else if (element.includes(p2, 0) === true && p2!==undefined) {
        errorMsg = "Participant 2 is already registered"
      } else if (element.includes(p3, 0) === true && p3!==undefined) {
        errorMsg = "Participant 3 is already registered"
      }
    }
    if (errorMsg === "") {
      const newRegistration = new Technova({
        individualPid: [p1, p2, p3]
      });
      try {
        const savedRegistration = await newRegistration.save();
        res.status(200).json(savedRegistration);
      } catch (err) {
        next(err)
      }
    } else {
      res.status(400).json(errorMsg)
    }
  } catch (err) {
    next(err);
  }
};


export const gethealth = async (req, res, next) => {
  // const IdeathonMongoId = "6410a3bd2df9aea1303581ae"
  // try {
  //   const ideathon = await Ideathon.findById(IdeathonMongoId);
  //   console.log(ideathon)
  //   res.status(200).json(ideathon);
  // } catch (err) {
  //   next(err);
  // }
  res.status(200).json("From server");
  // try {
  //   const ideathon = await Ideathon.find({}, { individualPid: 1, _id:0 })
  //   console.log(ideathon[3].individualPid)
  //   res.status(200).json(ideathon);
  // } catch (err) {
  //   next(err);
  // }
  // await Ideathon.find({}, { individualPid: 1, _id:0 }, function(err, result) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(result)
  //     // res.json(result);
  //   }
  // });
};