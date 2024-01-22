import express from "express"
import dotenv from "dotenv"
import connectDb from "./dbConnection"
import cors from "cors"
const errorHandler=require("./middleware/errorHandler")


dotenv.config()

const app = express();

app.use(express.json())


const corsOptions = {
    origin:'http://localhost:3000', 
    credentials:true
}

app.use(cors(corsOptions))

connectDb();

app.use("/api/user/",require("./routes/authRoutes"))

app.use("/api/todo/",require("./routes/todoRoutes"))

app.use(errorHandler)


const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})






