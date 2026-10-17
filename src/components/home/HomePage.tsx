import React from 'react';
import { Hero } from './Hero';
import { CategoryRail } from './CategoryRail';
import { SpecialsSection } from './SpecialsSection';
import { HowItWorks } from './HowItWorks';
import { Testimonials } from './Testimonials';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <CategoryRail />
      <SpecialsSection />
      <HowItWorks />
      <Testimonials />
    </div>
  );
};
