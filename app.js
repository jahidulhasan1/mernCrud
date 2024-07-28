import  express from "express";
import { config } from "dotenv";
import userRouter from "./routes/user.routes.js"
import cors from 'cors'
import taskRouter from "./routes/task.routes.js"
import { dbConnect } from "./data/db.js";
import cookieParser from "cookie-parser";
import { middlewareError } from "./middleware/error.middleware.js";

const app = express();


config({
    path:"./data/.env"
});
// middlewares

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:['GET','HEAD','POST','PUT'], 
    credential:true
}))

// routes
app.use("/api/v1/users",userRouter);
app.use("/api/v1/task",taskRouter);

dbConnect();

app.get("/",(req,res)=>{
res.send("hello server");
})


app.listen(process.env.PORT,()=>{
    console.log("server is running on port 5000");
 
});


// error middleware

app.use(middlewareError);
