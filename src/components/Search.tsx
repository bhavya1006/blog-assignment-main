
import React, { useState } from 'react';
import { X } from 'lucide-react';
import BlogCard from './BlogCard';

interface Blog {
  id: number;
  title: string;
  content: string;
  summary: string;
  author: string;
  date: string;
  image?: string;
}

interface SearchProps {
  blogs: Blog[];
  isOpen: boolean;
  onClose: () => void;
}

const Search: React.FC<SearchProps> = ({ blogs, isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-4 md:p-6 border-b flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Search Blogs</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 md:p-6 border-b">
          <input
            type="text"
            placeholder="Search by title, content, or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
        
        <div className="p-4 md:p-6 overflow-y-auto max-h-[60vh]">
          {filteredBlogs.length > 0 ? (
            <div className="space-y-4">
              {filteredBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {searchTerm ? 'No blogs found matching your search.' : 'Start typing to search blogs...'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
