import { Schema, model } from "mongoose";
import { getUserInfo, User } from "./user.model.mjs";

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

export const addPostToFavorite = async (user_id, post_id) => {
    try {
        const user = await User.findOne({ _id: user_id })
        if (!user) return console.log('User not found')
        const favorite = user.favorite
        if(favorite.includes(post_id)) return console.log(`Post Aleady in Fav`)
        favorite.push(post_id)
        const addPost = await User.updateOne({ _id: user_id }, { favorite })
        if (!addPost) return console.log(`Error adding post tp favorites`)
        return addPost
    } catch (error) {
        console.error(`Error adding post to favorites: ${error}`)
    }
}
