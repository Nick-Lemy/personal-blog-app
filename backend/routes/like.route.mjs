import { Router } from "express"
import { addLikeController, getLikesOfPostController } from "../controllers/like.controller.mjs";
import { verifyToken } from "../middlewares/auth.middleware.mjs";

const likeRouter = Router()

likeRouter.post('/add', verifyToken, addLikeController)
likeRouter.get('/:post_id', verifyToken, getLikesOfPostController)
export default likeRouter;
