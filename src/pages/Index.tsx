
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Edit, Search as SearchIcon, Settings } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import Logo from '../components/Logo';
import Search from '../components/Search';

interface Blog {
  id: number;
  title: string;
  content: string;
  summary: string;
  author: string;
  date: string;
  image?: string;
}

const defaultBlogs: Blog[] = [
  {
    id: 1,
    title: "Getting Started with React",
    content: "React is a powerful JavaScript library for building user interfaces. In this comprehensive guide, we'll explore the fundamentals of React and how to build modern web applications.",
    summary: "Learn the fundamentals of React and start building modern web applications with this comprehensive guide.",
    author: "John Doe",
    date: "June 1, 2025",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop"
  },
  {
    id: 2,
    title: "Modern CSS Techniques",
    content: "CSS has evolved significantly over the years. From Flexbox to Grid, from custom properties to container queries, modern CSS offers powerful tools for creating beautiful and responsive designs.",
    summary: "Explore the latest CSS features and techniques for creating beautiful, responsive web designs.",
    author: "Jane Smith",
    date: "May 28, 2025",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop"
  },
  {
    id: 3,
    title: "JavaScript Best Practices",
    content: "Writing clean, maintainable JavaScript is crucial for any developer. This article covers essential best practices, patterns, and techniques that will make your code more robust and readable.",
    summary: "Essential best practices and patterns for writing clean, maintainable JavaScript code.",
    author: "Mike Johnson",
    date: "May 25, 2025",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=200&fit=crop"
  }
];

const Index = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    // Load blogs from localStorage or use default blogs
    const savedBlogs = localStorage.getItem('blogs');
    if (savedBlogs) {
      const parsedBlogs = JSON.parse(savedBlogs);
      // Always ensure default blogs are present by merging them
      const mergedBlogs = [...defaultBlogs];
      
      // Add any additional blogs that aren't defaults
      parsedBlogs.forEach((blog: Blog) => {
        if (!defaultBlogs.find(defaultBlog => defaultBlog.id === blog.id)) {
          mergedBlogs.push(blog);
        }
      });
      
      setBlogs(mergedBlogs);
      localStorage.setItem('blogs', JSON.stringify(mergedBlogs));
    } else {
      // Initialize with default blogs and save to localStorage
      setBlogs(defaultBlogs);
      localStorage.setItem('blogs', JSON.stringify(defaultBlogs));
    }
  }, []);

  // Sort blogs by date (newest first)
  const sortedBlogs = [...blogs].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="min-h-screen bg-slate-800 dark:bg-gray-900 flex flex-col md:flex-row">
      {/* Sidebar - responsive */}
      <div className="w-full md:w-20 bg-pink-500 dark:bg-pink-600 flex md:flex-col items-center justify-center md:justify-start py-4 md:py-6 space-x-6 md:space-x-0 md:space-y-6 order-2 md:order-1">
        <div className="hidden md:block">
          <Logo />
        </div>
        
        <Link to="/" className="p-2 md:p-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 transition-colors">
          <Home className="w-5 h-5 md:w-6 md:h-6 text-black" />
        </Link>
        
        <Link to="/add-blog" className="p-2 md:p-3 rounded-xl hover:bg-pink-400 transition-colors">
          <Edit className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </Link>
        
        <button 
          onClick={() => setIsSearchOpen(true)}
          className="p-2 md:p-3 rounded-xl hover:bg-pink-400 transition-colors"
        >
          <SearchIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </button>
        
        <Link to="/settings" className="p-2 md:p-3 rounded-xl hover:bg-pink-400 transition-colors">
          <Settings className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 order-1 md:order-2">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center md:justify-start mb-6 md:mb-8">
            <div className="md:hidden mr-4">
              <Logo />
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white dark:text-gray-100">Latest Blog Posts</h1>
          </div>
          
          <div className="space-y-4 md:space-y-6 ">
            {sortedBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <Search 
        blogs={blogs} 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </div>
  );
};

export default Index;
