import  { useRef, useEffect, useState } from 'react';
import { Maximize2, Minimize2, Eye, Edit, Save } from 'lucide-react';
import type { Component } from '../types';
import { CodeEditor } from './CodeEditor';

interface Props {
  component: Component | null;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onSave: (id: string, code: string) => void;
}

export function PreviewPane({ component, isFullscreen, onToggleFullscreen, onSave }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [showCode, setShowCode] = useState(false);
  const [currentCode, setCurrentCode] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (component) {
      setCurrentCode(component.code);
    }
  }, [component]);

  useEffect(() => {
    if (component && iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument;
      if (doc) {
        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <script src="https://cdn.tailwindcss.com"></script>
              <style>
                body { margin: 0; padding: 1rem; }
              </style>
            </head>
            <body>
              ${currentCode}
            </body>
          </html>
        `);
        doc.close();
      }
    }
  }, [component, currentCode]);

  const handleSave = () => {
    if (component) {
      setIsSaving(true);
      onSave(component.id, currentCode);
      setTimeout(() => setIsSaving(false), 1000);
    }
  };

  if (!component) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select a component to preview</p>
      </div>
    );
  }

  const hasChanges = component.code !== currentCode;

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="font-medium text-gray-900">{component.name}</h2>
        <div className="flex gap-2">
          {showCode && (
            <button
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                hasChanges
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-400'
              }`}
              onClick={handleSave}
              disabled={!hasChanges}
            >
              {isSaving ? (
                'Saved!'
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save
                </>
              )}
            </button>
          )}
          <button
            className={`p-2 rounded-lg ${showCode ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
            onClick={() => setShowCode(!showCode)}
          >
            {showCode ? (
              <Eye className="h-5 w-5" />
            ) : (
              <Edit className="h-5 w-5" />
            )}
          </button>
          <button
            className="p-2 hover:bg-gray-100 rounded-lg"
            onClick={onToggleFullscreen}
          >
            {isFullscreen ? (
              <Minimize2 className="h-5 w-5" />
            ) : (
              <Maximize2 className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      
      <div className="flex-1 p-4 bg-gray-50 overflow-auto">
        {showCode ? (
          <CodeEditor
            code={currentCode}
            onCodeChange={setCurrentCode}
          />
        ) : (
          <iframe
            ref={iframeRef}
            className="w-full h-full bg-white rounded-lg shadow-sm"
            title="Component Preview"
          />
        )}
      </div>
    </div>
  );
}