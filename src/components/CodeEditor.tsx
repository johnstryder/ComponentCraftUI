import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface Props {
  code: string;
  onCodeChange: (code: string) => void;
}

export function CodeEditor({ code, onCodeChange }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
        <span className="text-sm text-gray-400">Component Code</span>
        <button
          onClick={handleCopy}
          className="p-1 hover:bg-gray-700 rounded"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4 text-gray-400" />
          )}
        </button>
      </div>
      <div className="p-4">
        <textarea
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          className="w-full h-64 bg-gray-900 text-gray-100 font-mono text-sm resize-none focus:outline-none"
          spellCheck="false"
        />
      </div>
    </div>
  );
}