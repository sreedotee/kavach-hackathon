import React from 'react';
import HeroSection from './HeroSection';
import WhyChooseUs from './WhyChooseUs';
import StrategicEdge from './StrategicEdge';
import MarketGrowth from './MarketGrowth';
import CallToAction from './CallToAction';
import Footer from './Footer';

function InsurerGuide() {  
  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen">
      <main className="py-8">
        <HeroSection />
        <WhyChooseUs />
        <StrategicEdge />
        <MarketGrowth />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}

export default InsurerGuide;

