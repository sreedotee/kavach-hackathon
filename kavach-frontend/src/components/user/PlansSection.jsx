import React from 'react';

function PlansSection() {
  return (
    <section id="plans" className="py-8 bg-gray-100">
      <div className="max-w-screen-xl mx-auto text-center mb-6">
        <h2 className="text-3xl font-bold text-[#0B3D91] mb-4">Our Insurance Plans</h2>
        <div className="grid grid-cols-3 gap-6 justify-center items-end">
          
          {/* KAVACH SILVER */}
          <div className="relative bg-gray-200 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#0B3D91]">KAVACH SILVER</h3>
              <p className="text-2xl font-extrabold text-green-600">₹5/day</p>
              <ul className="mt-2 space-y-1 text-left">
                <li>₹15,000 Accidental Coverage</li>
                <li>Pause Option</li>
                <li>Referral Bonuses</li>
                <li>Weather Alerts</li>
                <li>Ideal for new gig workers starting out</li>
              </ul>
            </div>
            <div className="mt-4 flex justify-center">
              <a
                href="https://wa.me/+9121960250"
                className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform duration-200 ease-in-out font-semibold"
              >
                Subscribe via WhatsApp
              </a>
            </div>
          </div>

          {/* KAVACH GOLD */}
          <div className="relative bg-yellow-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 h-full flex flex-col justify-between">
            <div className="absolute top-0 left-0 bg-[#CD7F32] text-white text-xs font-bold px-3 py-1 rounded-tl-2xl">Most Popular</div>
            <h3 className="text-lg font-bold text-[#0B3D91]">KAVACH GOLD</h3>
            <p className="text-2xl font-extrabold text-green-600">₹10/day</p>
            <ul className="mt-2 space-y-1 text-left">
              <li>Everything in Silver, plus:</li>
              <li>₹30K Accident + ₹15K Hospitalization</li>
              <li>Faster Claims</li>
              <li>Loyalty Rewards</li>
              <li>Emergency Cash-Out</li>
              <li>Ideal for regular gig workers seeking extra protection</li>
            </ul>
            <div className="mt-4 flex justify-center">
              <a
                href="https://wa.me/+9121960250"
                className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform duration-200 ease-in-out font-semibold"
              >
                Subscribe via WhatsApp
              </a>
            </div>
          </div>

          {/* KAVACH PLATINUM */}
          <div className="relative bg-blue-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#0B3D91]">KAVACH PLATINUM</h3>
              <p className="text-2xl font-extrabold text-green-600">₹25/day</p>
              <ul className="mt-2 space-y-1 text-left">
                <li>Everything in Gold, plus:</li>
                <li>₹1L Accident + ₹50K Hospitalization + OPD</li>
                <li>Wallet</li>
                <li>Clinic Discounts</li>
                <li>Annual Check-Up</li>
                <li>Ideal for experienced gig workers</li>
              </ul>
            </div>
            <div className="mt-4 flex justify-center">
              <a
                href="https://wa.me/+9121960250"
                className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform duration-200 ease-in-out font-semibold"
              >
                Subscribe via WhatsApp
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default PlansSection;
