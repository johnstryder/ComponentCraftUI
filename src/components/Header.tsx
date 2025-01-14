import { Library, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Header() {
  const { user, signInWithGoogle, signOut } = useAuth();

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
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-600">{user.email}</span>
                <button 
                  onClick={signOut}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button 
                onClick={signInWithGoogle}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}