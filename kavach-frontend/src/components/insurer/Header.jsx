// Header.jsx (Insurer)
import React from 'react';

function InsurerHeader() {
  return (
    <header className="bg-[#083370] text-white py-4 px-6 w-full">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        <div className="text-2xl font-bold">KAVACH Insurer Portal</div>
        <nav className="flex space-x-8">
          <a href="#home" className="hover:text-gray-300">Home</a>
          <a href="#benefits" className="hover:text-gray-300">Benefits</a>
          <a href="#market" className="hover:text-gray-300">Market Growth</a>
          <a href="#contact" className="hover:text-gray-300">Contact</a>
        </nav>
      </div>
    </header>
  );
}

export default InsurerHeader;
