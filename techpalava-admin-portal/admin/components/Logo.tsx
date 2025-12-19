
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex flex-col items-center select-none">
      <h1 className="editorial-title text-4xl tracking-tighter text-slate-900">
        Tech<span className="text-blue-600">Palava</span>
      </h1>
      <div className="h-0.5 w-12 bg-slate-900 mt-1"></div>
    </div>
  );
};

export default Logo;
