
import React from 'react';

const Logo = () => {
  return (
    <div className="bg-yellow-400 rounded-xl p-2 md:p-3 mb-2 md:mb-4">
      <div className="flex items-center justify-center">
        <div className="w-8 h-8 md:w-10 md:h-10 bg-pink-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm md:text-base font-bold">B</span>
        </div>
      </div>
      <div className="mt-1 text-center">
        <span className="text-black font-bold text-xs md:text-sm">blog.io</span>
      </div>
    </div>
  );
};

export default Logo;
