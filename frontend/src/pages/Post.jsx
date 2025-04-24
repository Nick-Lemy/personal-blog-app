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
                          className={`block text-sm hover:text-indigo-400 transition-colors ${
                            heading.level === 1 ? 'text-zinc-200' : 
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
          
          {/* Footer */}
          <footer className="bg-zinc-950 border-t border-zinc-900 py-12 mt-24">
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