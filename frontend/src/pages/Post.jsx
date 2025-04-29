import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BACKEND_BASE_URL } from '../utils/environment.varible.mjs';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { ArrowLeft, Heart, Share2, BookmarkPlus, MessageCircle, Calendar, Clock, User, ChevronLeft, ChevronRight } from 'lucide-react';

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState('');
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState([]);

  const getLikes = async (id) => {
    try {
      const allLikes = await fetch(`${BACKEND_BASE_URL}/like/${id}`);
      if (!allLikes.ok) return console.log('Error fetching likes');
      const data = await allLikes.json();
      setLikes(data.length);
    } catch (error) {
      console.error('Error fetching likes: ', error);
      const { id } = useParams()
      const [post, setPost] = useState('')
      const [likes, setLikes] = useState([])
    }
    // const [like]

    const getLikes = async () => {
      try {
        const allLikes = await fetch(`${BACKEND_BASE_URL}/like/${id}`)
        if (!allLikes.ok) return console.log('Error fetching likes')
        const data = await allLikes.json()
        setLikes(data)
      } catch (error) {
        console.error('Error fetching likes: ', error)
      }
    }
  };

  const getPost = async (id) => {
    setIsLoading(true);
    try {
      let thePost = await fetch(`${BACKEND_BASE_URL}/post/${id}`);
      thePost = await thePost.json();
      if (!thePost) return console.log('Error fetching post');
      setPost(thePost);

      // Fetch some related posts (in a real app, you'd use tags or categories)
      const allPosts = await fetch(`${BACKEND_BASE_URL}/post/all`);
      const postsData = await allPosts.json();
      setRelatedPosts(postsData.filter(p => p._id !== id).slice(0, 3));
    } catch (error) {
      console.error(`Error fetching post: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikes(likes + 1);
      // Here you would implement the actual API call to save the like
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Implement bookmark functionality
  };

  const handleShare = () => {
    // Implement share functionality
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  useEffect(() => {
    getPost(id);
    getLikes(id);
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate reading time
  const calculateReadingTime = (text) => {
    if (!text) return '1 min read';
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min read`;
  };

  // Table of contents generation (simplified)
  const generateTOC = (markdown) => {
    if (!markdown) return [];
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const headings = [];
    let match;

    while ((match = headingRegex.exec(markdown)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text.toLowerCase().replace(/\s+/g, '-');

      headings.push({ level, text, id });
    }

    return headings;
  };

  return (
    <div className="bg-black min-h-screen text-white">
      {isLoading ? (
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse">
              <div className="h-6 w-32 bg-zinc-800 rounded mb-8"></div>
              <div className="h-12 bg-zinc-800 rounded mb-6 w-3/4"></div>
              <div className="h-6 bg-zinc-800 rounded mb-10 w-1/2"></div>
              <div className="space-y-3">
                <div className="h-4 bg-zinc-800 rounded w-full"></div>
                <div className="h-4 bg-zinc-800 rounded w-full"></div>
                <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Back link */}
          <div className="sticky top-0 z-20 backdrop-blur-lg bg-black/80 border-b border-zinc-800">
            <div className="container mx-auto px-4">
              <div className="py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center text-zinc-400 hover:text-white transition-colors">
                  <ChevronLeft size={20} className="mr-1" />
                  Back to articles
                </Link>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleLike}
                    className={`flex items-center space-x-1 ${liked ? 'text-pink-500' : 'text-zinc-400 hover:text-white'} transition-colors`}
                  >
                    <Heart size={18} fill={liked ? "currentColor" : "none"} />
                    <span>{likes}</span>
                  </button>

                  <button
                    onClick={handleBookmark}
                    className={`${isBookmarked ? 'text-indigo-400' : 'text-zinc-400 hover:text-white'} transition-colors`}
                  >
                    <BookmarkPlus size={18} fill={isBookmarked ? "currentColor" : "none"} />
                  </button>

                  <button
                    onClick={handleShare}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <article className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto">
              {/* Header */}
              <header className="mb-12">
                <h1 className="text-3xl md:text-5xl font-bold mb-6">{post.title}</h1>
                <p className="text-xl text-zinc-300 mb-6">{post.subtitle}</p>

                <div className="flex flex-wrap items-center text-sm text-zinc-400 mb-10 gap-x-6 gap-y-2">
                  <div className="flex items-center">
                    <User size={16} className="mr-2" />
                    <span>{post.author || "Nick"}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    <span>{formatDate(post.createdAt || new Date())}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2" />
                    <span>{calculateReadingTime(post.main)}</span>
                  </div>
                </div>

                <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full"></div>
              </header>

              {/* Main content with table of contents */}
              <div className="flex flex-col md:flex-row gap-12">
                {/* Article content */}
                <div className="md:flex-1 prose prose-invert prose-lg max-w-none">
                  <MarkdownPreview
                    style={{
                      backgroundColor: 'transparent',
                      color: 'white',
                      lineHeight: '1.8'
                    }}
                    source={post.main}
                  />
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
        getLikes()
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

                      {/* Table of contents */}
                      <aside className="md:w-64 sticky top-24 self-start hidden lg:block">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                          <h3 className="text-sm font-medium text-zinc-300 uppercase tracking-wider mb-4">
                            Table of Contents
                          </h3>
                          <nav className="space-y-3">
                            {generateTOC(post.main).map((heading, index) => (
                              <a
                                key={index}
                                href={`#${heading.id}`}
                                className={`block text-sm hover:text-indigo-400 transition-colors ${heading.level === 1 ? 'text-zinc-200' :
                                    heading.level === 2 ? 'text-zinc-400 pl-3' :
                                      'text-zinc-500 pl-6'
                                  }`}
                              >
                                {heading.text}
                              </a>
                            ))}
                          </nav>
                        </div>
                      </aside>
                    </div>

                    {/* Author box */}
                    <div className="mt-16 p-8 border border-zinc-800 rounded-xl bg-zinc-900/50">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-xl font-bold">
                          N
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-1">Nick</h3>
                          <p className="text-zinc-400">
                            Blog author, thinker, and technology enthusiast. Writing about tech, design, and the future.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Related posts */}
                  {relatedPosts.length > 0 && (
                    <div className="mt-24 max-w-6xl mx-auto">
                      <h2 className="text-2xl font-bold mb-8">You might also enjoy</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedPosts.map(relatedPost => (
                          <Link key={relatedPost._id} to={`/post/${relatedPost._id}`} className="block">
                            <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900 hover:bg-zinc-800 transition-colors h-full">
                              <div className="p-6 flex flex-col h-full">
                                <h3 className="text-lg font-bold mb-2 line-clamp-2">
                                  {relatedPost.title}
                                </h3>
                                <p className="text-zinc-400 mb-4 line-clamp-3">
                                  {relatedPost.subtitle}
                                </p>
                                <div className="mt-auto flex items-center text-indigo-400 text-sm font-medium">
                                  Read article
                                  <ChevronRight size={16} className="ml-1" />
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
                                        <p> {(likes.length || 0) + ' like(s)'} </p>
                                      </div>
                                      <div className='flex flex-col h-fit justify-center items-center w-fit'>
                                        <svg className='fill-white ' width="26" height="26" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M15.668 8.626l8.332 1.159-6.065 5.874 1.48 8.341-7.416-3.997-7.416 3.997 1.481-8.341-6.064-5.874 8.331-1.159 3.668-7.626 3.669 7.626zm-6.67.925l-6.818.948 4.963 4.807-1.212 6.825 6.068-3.271 6.069 3.271-1.212-6.826 4.964-4.806-6.819-.948-3.002-6.241-3.001 6.241z" /></svg>
                                        {/* <svg className='fill-blue-500 self-center'  width="28" height="28" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z" fill-rule="nonzero" /></svg> */}
                                        <p>Favorites</p>
                                      </div>
                                      <div className='flex flex-col h-fit justify-center items-center w-fit'>
                                        <svg className=' fill-white' xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path d="M11 6.999c2.395.731 4.27 2.607 4.999 5.001.733-2.395 2.608-4.269 5.001-5-2.393-.731-4.268-2.605-5.001-5-.729 2.394-2.604 4.268-4.999 4.999zm7 7c1.437.438 2.562 1.564 2.999 3.001.44-1.437 1.565-2.562 3.001-3-1.436-.439-2.561-1.563-3.001-3-.437 1.436-1.562 2.561-2.999 2.999zm-6 5.501c1.198.365 2.135 1.303 2.499 2.5.366-1.198 1.304-2.135 2.501-2.5-1.197-.366-2.134-1.302-2.501-2.5-.364 1.197-1.301 2.134-2.499 2.5zm-6-8.272c.522.658 1.118 1.253 1.775 1.775-.657.522-1.252 1.117-1.773 1.774-.522-.658-1.118-1.253-1.776-1.776.658-.521 1.252-1.116 1.774-1.773zm-.001-4.228c-.875 2.873-3.128 5.125-5.999 6.001 2.876.88 5.124 3.128 6.004 6.004.875-2.874 3.128-5.124 5.996-6.004-2.868-.874-5.121-3.127-6.001-6.001z" /></svg>
                                        <p>AI Summary</p>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                  ))}
                              </div>
                            </div>
            )}

                            {/* Comments section */}
                            <div className="mt-24 max-w-3xl mx-auto">
                              <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold">Comments</h2>
                                <span className="text-zinc-400">0 comments</span>
                              </div>

                              <div className="border border-zinc-800 rounded-xl bg-zinc-900/50 p-8 text-center">
                                <MessageCircle size={32} className="text-zinc-600 mx-auto mb-4" />
                                <p className="text-zinc-400 mb-6">No comments yet. Be the first to share your thoughts!</p>
                                <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors">
                                  Leave a comment
                                </button>
                              </div>
                            </div>
                          </article>
          
          {/* Footer */ }
                          < footer className = "bg-zinc-950 border-t border-zinc-900 py-12 mt-24" >
                          <div className="container mx-auto px-4">
                            <div className="flex flex-col md:flex-row justify-between items-center">
                              <div className="mb-6 md:mb-0">
                                <div className="flex items-center space-x-2">
                                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                                    <span className="font-bold text-sm">N</span>
                                  </div>
                                  <span className="text-lg font-bold">Nick's Blog</span>
                                </div>
                                <p className="text-zinc-500 mt-2">© 2025 All rights reserved.</p>
                              </div>
                              <div className="flex space-x-8">
                                <Link to="/" className="text-zinc-400 hover:text-white transition-colors">Home</Link>
                                <Link to="/about" className="text-zinc-400 hover:text-white transition-colors">About</Link>
                                <a href="#" className="text-zinc-400 hover:text-white transition-colors">Contact</a>
                                <a href="#" className="text-zinc-400 hover:text-white transition-colors">Privacy</a>
                              </div>
                            </div>
                          </div>
          </footer>
                    </>
                  )}
                </div>
                );
}

                export default Post;