import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BACKEND_BASE_URL } from '../utils/environment.varible.mjs';
import ReactMarkdown from "react-markdown";
import { Link } from 'react-router-dom';
import MarkdownPreview from '@uiw/react-markdown-preview';

function Post() {
    const { id } = useParams()
    const [post, setPost] = useState('')

    const getPost = async (id) => {
        try {
            let thePost = await fetch(`${BACKEND_BASE_URL}/post/${id}`)
            thePost = await thePost.json()
            if (!thePost) return console.log('Error fetching post')
            setPost(thePost)
        } catch (error) {
            console.error(`Error fetching post: ${error}`)
        }
    }
    useEffect(() => {
        getPost(id)
    }, [id])
    return (

        <div className="flex bg-gray-800 justify-center overflow-auto md:p-4">
            <div className="flex-1 p-5 md:p-10 border-2 m-2 border-gray-600 bg-gray-900 rounded-2xl">
                <div>
                    <Link to='/'>
                        <svg className='w-6 md:w-10 mb-5 fill-white' id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 108.06">
                            <title>back-arrow</title>
                            <path d="M63.94,24.28a14.28,14.28,0,0,0-20.36-20L4.1,44.42a14.27,14.27,0,0,0,0,20l38.69,39.35a14.27,14.27,0,0,0,20.35-20L48.06,68.41l60.66-.29a14.27,14.27,0,1,0-.23-28.54l-59.85.28,15.3-15.58Z" />
                        </svg>
                    </Link>
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-blue-500">{post.title}</h1>
                        <div className="flex space-x-2 items-center">
                            <div className="flex -space-x-2">

                            </div>
                        </div>
                    </div>
                    <div className="navbar flex mb-2 *:text-sm **:md:text-base **:cursor-pointer *:transform *:duration-200 *:rounded-md *:ease-in">
                        <Link to='/' className="text-white hover:underline">
                            <h2 className='text-xs text-gray-200 font-light'>{post.subtitle}</h2>
                        </Link>
                    </div>

                    <hr className="border-gray-800 border-1 mb-6" />
                </div>
                <div className='text-white flex flex-col'>
                    <div className='markdown text-wrap' >
                        {/* <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {post.main}
                        </ReactMarkdown> */}
                        <MarkdownPreview source={post.main} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post