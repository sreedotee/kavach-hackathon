import React from 'react';
import { Link } from 'react-router-dom';

function CallToAction() {
  return (
    <section id="contact" className="py-8 bg-white rounded-2xl shadow-lg mx-auto max-w-screen-md">
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-[#0B3D91] mb-2">
          Ready to Tap into India's Next Insurance Frontier?
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          Partner with Kavach and drive sustainable growth.
        </p>
        <Link
          to="/provider-dashboard"
          className="inline-block bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-full shadow-md hover:scale-105 transition-transform duration-200 ease-in-out font-semibold"
        >
          Bid Now
        </Link>
      </div>
    </section>
  );
}

export default CallToAction;
