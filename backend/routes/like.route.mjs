import { Router } from "express"
import { addLikeController, getLikesOfPostController } from "../controllers/like.controller.mjs";

const likeRouter = Router()

likeRouter.post('/add', addLikeController)
likeRouter.get('/:post_id', getLikesOfPostController)
export default likeRouter;
