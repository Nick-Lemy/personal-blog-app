import { Router } from "express"
import { createPostController, displayAllPostsController, displayPostWithIdController } from "../controllers/post.controller.mjs";

const postRouter = Router()

postRouter.post('/create', createPostController)
postRouter.get('/all', displayAllPostsController)
postRouter.get('/:id', displayPostWithIdController)
export default postRouter;
