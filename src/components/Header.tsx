import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/30 backdrop-blur-sm shadow-md sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-100 flex items-center gap-3">
              <i className="fa-solid fa-hospital-user text-blue-500"></i>
              <span>AI Medical Prescription Verification</span>
            </h1>
            {/* FIX: Updated subtitle to accurately reflect the technology being used. */}
            <p className="hidden sm:block text-slate-300 text-sm mt-1">
              Leveraging IBM Granite Models for Safe Medication Management
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;