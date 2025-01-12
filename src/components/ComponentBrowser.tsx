import { Search, Filter, Layout, Navigation, FormInput, Database, ChevronRight } from 'lucide-react';
import type { Component, ComponentFilter } from '../types';

interface Props {
  components: Component[];
  filter: ComponentFilter;
  onFilterChange: (filter: ComponentFilter) => void;
  onSelectComponent: (component: Component) => void;
}

export function ComponentBrowser({ components, filter, onFilterChange, onSelectComponent }: Props) {
  const categories = [
    { id: 'layout', name: 'Layout', icon: Layout },
    { id: 'navigation', name: 'Navigation', icon: Navigation },
    { id: 'form', name: 'Form', icon: FormInput },
    { id: 'data', name: 'Data Display', icon: Database },
  ];

  const filteredComponents = components.filter(component => {
    const matchesSearch = component.name.toLowerCase().includes(filter.search.toLowerCase()) ||
                         component.description.toLowerCase().includes(filter.search.toLowerCase());
    const matchesCategory = !filter.category || component.category === filter.category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full flex">
      {/* Left Panel */}
      <div className="w-64 border-r border-gray-200 bg-gray-50">
        <div className="p-4">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Categories</h2>
        </div>
        <nav className="space-y-1">
          <button
            className={`w-full flex items-center px-4 py-2 text-sm font-medium ${
              !filter.category 
                ? 'bg-white text-blue-600 border-r-2 border-blue-600' 
                : 'text-gray-600 hover:bg-white hover:text-gray-900'
            }`}
            onClick={() => onFilterChange({ ...filter, category: '' })}
          >
            <Filter className="h-5 w-5 mr-2" />
            All Components
            <ChevronRight className={`ml-auto h-4 w-4 ${!filter.category ? 'text-blue-600' : 'text-gray-400'}`} />
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              className={`w-full flex items-center px-4 py-2 text-sm font-medium ${
                filter.category === category.id
                  ? 'bg-white text-blue-600 border-r-2 border-blue-600'
                  : 'text-gray-600 hover:bg-white hover:text-gray-900'
              }`}
              onClick={() => onFilterChange({ ...filter, category: category.id })}
            >
              <category.icon className="h-5 w-5 mr-2" />
              {category.name}
              <ChevronRight 
                className={`ml-auto h-4 w-4 ${
                  filter.category === category.id ? 'text-blue-600' : 'text-gray-400'
                }`} 
              />
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search components..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filter.search}
              onChange={(e) => onFilterChange({ ...filter, search: e.target.value })}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredComponents.map((component) => (
              <button
                key={component.id}
                className="p-4 border rounded-lg hover:border-blue-500 transition-colors bg-white"
                onClick={() => onSelectComponent(component)}
              >
                <div className="aspect-video bg-gray-50 rounded-md mb-3">
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Preview
                  </div>
                </div>
                <h3 className="font-medium text-gray-900">{component.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{component.description}</p>
                <span className="inline-block mt-2 text-xs font-medium px-2 py-1 bg-gray-100 rounded-full">
                  {component.category}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}