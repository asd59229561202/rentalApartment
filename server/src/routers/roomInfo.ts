import Router from "express";
import handlerasync from "express-async-handler";
import { roomInfoModel } from "../models/roomInfo";
import { roomInfo_sample } from "../data";

const app = Router();

app.get(
  "/seed",
  handlerasync(async (req, res) => {
    const roomInfoCount = await roomInfoModel.countDocuments();
    if (roomInfoCount > 0) {
      res.send("Seed is already done");
    }

    roomInfoModel.create(roomInfo_sample);
    res.send("Seed is done");
  })
);
app.get(
  "/find",
  handlerasync(async (req, res) => {
    const result = await roomInfoModel.find({});

    res.send(result);
  })
);
app.get(
  "/result",
  handlerasync(async (req, res) => {
    const { city, district, type, rent } = req.query as {
      city?: string;
      district?: string;
      type?: string;
      rent?: string;
    };
    console.log(city, district, type, rent);
    // 構建查詢條件
    const query: any = {};
    if (city) query.city = city;
    if (district) query.district = district;
    if (type) query.type = type;
    if (rent) {
      const parsedRent = Number(rent); // 將 rent 轉換為數字
      if (!isNaN(parsedRent)) {
        query.rent = parsedRent; // 如果轉換成功，則設置 rent 查詢條件
      }
    }

    const result = await roomInfoModel.find(query);

    console.log(result);
    res.send(result?result:null);
  })
);

export default app;
