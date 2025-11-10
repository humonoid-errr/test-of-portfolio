import React, { useState, useRef, useEffect } from 'react';
import { LinkedinIcon } from './icons/LinkedinIcon';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { Page } from '../App';
import { Project } from '../types';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  page: Page;
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, page, projects, onSelectProject }) => {
  const [isWorkMenuOpen, setIsWorkMenuOpen] = useState(false);
  const workMenuRef = useRef<HTMLDivElement>(null);
  const isHomePage = page === 'home';
  const isLightPage = page === 'about' || page === 'contact';
  const isGalleryPage = page === 'gallery';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (workMenuRef.current && !workMenuRef.current.contains(event.target as Node)) {
        setIsWorkMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getHeaderClasses = () => {
    const baseClasses = "absolute top-0 left-0 right-0 z-20 group";
    return `${baseClasses} py-8 md:py-12 px-16 md:px-24`;
  };
  
  const getCapsuleClasses = () => {
    const baseClasses = "absolute top-1/2 -translate-y-1/2 h-14 rounded-full origin-center transition-all duration-300 ease-in-out pointer-events-none";
    const positionClasses = "inset-x-10 md:inset-x-16";
    const hoverClasses = "opacity-0 group-hover:opacity-100 scale-x-95 group-hover:scale-x-100";

    if (isHomePage) {
      if (isWorkMenuOpen) {
        return `${baseClasses} ${positionClasses} opacity-100 scale-x-100 bg-white/10 backdrop-blur-lg border border-white/20`;
      }
      return `${baseClasses} ${positionClasses} ${hoverClasses} bg-black/20 backdrop-blur-lg border border-white/10`;
    }
    
    if (isWorkMenuOpen) {
       return `${baseClasses} ${positionClasses} opacity-100 scale-x-100 bg-gray-200 border border-gray-300`;
    }
    return `${baseClasses} ${positionClasses} ${hoverClasses} bg-gray-100 border border-gray-200`;
  };

  const getTextClasses = () => {
    if (isLightPage || isGalleryPage) return 'text-gray-800';
    return 'text-white';
  };

  const getButtonClasses = () => {
     if (isLightPage || isGalleryPage) return "cursor-pointer hover:opacity-70 transition-opacity bg-transparent border-none text-gray-800 uppercase text-sm font-light tracking-wider";
     return "cursor-pointer hover:opacity-70 transition-opacity bg-transparent border-none text-white uppercase text-sm font-light tracking-wider";
  };
  
  return (
    <header className={getHeaderClasses()}>
      <div className={getCapsuleClasses()} aria-hidden="true" />
      
      <div className={`relative flex justify-between items-center ${getTextClasses()}`}>
        <button
          onClick={() => onNavigate('home')}
          className="text-xl md:text-2xl font-light tracking-[0.3em] md:tracking-[0.5em] uppercase bg-transparent border-none p-0 text-left cursor-pointer hover:opacity-70 transition-opacity"
          aria-label="Go to home page"
        >
          MOHD UMAIR
        </button>
        
        <div className="hidden md:block">
          <nav className="flex items-center space-x-6 text-sm font-light tracking-wider uppercase">
            <div 
              className="relative"
              ref={workMenuRef}
              onMouseEnter={() => setIsWorkMenuOpen(true)}
              onMouseLeave={() => setIsWorkMenuOpen(false)}
            >
              <button 
                onClick={() => setIsWorkMenuOpen(prev => !prev)} 
                className={`${getButtonClasses()} flex items-center`}
              >
                  <span className="text-xl font-thin mr-1">+</span> Work
              </button>
              {isWorkMenuOpen && (
                <div className="absolute top-full pt-4 -ml-4 w-64 text-white z-30">
                  <div className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-md overflow-hidden">
                    <ul className="max-h-96 overflow-y-auto py-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/40 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-white/60">
                      {projects.map(project => (
                        <li key={project.id}>
                          <button 
                            onClick={() => onSelectProject(project)}
                            className="w-full text-left px-6 py-2 text-sm font-light hover:bg-white/10 transition-colors"
                          >
                            {project.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <button onClick={() => onNavigate('about')} className={getButtonClasses()}>About</button>
            <button onClick={() => onNavigate('contact')} className={getButtonClasses()}>Contact</button>
            <div className="flex items-center pl-4 space-x-4">
              <a href="https://linkedin.com/in/mumair-" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a href="https://wa.me/919412505677" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                <WhatsAppIcon className="w-5 h-5" />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;