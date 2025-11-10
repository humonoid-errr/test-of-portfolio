
import React, { useState, useEffect, useRef } from 'react';
import type { Project } from '../types';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface HeroProps {
  project: Project;
  goToNext: () => void;
  goToPrevious: () => void;
}

const Hero: React.FC<HeroProps> = ({ project, goToNext, goToPrevious }) => {
  const [activeButton, setActiveButton] = useState<'left' | 'right' | null>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX } = event;
      const threshold = window.innerWidth / 3;

      if (clientX < threshold) {
        setActiveButton('left');
      } else if (clientX > window.innerWidth - threshold) {
        setActiveButton('right');
      } else {
        setActiveButton(null);
      }
    };
    
    const handleMouseLeave = () => {
      setActiveButton(null);
    };

    const currentRef = heroRef.current;
    if (currentRef) {
      currentRef.addEventListener('mousemove', handleMouseMove);
      currentRef.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('mousemove', handleMouseMove);
        currentRef.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);
  
  const buttonClasses = 'bg-white/50 hover:bg-white/70';
  const iconClasses = 'text-gray-800';

  return (
    <main ref={heroRef} className="relative h-screen w-full">
      <div
        key={project.id}
        className="absolute inset-0 bg-cover bg-center animate-fadeIn"
        style={{ backgroundImage: `url(${project.imageUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />

      <button 
        onClick={goToPrevious} 
        className={`absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 p-3 transition-all duration-300 rounded-sm ${buttonClasses} ${activeButton === 'left' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-label="Previous Project"
      >
        <ChevronLeftIcon className={`w-6 h-6 ${iconClasses}`} />
      </button>

      <button 
        onClick={goToNext} 
        className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 p-3 transition-all duration-300 rounded-sm ${buttonClasses} ${activeButton === 'right' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-label="Next Project"
      >
        <ChevronRightIcon className={`w-6 h-6 ${iconClasses}`} />
      </button>

      <div className="absolute bottom-8 left-8 md:left-12 z-10 px-4 py-2 bg-black/60">
        <h2 className="text-lg font-light tracking-[0.3em] text-white uppercase">{project.name}</h2>
      </div>
    </main>
  );
};

export default Hero;
