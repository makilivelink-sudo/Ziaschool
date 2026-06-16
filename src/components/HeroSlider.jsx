import { useEffect, useState } from 'react';
import { heroSlides } from '../data/siteData';

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative z-0 overflow-hidden bg-black">
      <div className="relative h-[calc(100svh-88px)] min-h-[480px] w-full md:h-[72vh] md:min-h-[540px]">
        {heroSlides.map((slide, slideIndex) => (
          <div
            key={slide.original}
            className={`absolute inset-0 transition-opacity duration-700 ${
              slideIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              zIndex: slideIndex === index ? 10 : 0,
            }}
          >
            <img
              src={slide.src}
              alt={`Hero slide ${slideIndex + 1}`}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>
        ))}

        <div className="absolute inset-0 z-20 bg-gradient-to-r from-black/6 via-black/2 to-black/4" />
      </div>
    </section>
  );
}
