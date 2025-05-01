import { Schema, model } from "mongoose";

const likeSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    post_id: {
        type: String,
        required: true
    },
})


export const Like = model("likes", likeSchema);

export const addLike = async ({ user_id, post_id }) => {
    try {
        const newLike = Like.create({ user_id, post_id })
        if (!newLike) return console.log('Error adding a like')
        return newLike
    } catch (error) {
        console.error('Error adding a like: ', error)
    }
}

export const getLikesOfPost = async ({post_id}) => {
    try {
        const likes = await Like.find({post_id})
        if(!likes) return console.log(`Error getting all likes`)
        return likes
    } catch (error) {
        console.error(`Error getting all likes: ${error}`)
    }
}
