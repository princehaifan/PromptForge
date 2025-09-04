
import React, { useState, useCallback } from 'react';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';

interface PromptResultProps {
  imageSrc: string;
  prompt: string;
  onReset: () => void;
}

export const PromptResult: React.FC<PromptResultProps> = ({ imageSrc, prompt, onReset }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [prompt]);

  return (
    <div className="w-full animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold text-slate-300 mb-4">Original Image</h2>
          <img
            src={imageSrc}
            alt="Uploaded content"
            className="rounded-lg shadow-2xl max-h-96 object-contain"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-slate-300 mb-4">Your Generated Prompt</h2>
          <div className="relative flex-grow bg-slate-800 p-6 rounded-lg shadow-inner">
            <p className="text-slate-200 leading-relaxed font-mono text-sm h-full overflow-y-auto max-h-80">
              {prompt}
            </p>
            <button
              onClick={handleCopy}
              className="absolute top-4 right-4 p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              aria-label="Copy prompt"
            >
              {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5 text-slate-300" />}
            </button>
          </div>
        </div>
      </div>
      <div className="text-center mt-12">
        <button
          onClick={onReset}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 shadow-lg"
        >
          Generate Another Prompt
        </button>
      </div>
    </div>
  );
};
