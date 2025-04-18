import argon2 from "argon2";

export const hashPassword = async (password) => {
  try {
    const hashedPassword = await argon2.hash(password)
    return hashedPassword
  } catch (error) {
    console.error(`Error hashing Password: ${error}`)
  }
};

export const verifyPassword = async (inputPassword, storedPassword) => {
  try {
    return await argon2.verify(storedPassword, inputPassword);
  } catch (error) {
    console.error(`Error verifying Passwords: ${error}`)
  }
};
