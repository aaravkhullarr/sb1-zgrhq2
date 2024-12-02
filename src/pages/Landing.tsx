import React from 'react';
import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { ComparisonSection } from '../components/landing/ComparisonSection';

export function Landing() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <ComparisonSection />
    </div>
  );
}