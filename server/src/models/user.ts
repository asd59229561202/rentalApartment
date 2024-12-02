import { model, Schema, Types } from "mongoose";

// 使用者介面
export interface user {
  id: Types.ObjectId;
  email: string;
  phone: string;
  username: string;
  password: string;
  name: string;
  token: string;
  isLandlord: boolean;
  isadmin: boolean;
  properties: Array<{ _id: string; title: string }>;
}

// 定義 Schema
export const userSchema = new Schema<user>(
  {
    email: { type: String, required: true },
    phone: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    token: { type: String, required: true },
    isLandlord: { type: Boolean, required: true },
    isadmin: { type: Boolean, required: true },
    properties: [
      {
        _id: { type: String, required: true , unique: true},
        title: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

// 這樣 MongoDB 會自動為每個文檔生成 _id
// 可以通過 _id 訪問它

// 將模式掛載到模型
export const userModel = model<user>("user", userSchema);
