import React from 'react';

function HeroSection() {
  return (
    <section id="hero" className="py-6 bg-[#F5F7FA]"> {/* Reduced vertical padding */}
      <div className="container max-w-screen-xl mx-auto text-center py-8 px-6"> {/* Reduced container padding */}
        <h2 className="text-3xl font-bold text-[#0B3D91] mb-2">Your Safety Net, Simplified.</h2> {/* Slightly reduced margin */}
        <p className="text-lg text-[#333333] mb-4">Kavach offers affordable and accessible insurance plans, right at your fingertips.</p> {/* Reduced margin */}
        <a
          href="#plans"
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full shadow-md hover:scale-105 transition-transform duration-200 ease-in-out font-semibold"
        >
          Explore Plans
        </a>
      </div>
    </section>
  );
}

export default HeroSection;
