import Router from "express";
import handlerasync from "express-async-handler";
import { userModel } from "../models/user";
import { user_sample } from "../data";
const app = Router();
app.get(
  "/seed",
  handlerasync(async (req, res) => {
    const userCount = await userModel.countDocuments();
    if (userCount > 0) {
      res.send("Seed is already done");
    }
    userModel.create(user_sample);
    res.send("Seed is NOT done");
  })
);
app.post(
  "/login",
  handlerasync(async (req, res) => {
    const { email, password } = req.body;
    const userInfo = await userModel.findOne({ email, password });
    console.log(userInfo);  
    if (!userInfo) {
      res.status(400).send("Email or password is incorrect");
    }

    res.send(userInfo);
  })
);

export default app;
