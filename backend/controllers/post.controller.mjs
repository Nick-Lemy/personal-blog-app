import { addPostToFavorite, createPost, displayAllPosts, displayPostWithId } from "../models/post.model.mjs";
import { getUserInfo } from "../models/user.model.mjs";

export const createPostController = async (req, res) => {
    try {
        const newPost = await createPost(req.body);
        if (!newPost) return res.status(400).send({ error: "Error creating post" });
        return res.status(201).send(newPost);
    } catch (error) {
        return res.status(400).send({ error: `Error creating post: ${error}` });
    }
};

export const displayAllPostsController = async (req, res) => {
    try {
        const allPosts = await displayAllPosts()
        if (!allPosts) return res.status(404).send({ error: "Error creating post" })
        return res.status(200).send(allPosts)
    } catch (error) {
        return res.status(404).send({ error: "Error creating post: ", error })
    }
}

export const displayPostWithIdController = async (req, res) => {
    try {
        const post = await displayPostWithId(req.params)
        if (!post) return res.status(404).send({ error: "Error finding post" })
        return res.status(200).send(post)
    } catch (error) {
        return res.status(404).send({ error: `Error finding post: ${error}` })
    }
}

export const getFavoritePostsController = async (req, res) => {
    try {
        const user = await getUserInfo(req.user._id)
        const favoritePosts = user.favorite
        if (!favoritePosts) return res.status(404).send({ error: "Error getting the fav posts" })
        return res.status(200).send(favoritePosts)
    } catch (error) {
        return res.status(404).send({ error: `Error getting favitite posts: ${error}` })
    }
}

export const addPostToFavoriteController = async (req, res) => {
    try {
        const post_id = req.params.post_id
        const addPost = await addPostToFavorite(req.user._id, post_id)
        if(!addPost) return res.status(401).send({error: `Error adding post to fav`})
        return res.status(200).send(addPost)
    } catch (error) {
        return res.status(401).send({ error: `Error adding post to favorites: ${error}` })
    }
}