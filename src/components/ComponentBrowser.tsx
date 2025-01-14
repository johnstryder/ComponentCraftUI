import { useState } from 'react';
import { Search } from 'lucide-react';
import type { Component, ComponentFilter } from '../types';

interface Props {
  components: Component[];
  filter: ComponentFilter;
  onFilterChange: (filter: ComponentFilter) => void;
  onSelectComponent: (component: Component) => void;
}

export function ComponentBrowser({ components, filter, onFilterChange, onSelectComponent }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...new Set(components.map(c => c.category))];

  const filteredComponents = components.filter(component => {
    const matchesSearch = component.name.toLowerCase().includes(filter.search.toLowerCase()) ||
                         component.description.toLowerCase().includes(filter.search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full flex flex-col">
      {/* Search and Filter Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search components..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filter.search}
            onChange={(e) => onFilterChange({ ...filter, search: e.target.value })}
          />
        </div>
        <div className="flex gap-2 mt-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                onFilterChange({ ...filter, category });
              }}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedCategory === category
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Component List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid gap-4">
          {filteredComponents.map(component => (
            <button
              key={component.id}
              onClick={() => onSelectComponent(component)}
              className="text-left p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors"
            >
              <h3 className="font-medium text-gray-900">{component.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{component.description}</p>
              <span className="inline-block mt-2 px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                {component.category}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}