import { addLike, getLikesOfPost } from "../models/like.model.mjs"


export const addLikeController = async (req, res) => {
    try {
        const newLike = await addLike(req.body)
        if (!newLike) return res.status(400).send({ error: `Error adding like` })
        return res.send(newLike)
    } catch (error) {
        return res.status(500).send({ error: `Error adding like: ${error}` })
    }
}

export const getLikesOfPostController = async (req, res) => {
    try {
        const allLikes = await getLikesOfPost(req.params)
        if(!allLikes) return res.status(400).send({error: 'Error getting all likes'})
        return res.status(200).send(allLikes) 
    } catch (error) {
        return res.status(400).send({error: `Error getting all likes: ${error}`})
    }
}
