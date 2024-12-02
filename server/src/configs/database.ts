import { connect, ConnectOptions } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
export const dbConnect = () => {
    connect(process.env.MONGODB_URL!, {} as ConnectOptions).then(
        ()=> console.log("connect Success"),
        (error) => console.log(error)
    )
}