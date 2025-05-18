import React from 'react';

function MarketGrowth() {
  return (
    <section id="market" className="py-8 px-6 bg-white rounded-2xl shadow-lg mx-auto max-w-screen-lg my-6">
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-[#0B3D91] mb-4">
          Market Growth Potential
        </h2>
        <p className="text-gray-800 text-lg mb-6">
          The Indian gig and informal workforce is rapidly expanding, driven by the rise of delivery riders, ride-hailing drivers, and freelance professionals.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700 text-lg">
          <div className="p-4 bg-gray-50 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold text-[#0B3D91] mb-2">Gig Workforce</h3>
            <p>
              Expected to grow from <strong>7.7 million (2020-21)</strong> to <strong>23.5 million by 2029-30</strong>, representing 6.7% of the non-agricultural workforce.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold text-[#0B3D91] mb-2">MSME Sector</h3>
            <p>
              Comprising <strong>63.3 million units</strong>, employing <strong>110 million people</strong>, and contributing approximately <strong>30% to India's GDP</strong>.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold text-[#0B3D91] mb-2">Microinsurance Market</h3>
            <p>
              Estimated to reach <strong>USD 1.7 billion by 2033</strong> from <strong>USD 428.4 million in 2024</strong>, with a CAGR of <strong>15.67%</strong>.
            </p>
          </div>
        </div>
        <p className="text-gray-800 text-lg mt-6">
          Partner with Kavach to tap into this thriving market and secure your position in India's insurance landscape.
        </p>
      </div>
    </section>
  );
}

export default MarketGrowth;
