import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowRight, Bookmark, Share2 } from 'lucide-react';

function Card({ title, subtitle, content, color, id }) {
<<<<<<< HEAD
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    // You would implement actual bookmark functionality here
  };

  const sharePost = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Implement share functionality if needed
    alert(`Sharing post: ${title}`);
  };

  return (
    <Link to={`/post/${id}`} className="block h-full">
      <div 
        className={`h-full rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
          isHovered ? 'transform-gpu translate-y-1 shadow-xl' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`${color.bg} h-full p-6 ${color.txt} relative overflow-hidden border border-blue-800/30`}>
          {/* Background decorative element */}
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
          
          {/* Content */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Card header */}
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-2xl md:text-3xl font-bold line-clamp-2">
                {title}
              </h2>
              <div className="flex space-x-1">
                <button 
                  onClick={toggleBookmark}
                  className={`p-2 rounded-full transition-colors ${
                    isBookmarked ? 'text-yellow-400 bg-yellow-950/30' : 'text-gray-400 hover:bg-gray-800/50'
                  }`}
                >
                  <Bookmark size={16} fill={isBookmarked ? "currentColor" : "none"} />
                </button>
                <button 
                  onClick={sharePost}
                  className="p-2 rounded-full text-gray-400 hover:bg-gray-800/50 transition-colors"
                >
                  <Share2 size={16} />
                </button>
              </div>
=======
    return (
        <div className="h-full card">
            <div className={`${color.bg} h-full rounded-xl p-6 ${color.txt} relative overflow-hidden`}>
                <div className="justify-center gap-3 h-full flex flex-col">
                    <h2 className="md:text-4xl text-2xl  font-bold mb-1"> {title}</h2>
                    <p className="text-xl md:text-lg mb-4">{subtitle}</p>
                    <p className="text-xs md:text-sm mb-8 opacity-80">
                        <ReactMarkdown>
                            {content}
                        </ReactMarkdown>
                    </p>
                    <Link className='cursor-pointer' to={`/post/${id}`}>
                        <button className="bg-white cursor-pointer text-blue-950 rounded-full px-4 py-1 text-sm font-medium flex items-center">
                            Read More
                        </button>
                    </Link>
                </div>
>>>>>>> parent of 02459c8 (update)
            </div>
            
            {/* Subtitle */}
            <p className="text-lg text-gray-300 mb-4">{subtitle}</p>
            
            {/* Content preview */}
            <div className="flex-grow mb-4 text-gray-200 opacity-85">
              <ReactMarkdown>
                {content}
              </ReactMarkdown>
            </div>
            
            {/* Read more button */}
            <div className="mt-auto pt-2">
              <div className={`inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 py-2 text-sm font-medium transition-all ${
                isHovered ? 'gap-3' : 'gap-2'
              }`}>
                Read More
                <ArrowRight size={16} className={`transition-all ${isHovered ? 'transform translate-x-1' : ''}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;