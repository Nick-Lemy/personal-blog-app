import { createUser, getUserInfo, verifyUser } from "../models/user.model.mjs";
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from "../utils/constants.mjs";

export const createUserController = async (req, res) => {
  try {
    const newUser = await createUser(req.body);
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
    const {_id, fullname, email} = userVerification
    const token = jwt.sign({_id, fullname, email}, TOKEN_SECRET, { expiresIn: '1h' })
    return res.status(200).send({ token, user: userVerification })
  } catch (error) {
    return res.status(400).send({ error: `Error verifying user: ${error}` })
  }
}

export const getUserInfoController = async (req, res) => {
  try{
    const id = req.user._id
    const user = await getUserInfo(id)
    if(!user) return res.status(404).send({error: `User not found`})
    return res.status(200).send(user)
  } catch (error) {
    return res.status(401).send({error: `Error getting user info: ${error}`})
  }
}