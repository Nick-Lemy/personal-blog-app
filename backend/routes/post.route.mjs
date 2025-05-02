import { Router } from "express"
import { addPostToFavoriteController, createPostController, displayAllPostsController, displayPostWithIdController, getFavoritePostsController } from "../controllers/post.controller.mjs";
import { verifyToken } from "../middlewares/auth.middleware.mjs";

const postRouter = Router()

postRouter.post('/create', verifyToken, createPostController)
postRouter.get('/all', displayAllPostsController)
postRouter.get('/favorites', verifyToken, getFavoritePostsController)
postRouter.put('/:post_id', verifyToken, addPostToFavoriteController)
postRouter.get('/:id', verifyToken, displayPostWithIdController)

export default postRouter;
