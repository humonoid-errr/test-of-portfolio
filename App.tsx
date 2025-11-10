import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import GalleryPage from './components/GalleryPage';
import { projects } from './constants';
import { Project } from './types';

export type Page = 'home' | 'about' | 'contact' | 'gallery';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const goToPrevious = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? projects.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex]);

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === projects.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex]);
  
  const handleSelectProject = useCallback((project: Project) => {
    setSelectedProject(project);
    setCurrentPage('gallery');
  }, []);

  const handleNavigate = useCallback((page: Page) => {
    setCurrentPage(page);
    if (page !== 'gallery') {
      setSelectedProject(null);
    }
  }, []);

  if (currentPage === 'home') {
    return (
      <div className="h-screen overflow-hidden bg-gray-800 text-white font-sans antialiased">
        <Header onNavigate={handleNavigate} page={currentPage} projects={projects} onSelectProject={handleSelectProject}/>
        <Hero
          project={projects[currentIndex]}
          goToNext={goToNext}
          goToPrevious={goToPrevious}
        />
      </div>
    );
  }

  return (
    <div className="font-sans antialiased">
      <Header onNavigate={handleNavigate} page={currentPage} projects={projects} onSelectProject={handleSelectProject}/>
      <main>
        {currentPage === 'about' && <AboutSection />}
        {currentPage === 'contact' && <ContactSection />}
        {currentPage === 'gallery' && selectedProject && <GalleryPage project={selectedProject} />}
      </main>
    </div>
  );
}

export default App;
