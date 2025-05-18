import React from 'react';

function PharmacyDiscountsSection() {
  // Sample pharmacy data
  const pharmacies = [
    { name: 'Apollo Pharmacy', discount: '10%', available: true },
    { name: 'MedPlus', discount: '15%', available: true },
    { name: 'Care Pharmacy', discount: 'Coming Soon', available: false },
  ];

  return (
    <section id="pharmacy" className="w-full bg-white py-8 px-6 rounded-lg shadow-md my-8">
      <div className="max-w-screen-xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#0B3D91] mb-4">Pharmacy Discounts</h2>
        <p className="text-lg text-gray-700 mb-6">
          Enjoy exclusive discounts at our partner pharmacies. Explore the best deals available to you.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {pharmacies.map((pharmacy, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-md transform transition duration-300 ease-in-out ${
                pharmacy.available ? 'bg-green-100 hover:-translate-y-2 hover:shadow-lg' : 'bg-gray-100'
              }`}
            >
              <h3 className="text-xl font-semibold text-[#0B3D91] mb-2">{pharmacy.name}</h3>
              <p className={`text-lg ${pharmacy.available ? 'text-green-600' : 'text-gray-500'}`}>
                {pharmacy.available ? `Discount: ${pharmacy.discount}` : pharmacy.discount}
              </p>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-4">More pharmacy partnerships coming soon!</p>
      </div>
    </section>
  );
}

export default PharmacyDiscountsSection;
