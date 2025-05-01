import { Router } from "express"
import { createPostController, displayAllPostsController, displayPostWithIdController, getFavoritePostsController } from "../controllers/post.controller.mjs";
import { verifyToken } from "../middlewares/auth.middleware.mjs";

const postRouter = Router()

postRouter.post('/create', verifyToken, createPostController)
postRouter.get('/all', displayAllPostsController)
postRouter.get('/favorites', verifyToken, getFavoritePostsController)
postRouter.get('/:id', verifyToken, displayPostWithIdController)

export default postRouter;
