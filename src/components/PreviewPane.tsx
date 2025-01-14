import { useState } from 'react';
import { Maximize2, Minimize2, Save } from 'lucide-react';
import type { Component } from '../types';

interface Props {
  component: Component | null;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onSave: (id: string, code: string) => void;
}

export function PreviewPane({ component, isFullscreen, onToggleFullscreen, onSave }: Props) {
  const [editedCode, setEditedCode] = useState<string>('');

  // Update editedCode when component changes
  useState(() => {
    if (component) {
      setEditedCode(component.code);
    }
  });

  if (!component) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Select a component to preview
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Preview Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">{component.name}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => component && onSave(component.id, editedCode)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
          <button
            onClick={onToggleFullscreen}
            className="p-1.5 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
          >
            {isFullscreen ? (
              <Minimize2 className="w-5 h-5" />
            ) : (
              <Maximize2 className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Code Editor and Preview */}
      <div className="flex-1 grid grid-rows-2 overflow-hidden">
        <div className="overflow-auto p-4 font-mono text-sm border-b border-gray-200">
          <textarea
            value={editedCode}
            onChange={(e) => setEditedCode(e.target.value)}
            className="w-full h-full resize-none focus:outline-none"
            spellCheck={false}
          />
        </div>
        <div className="overflow-auto p-4">
          <div
            className="preview-container"
            dangerouslySetInnerHTML={{ __html: editedCode }}
          />
        </div>
      </div>
    </div>
  );
}