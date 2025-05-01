import { Router } from "express"
import { createUserController, getUserInfoController, verifyUserController } from "../controllers/user.controller.mjs";
import { verifyToken } from "../middlewares/auth.middleware.mjs";

const userRouter = Router()

userRouter.post('/register', createUserController)
userRouter.post('/login', verifyUserController)
userRouter.get('/profile', verifyToken, getUserInfoController)

export default userRouter;
