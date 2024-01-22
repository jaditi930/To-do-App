const express=require("express")
require("dotenv").config()
import connectDb from "./dbConnection"


const app = express();

app.use(express.json())

connectDb();

app.use("/api/user/",require("./routes/authRoutes"))

app.use("/api/todo/",require("./routes/todoRoutes"))

const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})






