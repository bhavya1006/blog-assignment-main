
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Edit, Search, Settings, ArrowLeft, Upload, X } from 'lucide-react';
import Logo from '../components/Logo';

const AddBlog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    summary: '',
    author: '',
    image: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get existing blogs from localStorage or use default
    const existingBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    
    // Create new blog with auto-generated ID and current date
    const newBlog = {
      id: existingBlogs.length > 0 ? Math.max(...existingBlogs.map((b: any) => b.id)) + 1 : 1,
      ...formData,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    };
    
    // Add to existing blogs
    const updatedBlogs = [...existingBlogs, newBlog];
    
    // Save back to localStorage
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    
    console.log('New blog post:', newBlog);
    
    // Redirect to home page
    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({
          ...formData,
          image: event.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData({
      ...formData,
      image: ''
    });
  };

  return (
    <div className="min-h-screen bg-slate-800 flex">
      {/* Sidebar */}
      <div className="w-20 bg-pink-500 flex flex-col items-center py-6 space-y-6">
        <Logo />
        
        <Link to="/" className="p-3 rounded-xl hover:bg-pink-400 transition-colors">
          <Home className="w-6 h-6 text-white" />
        </Link>
        
        <Link to="/add-blog" className="p-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 transition-colors">
          <Edit className="w-6 h-6 text-black" />
        </Link>
        
        <button className="p-3 rounded-xl hover:bg-pink-400 transition-colors">
          <Search className="w-6 h-6 text-white" />
        </button>
        
        <button className="p-3 rounded-xl hover:bg-pink-400 transition-colors">
          <Settings className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Link 
              to="/" 
              className="mr-4 p-2 rounded-lg bg-pink-500 hover:bg-pink-600 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </Link>
            <h1 className="text-4xl font-bold text-white">Create New Blog Post</h1>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Enter your blog title..."
                />
              </div>

              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                  Author Name
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Your name..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Image (Optional)
                </label>
                {!formData.image ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-500 transition-colors">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Upload an image for your blog post</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="inline-block bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors cursor-pointer"
                    >
                      Choose Image
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={formData.image}
                      alt="Blog preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Summary
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Write a brief summary of your blog post..."
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={10}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Write your blog content here..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-pink-500 text-white py-3 px-6 rounded-lg hover:bg-pink-600 transition-colors font-medium"
                >
                  Publish Blog Post
                </button>
                <Link
                  to="/"
                  className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors font-medium text-center"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
