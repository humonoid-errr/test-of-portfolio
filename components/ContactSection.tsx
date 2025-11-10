import React from 'react';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="h-screen overflow-hidden w-full bg-white text-[#333] font-sans px-8 md:px-16 pt-40 pb-8 flex flex-col">
      <div className="max-w-7xl mx-auto border-t border-gray-300 pt-10 w-full flex-grow flex flex-col">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 flex-grow">
          
          {/* Left Column */}
          <div>
            <h2 className="text-5xl md:text-7xl font-serif text-black mb-8">
              Say Hello!
            </h2>
            <div className="w-full aspect-[4/3] bg-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop" 
                alt="Architectural rendering of a modern house" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-between pt-0 md:pt-10">
            <div className="space-y-4 font-sans text-base md:text-lg">
              <div className="grid grid-cols-[100px_1fr] gap-4 items-baseline">
                <span className="font-medium text-left">Phone :</span>
                <a href="tel:+918439144238" className="hover:underline break-all">+91-84391-44238</a>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-4 items-baseline">
                <span className="font-medium text-left">WhatsApp:</span>
                <a href="https://wa.me/919412505677" target="_blank" rel="noopener noreferrer" className="hover:underline break-all">https://wa.me/919412505677</a>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-4 items-baseline">
                <span className="font-medium text-left">LinkedIn :</span>
                <a href="https://linkedin.com/in/mumair-" target="_blank" rel="noopener noreferrer" className="hover:underline break-all">linkedin.com/in/mumair-</a>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-4 items-baseline">
                <span className="font-medium text-left">Email :</span>
                <a href="mailto:umairsaifi10@gmail.com" className="hover:underline break-all">umairsaifi10@gmail.com</a>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-4 items-baseline">
                <span className="font-medium text-left">Address:</span>
                <span>Available Worldwide</span>
              </div>
            </div>
            
            <div className="mt-16 text-left">
              <p className="text-7xl md:text-9xl font-serif text-gray-300 tracking-widest leading-none">
                THANK YOU
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ContactSection;