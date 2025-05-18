import React from 'react';

function ClaimsSection() {
  return (
    <section id="claims" className="py-8 bg-gray-100">
      <div className="max-w-screen-md mx-auto text-center bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
        <h2 className="text-3xl font-bold text-[#0B3D91] mb-4">Claims Process</h2>
        
        <p className="text-lg text-gray-700 mb-2">
          To file a claim, just send <span className="font-semibold">"Help Claim"</span> in our WhatsApp bot. Follow the instructions to complete your claim.
        </p>
        
        <div className="mt-4 flex justify-center">
          <a
            href="https://wa.me/+9121960250?text=Help%20Claim"
            className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full shadow-md hover:scale-105 transition-transform duration-200 ease-in-out font-semibold"
          >
            Start a Claim on WhatsApp
          </a>
        </div>
        
        <p className="text-lg text-gray-700 mt-4">
          To check your claim status, type <span className="font-semibold">"Check Claim"</span> in WhatsApp anytime.
        </p>
      </div>
    </section>
  );
}

export default ClaimsSection;

