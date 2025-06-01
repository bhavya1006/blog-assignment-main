
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Edit, Search, Settings, ArrowLeft } from 'lucide-react';
import Logo from '../components/Logo';

const BlogDetail = () => {
  const location = useLocation();
  const blog = location.state?.blog;

  if (!blog) {
    return (
      <div className="min-h-screen bg-slate-800 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">Blog Not Found</h1>
          <Link to="/" className="text-pink-400 hover:text-pink-300 underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-800 flex flex-col md:flex-row">
      {/* Sidebar - responsive */}
      <div className="w-full md:w-20 bg-pink-500 flex md:flex-col items-center justify-center md:justify-start py-4 md:py-6 space-x-6 md:space-x-0 md:space-y-6 order-2 md:order-1">
        <div className="hidden md:block">
          <Logo />
        </div>
        
        <Link to="/" className="p-2 md:p-3 rounded-xl hover:bg-pink-400 transition-colors">
          <Home className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </Link>
        
        <Link to="/add-blog" className="p-2 md:p-3 rounded-xl hover:bg-pink-400 transition-colors">
          <Edit className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </Link>
        
        <button className="p-2 md:p-3 rounded-xl hover:bg-pink-400 transition-colors">
          <Search className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </button>
        
        <button className="p-2 md:p-3 rounded-xl hover:bg-pink-400 transition-colors">
          <Settings className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 order-1 md:order-2">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6 md:mb-8">
            <div className="md:hidden mr-4">
              <Logo />
            </div>
            <Link 
              to="/" 
              className="mr-4 p-2 rounded-lg bg-pink-500 hover:bg-pink-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </Link>
            <span className="text-pink-400 font-medium text-sm md:text-base">Back to Blog List</span>
          </div>
          
          <article className="bg-white rounded-2xl p-4 md:p-8 shadow-lg">
            {blog.image && (
              <div className="mb-4 md:mb-6">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 md:h-64 object-cover rounded-lg"
                />
              </div>
            )}
            
            <header className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">{blog.title}</h1>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-gray-600 border-b pb-4 space-y-2 sm:space-y-0">
                <span className="font-medium">By {blog.author}</span>
                <span>{blog.date}</span>
              </div>
            </header>
            
            <div className="prose prose-sm md:prose-lg max-w-none">
              <div className="mb-4 md:mb-6 p-3 md:p-4 bg-gray-50 rounded-lg border-l-4 border-pink-500">
                <p className="text-gray-700 font-medium italic text-sm md:text-base">{blog.summary}</p>
              </div>
              
              <div className="text-gray-800 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                {blog.content}
              </div>
            </div>
            
            <footer className="mt-6 md:mt-8 pt-4 md:pt-6 border-t">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                <Link 
                  to="/"
                  className="bg-pink-500 text-white px-4 md:px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors text-center text-sm md:text-base"
                >
                  ← Back to Blog List
                </Link>
                <div className="text-gray-500 text-xs md:text-sm text-center sm:text-right">
                  Published on {blog.date}
                </div>
              </div>
            </footer>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
