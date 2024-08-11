import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";
const router = express.Router();

router.post("/",  MyUserController.createcurrentUser);
router.put("/", MyUserController.updatecurrentUser);

export default router;