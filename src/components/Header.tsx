import React from 'react';
import { Library } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Library className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">Component Library</span>
          </div>
          <nav className="flex items-center space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-900">Documentation</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Examples</a>
            <a href="https://github.com" className="text-gray-600 hover:text-gray-900">GitHub</a>
          </nav>
        </div>
      </div>
    </header>
  );
}