import { Router } from "express"
import { createUserController } from "../controllers/user.middleware.mjs";

const userRouter = Router()

userRouter.post('/register', createUserController)
export default userRouter;