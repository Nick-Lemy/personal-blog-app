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
                <div className='text-white flex-col flex md:flex-row gap-10 justify-center'>
                    <div className='markdown md:flex-3'>
                        <MarkdownPreview style={{ backgroundColor: 'transparent', color: 'white', padding: '0px' }} className='bg-white' source={post.main} />
                    </div>
                    <div className='md:flex-2'>
                        <div className='flex flex-row justify-evenly '>
                            <div className='flex h-fit flex-col justify-center items-center w-fit'>
                                <svg className='fill-white self-center' width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" /></svg>
                                {/* <svg className='fill-blue-500 self-center'  width="28" height="28" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z" fill-rule="nonzero" /></svg> */}
                                <p> {post && post.likes.length} likes</p>
                            </div>
                            <div className='flex flex-col h-fit justify-center items-center w-fit'>
                                <svg className='fill-white' width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M15.668 8.626l8.332 1.159-6.065 5.874 1.48 8.341-7.416-3.997-7.416 3.997 1.481-8.341-6.064-5.874 8.331-1.159 3.668-7.626 3.669 7.626zm-6.67.925l-6.818.948 4.963 4.807-1.212 6.825 6.068-3.271 6.069 3.271-1.212-6.826 4.964-4.806-6.819-.948-3.002-6.241-3.001 6.241z" /></svg>
                                {/* <svg className='fill-blue-500 self-center'  width="28" height="28" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z" fill-rule="nonzero" /></svg> */}
                                <p>Favorites</p>
                            </div>
                            <div className='flex flex-col h-fit justify-center items-center w-fit'>
                                <svg className=' fill-white' xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path d="M11 6.999c2.395.731 4.27 2.607 4.999 5.001.733-2.395 2.608-4.269 5.001-5-2.393-.731-4.268-2.605-5.001-5-.729 2.394-2.604 4.268-4.999 4.999zm7 7c1.437.438 2.562 1.564 2.999 3.001.44-1.437 1.565-2.562 3.001-3-1.436-.439-2.561-1.563-3.001-3-.437 1.436-1.562 2.561-2.999 2.999zm-6 5.501c1.198.365 2.135 1.303 2.499 2.5.366-1.198 1.304-2.135 2.501-2.5-1.197-.366-2.134-1.302-2.501-2.5-.364 1.197-1.301 2.134-2.499 2.5zm-6-8.272c.522.658 1.118 1.253 1.775 1.775-.657.522-1.252 1.117-1.773 1.774-.522-.658-1.118-1.253-1.776-1.776.658-.521 1.252-1.116 1.774-1.773zm-.001-4.228c-.875 2.873-3.128 5.125-5.999 6.001 2.876.88 5.124 3.128 6.004 6.004.875-2.874 3.128-5.124 5.996-6.004-2.868-.874-5.121-3.127-6.001-6.001z" /></svg>
                                <p>AI Summary</p>
                            </div>
                        </div>
                        <div className='py-5 text-center'>
                            No Comments
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post