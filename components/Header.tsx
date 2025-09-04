
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full p-4 border-b border-slate-700/50">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          <span className="text-indigo-400">Prompt</span>Forge
        </h1>
      </div>
    </header>
  );
};
