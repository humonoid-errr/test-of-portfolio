import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="min-h-screen w-full flex items-center justify-center bg-white text-gray-800 p-8 md:p-16 pt-40">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        {/* Left Column - Text Content */}
        <div className="text-left">
          <h2 className="text-3xl md:text-4xl font-light uppercase tracking-[0.2em] mb-8">
            ABOUT
          </h2>
          <p className="text-base md:text-lg font-light leading-relaxed text-gray-600">
            We are a multidisciplinary design and visualisation team working across the fields of architecture, landscape, product and interactive media. We work with architects, developers, brands and organizations to create emotive, engaging, atmospheric media by which to represent their messages.
          </p>
        </div>

        {/* Right Column - Image */}
        <div className="w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1588796144858-295b21a34a8a?q=80&w=1974&auto=format&fit=crop"
            alt="Modern interior with a view of sand dunes"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;