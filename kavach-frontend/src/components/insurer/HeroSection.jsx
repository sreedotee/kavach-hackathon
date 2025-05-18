import React from 'react';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section id="hero" className="text-center py-12 bg-gray-100">
      <h1 className="text-4xl font-extrabold text-[#0B3D91] mb-4">
        Unlock India's Untapped Micro-insurance Market
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Partner with KAVACH to reach millions in the gig and informal economy.
      </p>
      <Link
        to="/provider-dashboard"
        className="inline-block bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-2xl shadow-md hover:scale-105 transition-transform duration-200 ease-in-out font-semibold"
      >
        Start Bidding
      </Link>
    </section>
  );
}

export default HeroSection;
