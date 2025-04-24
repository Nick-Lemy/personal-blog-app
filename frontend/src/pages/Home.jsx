import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BACKEND_BASE_URL } from '../utils/environment.varible.mjs';
import { Search, Menu, X, ChevronRight, Calendar, Clock } from 'lucide-react';

function Home() {
  const [allPosts, setAllPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const categories = ['All', 'Technology', 'Design', 'Programming', 'AI'];

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const posts = await fetch(`${BACKEND_BASE_URL}/post/all`);
      const data = await posts.json();
      const searchedPosts = data.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setAllPosts(searchedPosts);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Calculate reading time
  const calculateReadingTime = (text) => {
    if (!text) return '1 min';
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min`;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-black/80 border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="font-bold text-xl">N</span>
            </div>
            <span className="text-xl font-bold">Nick's Blog</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link>
            <Link to="/favorites" className="hover:text-indigo-400 transition-colors">Favorites</Link>
            <Link to="/history" className="hover:text-indigo-400 transition-colors">History</Link>
            <Link to="/about" className="hover:text-indigo-400 transition-colors">About</Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black pt-20 px-6">
          <nav className="flex flex-col space-y-6 text-xl">
            <Link 
              to="/" 
              className="py-2 border-b border-zinc-800 hover:text-indigo-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/favorites" 
              className="py-2 border-b border-zinc-800 hover:text-indigo-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Favorites
            </Link>
            <Link 
              to="/history" 
              className="py-2 border-b border-zinc-800 hover:text-indigo-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              History
            </Link>
            <Link 
              to="/about" 
              className="py-2 border-b border-zinc-800 hover:text-indigo-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
          </nav>
        </div>
      )}
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Exploring Ideas Through Words
            </h1>
            <p className="text-xl text-zinc-400 mb-8">
              Thoughts, insights, and explorations on technology, design, and the future.
            </p>
            
            {/* Search bar */}
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 bg-zinc-900 border border-zinc-700 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
              />
              <Search className="absolute right-4 top-4 text-zinc-500" size={20} />
            </div>
          </div>
        </section>
        
        {/* Categories */}
        <section className="mb-12">
          <div className="flex overflow-x-auto pb-4 scrollbar-hide space-x-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>
        
        {/* Featured Post */}
        {allPosts.length > 0 && !isLoading && (
          <section className="mb-20">
            <Link to={`/post/${allPosts[0]._id}`}>
              <div className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-black hover:from-zinc-800 hover:to-zinc-900 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                <div className="h-96 p-8 flex flex-col justify-end relative z-10">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-indigo-600/30 text-indigo-400 text-xs font-medium rounded-full">
                      Featured
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-indigo-300 transition-colors">
                    {allPosts[0].title}
                  </h2>
                  <p className="text-lg text-zinc-300 mb-6 line-clamp-2">
                    {allPosts[0].subtitle}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-zinc-400">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        <span>{formatDate(allPosts[0].createdAt)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span>{calculateReadingTime(allPosts[0].main)}</span>
                      </div>
                    </div>
                    <span className="text-indigo-400 font-medium flex items-center group-hover:translate-x-1 transition-transform">
                      Read article <ChevronRight size={16} className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}
        
        {/* Posts Grid */}
        <section>
          <h2 className="text-2xl font-bold mb-8">All Articles</h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-xl bg-zinc-900 h-64 animate-pulse"></div>
              ))}
            </div>
          ) : allPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allPosts.map((post, index) => (
                <Link key={post._id} to={`/post/${post._id}`}>
                  <article className="group h-full border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900 hover:bg-zinc-800 transition-colors">
                    <div className="p-6 flex flex-col h-full">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-zinc-400 mb-4 line-clamp-3">
                        {post.subtitle}
                      </p>
                      <div className="mt-auto flex items-center justify-between text-sm text-zinc-500">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            {formatDate(post.createdAt)}
                          </span>
                          <span className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            {calculateReadingTime(post.main)}
                          </span>
                        </div>
                        <span className="text-indigo-400 flex items-center group-hover:translate-x-1 transition-transform">
                          Read <ChevronRight size={16} className="ml-1" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                <Search size={24} className="text-zinc-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">No results found</h3>
              <p className="text-zinc-500 mb-6">
                No posts matching "{searchTerm}" were found
              </p>
              <button 
                onClick={() => setSearchTerm('')}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-full transition-colors"
              >
                Clear search
              </button>
            </div>
          )}
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-12">
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
    </div>
  );
}

export default Home;