import React, { useState } from 'react';
import { ComponentBrowser } from './components/ComponentBrowser';
import { PreviewPane } from './components/PreviewPane';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import type { Component, ComponentFilter } from './types';

// Sample components data - in a real app this would come from an API
const sampleComponents: Component[] = [
  {
    id: '1',
    name: 'Hero Section',
    description: 'A bold hero section with image and CTA',
    category: 'layout',
    code: `<div class="bg-white">
  <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900">Welcome to our platform</h1>
      <p class="mt-4 text-xl text-gray-500">The best way to build your next project</p>
      <button class="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg">Get Started</button>
    </div>
  </div>
</div>`
  },
  {
    id: '2',
    name: 'Navigation Bar',
    description: 'Responsive navigation with dropdown',
    category: 'navigation',
    code: `<nav class="bg-white shadow">
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex justify-between h-16">
      <div class="flex">
        <div class="flex-shrink-0 flex items-center">
          <span class="text-xl font-bold">Logo</span>
        </div>
      </div>
      <div class="flex items-center">
        <a href="#" class="px-3 py-2 rounded-md text-sm font-medium text-gray-900">Home</a>
        <a href="#" class="px-3 py-2 rounded-md text-sm font-medium text-gray-900">About</a>
        <a href="#" class="px-3 py-2 rounded-md text-sm font-medium text-gray-900">Contact</a>
      </div>
    </div>
  </div>
</nav>`
  }
];

function App() {
  const [components, setComponents] = useState(sampleComponents);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [filter, setFilter] = useState<ComponentFilter>({
    search: '',
    category: ''
  });

  const handleSave = (id: string, newCode: string) => {
    setComponents(prevComponents => 
      prevComponents.map(component => 
        component.id === id ? { ...component, code: newCode } : component
      )
    );
    setSelectedComponent(prev => prev ? { ...prev, code: newCode } : null);
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <div className={`${isFullscreen ? 'hidden' : 'w-1/2'} border-r border-gray-200`}>
          <ComponentBrowser
            components={components}
            filter={filter}
            onFilterChange={setFilter}
            onSelectComponent={setSelectedComponent}
          />
        </div>
        <div className={isFullscreen ? 'w-full' : 'w-1/2'}>
          <PreviewPane
            component={selectedComponent}
            isFullscreen={isFullscreen}
            onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
            onSave={handleSave}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;