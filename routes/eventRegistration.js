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

router.post("/metaclix/:id", verifyUser, registerMetaclix)
router.post("/metallomania/:id", verifyUser, registerMetallomania)
router.post("/techtoon/:id", verifyUser, registerTechtoon)
router.post("/enigma/:id", verifyUser, registerEnigma)
router.post("/schoolQuiz/:id", verifyUser, registerSchoolQuiz)
router.post("/cad/:id", verifyUser, registerCad)
router.post("/caseStudy/:id", verifyUser, registerCaseStudy)
router.post("/excavate/:id", verifyUser, registerExcavate)
router.post("/ideathon/:id", verifyUser, registerIdeathon)
router.post("/technova/:id", verifyUser, registerTechnova)
router.get("/gethealth", gethealth)

export default router;
