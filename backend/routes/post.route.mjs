import { Router } from "express"
import { createPostController, displayAllPostsController, displayPostWithIdController } from "../controllers/post.controller.mjs";
import { verifyToken } from "../middlewares/auth.middleware.mjs";

const postRouter = Router()

postRouter.post('/create', verifyToken, createPostController)
postRouter.get('/all', verifyToken, displayAllPostsController)
postRouter.get('/:id', verifyToken, displayPostWithIdController)
export default postRouter;
