import { ArrowRight, Code2, Library, Palette } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function LandingPage() {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Build Beautiful UI Components
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Create, customize, and share UI components with our powerful component library platform.
          Perfect for developers and designers.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={signInWithGoogle}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="#features"
            className="px-6 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <Library className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Component Library
            </h3>
            <p className="text-gray-600">
              Access a vast library of pre-built components ready to use in your projects.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <Code2 className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Code Editor
            </h3>
            <p className="text-gray-600">
              Customize components with our powerful built-in code editor.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <Palette className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Live Preview
            </h3>
            <p className="text-gray-600">
              See your changes in real-time with our interactive preview pane.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 