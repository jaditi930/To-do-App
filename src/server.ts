export {}

import express from "express"
import dotenv from "dotenv"
import connectDb from "./dbConnection"

dotenv.config()

const app = express();

app.use(express.json())

connectDb();

app.use("/api/user/",require("./routes/authRoutes"))

app.use("/api/todo/",require("./routes/todoRoutes"))

const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})






