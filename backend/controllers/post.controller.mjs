import { createPost, displayAllPosts } from "../models/post.model.mjs";

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