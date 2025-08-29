import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900/30 backdrop-blur-sm text-center py-4 text-slate-400 text-sm mt-auto">
      &copy; {new Date().getFullYear()} AI Medical Prescription Verification. All Rights Reserved.
    </footer>
  );
};

export default Footer;