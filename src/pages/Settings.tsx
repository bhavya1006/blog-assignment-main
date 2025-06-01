
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Edit, Search, Settings as SettingsIcon, ArrowLeft } from 'lucide-react';
import Logo from '../components/Logo';
import { Switch } from '../components/ui/switch';

const Settings = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkTheme(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen bg-slate-800 dark:bg-gray-900 flex flex-col md:flex-row">
      {/* Sidebar - responsive */}
      <div className="w-full md:w-20 bg-pink-500 dark:bg-pink-600 flex md:flex-col items-center justify-center md:justify-start py-4 md:py-6 space-x-6 md:space-x-0 md:space-y-6 order-2 md:order-1">
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
        
        <Link to="/settings" className="p-2 md:p-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 transition-colors">
          <SettingsIcon className="w-5 h-5 md:w-6 md:h-6 text-black" />
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 order-1 md:order-2">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center md:justify-start mb-6 md:mb-8">
            <div className="md:hidden mr-4">
              <Logo />
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white">Settings</h1>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Dark Theme</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Toggle between light and dark theme</p>
                </div>
                <Switch
                  checked={isDarkTheme}
                  onCheckedChange={toggleTheme}
                />
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Theme changes will be applied immediately and saved for your next visit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
