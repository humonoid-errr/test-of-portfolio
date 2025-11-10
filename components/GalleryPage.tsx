import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Project } from '../types';
import { FullscreenIcon } from './icons/FullscreenIcon';
import { CloseIcon } from './icons/CloseIcon';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface GalleryPageProps {
  project: Project;
}

const GalleryPage: React.FC<GalleryPageProps> = ({ project }) => {
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const fullscreenScrollRef = useRef<HTMLDivElement>(null);
  const fullscreenContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeFullscreenArrow, setActiveFullscreenArrow] = useState<'left' | 'right' | null>(null);

  const closeFullscreen = useCallback(() => {
    setFullscreenIndex(null);
  }, []);

  const goToNextImage = useCallback(() => {
    if (fullscreenIndex === null) return;
    const isLastImage = fullscreenIndex === project.galleryImages.length - 1;
    setFullscreenIndex(isLastImage ? 0 : fullscreenIndex + 1);
  }, [fullscreenIndex, project.galleryImages.length]);

  const goToPreviousImage = useCallback(() => {
    if (fullscreenIndex === null) return;
    const isFirstImage = fullscreenIndex === 0;
    setFullscreenIndex(isFirstImage ? project.galleryImages.length - 1 : fullscreenIndex - 1);
  }, [fullscreenIndex, project.galleryImages.length]);

  const checkScrollability = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollability();
      container.addEventListener('scroll', checkScrollability, { passive: true });
      window.addEventListener('resize', checkScrollability);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      }
    };
  }, [checkScrollability, project.galleryImages]);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (fullscreenIndex === null) return;
      if (event.key === 'Escape') {
        closeFullscreen();
      } else if (event.key === 'ArrowRight') {
        goToNextImage();
      } else if (event.key === 'ArrowLeft') {
        goToPreviousImage();
      }
    };

    if (fullscreenIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [fullscreenIndex, closeFullscreen, goToNextImage, goToPreviousImage]);
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (fullscreenIndex === null) return;
      const { clientX } = event;
      const threshold = window.innerWidth / 3;

      if (clientX < threshold) {
        setActiveFullscreenArrow('left');
      } else if (clientX > window.innerWidth - threshold) {
        setActiveFullscreenArrow('right');
      } else {
        setActiveFullscreenArrow(null);
      }
    };
    
    const handleMouseLeave = () => {
      setActiveFullscreenArrow(null);
    };

    const currentRef = fullscreenContainerRef.current;
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
  }, [fullscreenIndex]);

  useEffect(() => {
    if (fullscreenIndex !== null && fullscreenScrollRef.current) {
      const container = fullscreenScrollRef.current;
      container.scrollTo({
        left: container.offsetWidth * fullscreenIndex,
        behavior: 'smooth',
      });
    }
  }, [fullscreenIndex]);
  
  const handlePreviousClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    goToPreviousImage();
  };
  
  const handleNextClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    goToNextImage();
  };

  return (
    <>
      <section className="h-screen w-full flex flex-col bg-white text-gray-800 pt-32 overflow-hidden">
        <div className="flex-grow w-full flex items-center justify-center relative group">
          <button 
            onClick={() => handleScroll('left')} 
            className={`absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 p-3 transition-opacity duration-300 rounded-sm bg-black/60 hover:bg-black/80 ${canScrollLeft ? 'opacity-0 group-hover:opacity-100' : 'opacity-0 pointer-events-none'}`}
            aria-label="Scroll left"
          >
            <ChevronLeftIcon className="w-6 h-6 text-white" />
          </button>
          
          <div 
            ref={scrollContainerRef}
            className="w-full overflow-x-auto py-4 pl-8 md:pl-16 pr-8 md:pr-16 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            <div className="inline-flex gap-4 md:gap-6 h-[60vh]">
              {project.galleryImages.map((image, index) => (
                <div key={index} className="relative group/image h-full aspect-video flex-shrink-0">
                  <img
                    src={image}
                    alt={`${project.name} gallery image ${index + 1}`}
                    className="h-full w-full object-cover shadow-2xl"
                  />
                  <button
                    onClick={() => setFullscreenIndex(index)}
                    className="absolute top-4 right-4 bg-white/50 backdrop-blur-sm p-2 rounded-full text-gray-800 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 hover:bg-white/80"
                    aria-label="View image fullscreen"
                  >
                    <FullscreenIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={() => handleScroll('right')} 
            className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 p-3 transition-opacity duration-300 rounded-sm bg-black/60 hover:bg-black/80 ${canScrollRight ? 'opacity-0 group-hover:opacity-100' : 'opacity-0 pointer-events-none'}`}
            aria-label="Scroll right"
          >
            <ChevronRightIcon className="w-6 h-6 text-white" />
          </button>
        </div>
      </section>

      {fullscreenIndex !== null && (
        <div 
          ref={fullscreenContainerRef}
          className="fixed inset-0 bg-white z-50 flex flex-col justify-center animate-fadeIn"
          onClick={closeFullscreen}
        >
          <button 
            onClick={closeFullscreen}
            className="absolute top-6 right-6 text-gray-800 hover:opacity-70 transition-opacity z-50"
            aria-label="Close fullscreen view"
          >
            <CloseIcon className="w-8 h-8" />
          </button>
          
          <div className="relative w-full h-full flex items-center" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handlePreviousClick}
              className={`absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/5 hover:bg-black/10 transition-all duration-300 ${activeFullscreenArrow === 'left' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="w-8 h-8 text-gray-800" />
            </button>

            <div
              ref={fullscreenScrollRef}
              className="w-full h-full flex overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {project.galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="w-full h-full flex-shrink-0 flex items-center justify-center p-8"
                >
                  <img
                    src={image}
                    alt="Fullscreen view"
                    className="max-w-full max-h-full object-contain shadow-xl"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={handleNextClick}
              className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/5 hover:bg-black/10 transition-all duration-300 ${activeFullscreenArrow === 'right' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              aria-label="Next image"
            >
              <ChevronRightIcon className="w-8 h-8 text-gray-800" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryPage;