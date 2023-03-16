import express from "express";
import {
  registerMetaclix,
  registerMetallomania,
  registerTechtoon,
  registerEnigma,
  registerSchoolQuiz,
  registerCad,
  registerCaseStudy,
  registerExcavate,
  registerIdeathon,
  registerTechnova,
  gethealth
} from "../controllers/eventRegistration.js";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.post("/metaclix/:id", verifyUser, registerMetaclix)
// router.post("/metallomania/:id", verifyUser, registerMetallomania)
// router.post("/techtoon/:id", verifyUser, registerTechtoon)
// router.post("/enigma/:id", verifyUser, registerEnigma)
// router.post("/schoolQuiz/:id", verifyUser, registerSchoolQuiz)
// router.post("/cad/:id", verifyUser, registerCad)
// router.post("/caseStudy/:id", verifyUser, registerCaseStudy)
// router.post("/excavate/:id", verifyUser, registerExcavate)
// router.post("/ideathon/:id", verifyUser, registerIdeathon)
// router.post("/technova/:id", verifyUser, registerTechnova)
router.post("/metaclix/:id", registerMetaclix)
router.post("/metallomania/:id", registerMetallomania)
router.post("/techtoon/:id", registerTechtoon)
router.post("/enigma/:id", registerEnigma)
router.post("/schoolQuiz/:id", registerSchoolQuiz)
router.post("/cad/:id", registerCad)
router.post("/caseStudy/:id", registerCaseStudy)
router.post("/excavate/:id", registerExcavate)
router.post("/ideathon/:id", registerIdeathon)
router.post("/technova/:id", registerTechnova)
router.get("/gethealth", gethealth)

export default router;
