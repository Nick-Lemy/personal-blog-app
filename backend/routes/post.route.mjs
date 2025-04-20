import { Router } from "express"
import { createPostController, displayAllPostsController } from "../controllers/post.controller.mjs";

const postRouter = Router()

postRouter.post('/create', createPostController)
postRouter.get('/all', displayAllPostsController)
export default postRouter;