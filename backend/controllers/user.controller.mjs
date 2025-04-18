import { createUser, verifyUser } from "../models/user.model.mjs";

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
    if (!userVerification) res.status(404).send({message: 'User Not Found!'})
    return res.status(200).send(userVerification)
  } catch (error) {
    return res.status(400).send({error: `Error verifying user: ${error}`})
  }
}
