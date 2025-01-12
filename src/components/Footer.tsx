import { Github, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Component Library. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <a href="https://github.com" className="text-gray-400 hover:text-gray-600">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://twitter.com" className="text-gray-400 hover:text-gray-600">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}