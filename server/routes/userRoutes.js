import express from "express";
import { registerUser, loginUser, userCredits, createMomoPayment, momoCallback } from "../controllers/userController.js";
import userAuth from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/credits", userAuth, userCredits);
userRouter.post("/create-momo-payment", userAuth, createMomoPayment);
userRouter.post("/momo-callback", momoCallback);

export default userRouter;