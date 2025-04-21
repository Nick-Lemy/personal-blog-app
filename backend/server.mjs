import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors'
import userRouter from "./routes/user.route.mjs";
import postRouter from "./routes/post.route.mjs";
dotenv.config();
 
const PORT = process.env.PORT;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json())

app.use('/user', userRouter)
app.use('/post', postRouter)

mongoose.connect(MONGODB_CONNECTION_STRING).then(() => {
  console.log("Connected to the database!");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} => http://localhost:${PORT}`);
  });
}).catch(()=>{
  console.log("Database connection failed!")
});
