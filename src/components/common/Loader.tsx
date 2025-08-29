import React from 'react';

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = 'Analyzing...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center bg-slate-800/20 rounded-lg backdrop-blur-sm">
      <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-semibold text-blue-300">{message}</p>
    </div>
  );
};

export default Loader;