import express from "express";
import cors from "cors";
import "dotenv/config";
import myUserRoute from "./routes/myUserRoute";

const app=express();
app.use(express.json())
app.use(cors());

app.use("/api/v1/my/user",myUserRoute)


app.listen(3000,()=>{console.log("server is listening on port 3000")})