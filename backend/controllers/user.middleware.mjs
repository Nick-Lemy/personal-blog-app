import { createUser } from "../models/user.model.mjs";

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
