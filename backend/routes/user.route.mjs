import { Router } from "express"
import { createUserController, verifyUserController } from "../controllers/user.controller.mjs";

const userRouter = Router()

userRouter.post('/register', createUserController)
userRouter.post('/login', verifyUserController)
export default userRouter;