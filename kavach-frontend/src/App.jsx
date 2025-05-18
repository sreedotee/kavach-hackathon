import React from 'react';
import { Routes, Route } from 'react-router-dom';

// User Side Components
import Header from './components/user/Header';
import HeroSection from './components/user/HeroSection';
import PlansSection from './components/user/PlansSection';
import ClaimsSection from './components/user/ClaimsSection';
import NetworkHospitalsSection from './components/user/NetworkHospitalsSection';
import PharmacyDiscountsSection from './components/user/PharmacyDiscountsSection';
import Footer from './components/user/Footer';

// Insurer Side Components
import InsurerHeader from './components/insurer/Header'; // Insurer-specific header
import ProviderLogin from './components/insurer/ProviderLogin';
import ProviderDashboard from './components/insurer/ProviderDashboard';
import InsurerGuide from './components/insurer/InsurerGuide';
import ProviderPortalSection from './components/insurer/ProviderPortalSection';

import './App.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={
          <div>
            <Header /> {/* User Header for main page */}
            <main>
              <HeroSection />
              <PlansSection />
              <ClaimsSection />
              <NetworkHospitalsSection />
              <PharmacyDiscountsSection />
              <ProviderPortalSection />
            </main>
            <Footer />
          </div>
        } />

        {/* Insurer Flow */}
        <Route path="/provider-login" element={<ProviderLogin />} />
        <Route path="/insurer-guide" element={
          <div>
            <InsurerHeader /> {/* Insurer Header */}
            <InsurerGuide />
          </div>
        } />
        <Route path="/provider-dashboard" element={<ProviderDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
