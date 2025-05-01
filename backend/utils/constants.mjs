
import dotenv from "dotenv";
dotenv.config();
export const TOKEN_SECRET = process.env.TOKEN_SECRET
export const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
export const PORT = process.env.PORT;