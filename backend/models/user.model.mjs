import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Fullname is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
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

export const User = mongoose.model("users", userSchema);

export const createUser = async ({ fullname, email, password }) => {
    try {
      const newUser = await User.create({ fullname, email, password });
      if (!newUser) return console.log('Error creating user');
      return newUser;
    } catch (error) {
      console.error(`Error creating user: ${error}`)
    }
  };
  