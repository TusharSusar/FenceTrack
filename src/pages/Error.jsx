import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    // The main container. It uses flexbox to center content and
    // occupies the full viewport height.
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gray-100 font-sans text-gray-800">

      {/* Main content wrapper with a max width for readability. */}
      <div className="max-w-xl">
        
        {/* The prominent "404" heading. The text size and color
          are defined using Tailwind utility classes.
        */}
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold text-red-600">
          404
        </h1>
        
        {/* A friendly, large message to inform the user. */}
        <p className="mt-4 text-2xl md:text-3xl font-semibold text-gray-900">
          Oops! The page you're looking for was not found.
        </p>
        
        {/* A detailed, yet approachable, description. */}
        <p className="mt-2 text-base md:text-lg text-gray-600">
          It seems you've stumbled upon an incorrect link or the page has been moved.
          Please use the button below to return to the homepage.
        </p>

        {/* Navigation links section. Uses flexbox to space out buttons. */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md transition-colors duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Go to Homepage
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 text-indigo-600 font-medium rounded-lg transition-colors duration-300 hover:text-indigo-700"
          >
            Contact Support
          </Link>
        </div>
        
      </div>
      
    </div>
  );
};

export default NotFoundPage;