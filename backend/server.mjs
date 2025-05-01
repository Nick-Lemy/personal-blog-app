import userRouter from "./routes/user.route.mjs";
import postRouter from "./routes/post.route.mjs";
import likeRouter from "./routes/like.route.mjs";
import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import { MONGODB_CONNECTION_STRING, PORT } from "./utils/constants.mjs"

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json())
app.use(bodyParser.json())

app.use('/user', userRouter)
app.use('/post', postRouter)
app.use('/like', likeRouter)

mongoose.connect(MONGODB_CONNECTION_STRING).then(() => {
  console.log("Connected to the database!");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} => http://localhost:${PORT}`);
  });
}).catch(() => {
  console.log("Database connection failed!")
});