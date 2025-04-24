import { createUser, verifyUser } from "../models/user.model.mjs";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

export const createUserController = async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    console.log(newUser);
    if (!newUser) return res.status(400).send({ error: "Error creating user" });
    return res.status(201).send(newUser);
  } catch (error) {
    return res.status(400).send({ error: `Error creating user: ${error}` });
  }
};


export const verifyUserController = async (req, res) => {
  try {
    const userVerification = await verifyUser(req.body)
    if (!userVerification) res.status(404).send({ message: 'User Not Found!' })
    const token = jwt.sign({ id: userVerification._id, fullname: userVerification.fullname, email: userVerification.email }, process.env.SECRET_KEY, { expiresIn: '24h' });
    return res.status(200).send(token)
  } catch (error) {
    return res.status(400).send({ error: `Error verifying user: ${error}` })
  }
}
