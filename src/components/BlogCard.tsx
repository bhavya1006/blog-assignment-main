
import React from 'react';
import { Link } from 'react-router-dom';

interface Blog {
  id: number;
  title: string;
  content: string;
  summary: string;
  author: string;
  date: string;
  image?: string;
}

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col md:flex-row">
      <div className="flex-1">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-3">{blog.title}</h2>
        <p className="text-gray-600 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">{blog.summary}</p>
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs md:text-sm text-gray-500 mb-3 md:mb-4 space-y-1 sm:space-y-0">
          <span>-{blog.author}</span>
          <span>{blog.date}</span>
        </div>
        
        <Link 
          to={`/blog/${blog.id}`}
          state={{ blog }}
          className="inline-block bg-pink-500 text-white px-4 md:px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors text-sm md:text-base"
        >
          Read More
        </Link>
      </div>
      
      <div className="mt-4 md:mt-0 md:ml-6 flex items-center justify-center">
        {blog.image ? (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full md:w-24 h-32 md:h-24 object-cover rounded-lg"
          />
        ) : (
          <div className="w-full md:w-24 h-32 md:h-24 bg-gray-800 rounded-lg flex items-center justify-center">
            <span className="text-cyan-400 font-mono text-xs md:text-sm">&lt;img&gt;</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
