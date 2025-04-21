import { Schema, model } from "mongoose";

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    subtitle: {
        type: String,
        required: false,
    },

    main: {
        type: String,
        required: [true, "A main is required"],
    },

    likes: {
        type: Array,
        required: false,
        default: []
    },
    author: {
        type: String,
        required: false,
        default: "Nick-Lemy K."
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated_at: {
        type: Date,
        required: true,
        default: Date.now
    }
})


export const Post = model("posts", postSchema);

export const createPost = async ({ title, subtitle, main, author }) => {
    try {
        const newPost = await Post.create({ title, subtitle, main, author });
        if (!newPost) return console.log("Error creating post");
        return newPost;
    } catch (error) {
        console.error(`Error creating post: ${error}`);
    }
};

export const displayAllPosts = async () => {
    try {
        const allPosts = await Post.find({})
        if (!allPosts) return console.log('Error displaying all posts')
        return allPosts
    } catch (error) {
        console.error(`Error displaying all posts: ${error}`)
    }
}

export const displayPostWithId = async ({ id }) => {
    try {
        const post = await Post.findOne({ _id: id });
        if (!post) return console.log(`Error finding post`)
        return post
    } catch (error) {
        console.error(`Error finding post : ${id}`)
    }
}
