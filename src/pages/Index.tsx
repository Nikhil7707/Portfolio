import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from '@/components/LoadingScreen';
import CustomCursor from '@/components/CustomCursor';
import ParticleBackground from '@/components/ParticleBackground';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import EducationSection from '@/components/EducationSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import MotionToggle from '@/components/MotionToggle';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} minDuration={2500} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <CustomCursor />
          <ParticleBackground />
          <div className="noise-overlay" />
          
          <div className="relative z-10">
            <Navigation />
            <main>
              <HeroSection />
              <AboutSection />
              <SkillsSection />
              <ProjectsSection />
              <EducationSection />
              <ContactSection />
            </main>
            <Footer />
          </div>
          
          <MotionToggle />
        </>
      )}
    </>
  );
};

export default Index;
