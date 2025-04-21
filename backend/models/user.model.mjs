import { Schema, model } from "mongoose";
import { hashPassword, verifyPassword } from "../services/auth.service.mjs";

const userSchema = new Schema({
  fullname: {
    type: String,
    required: [true, "Fullname is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },

  favorite: {
    type: Array,
    required: false,
  },
  read_history: {
    type: Array,
    required: false,
  },
  post_liked: {
    type: Array,
    required: false,
  },
});

export const User = model("users", userSchema);

export const createUser = async ({ fullname, email, password }) => {
  try {
    password = await hashPassword(password);
    const newUser = await User.create({ fullname, email, password });
    if (!newUser) return console.log("Error creating user");
    return newUser;
  } catch (error) {
    console.error(`Error creating user: ${error}`);
  }
};

export const verifyUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email }).exec()
    if (!user) return false
    const hashedPassword = user.password
    const passwordVerification = await verifyPassword(password, hashedPassword)
    if (!passwordVerification) return false
    return user
  } catch (error) {
    console.error(`Error verifying user: ${error}`);
  }
}
