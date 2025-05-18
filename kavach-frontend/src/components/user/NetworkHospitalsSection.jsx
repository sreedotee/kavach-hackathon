import React from 'react';

// Import styles from the correct user directory
import styles from '../user/NetworkHospitalsSection.module.css';

// Import the HospitalMap from the user directory
import HospitalMap from './HospitalMap';

function NetworkHospitalsSection() {
  return (
    <section id="network" className="w-full bg-white py-8 px-4 rounded-lg shadow-md">
      <div className="max-w-screen-xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#0B3D91] mb-2">Network Hospitals</h2>
        <p className="text-lg text-gray-700 mb-4">Find our network of partner hospitals for cashless treatments in Banjara Hills.</p>
        <div className="w-full overflow-hidden rounded-lg shadow-md">
          <HospitalMap />
        </div>
      </div>
    </section>
  );
}

export default NetworkHospitalsSection;
