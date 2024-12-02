import { dbConnect } from "./configs/database";
import cors from "cors"
import express from "express"
import roomInfoRouter from "./routers/roomInfo"
import userRouter from "./routers/user"
dbConnect()

const app = express()
const port ="3000"

const corsOptions ={
    origin:"http://localhost:4200",
    optionsSuccessStatus:204,
    metends:"GET,POST,PUT,DELETE",
}

app.use(cors(corsOptions));
app.use(express.json())

app.use('/api/roomInfo',roomInfoRouter)
app.use('/api/user',userRouter)

app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`)
})