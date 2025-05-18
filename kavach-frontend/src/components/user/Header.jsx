import React from 'react';

function Header() {
  return (
    <header className="bg-[#0B3D91] text-white py-4 px-6 w-full">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        <div className="text-2xl font-bold">Kavach</div>
        <nav className="flex justify-center space-x-8 flex-1">
          <a href="#plans" className="text-white font-semibold">Insurance Plans</a>
          <a href="#claims" className="text-white font-semibold">Claims</a>
          <a href="#network" className="text-white font-semibold">Network Hospitals</a>
          <a href="#pharmacy" className="text-white font-semibold">Pharmacy Discounts</a>
          <a href="#provider" className="text-white font-semibold">Portal Login</a> {/* Updated link */}
        </nav>
      </div>
    </header>
  );
}

export default Header;
