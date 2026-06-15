import { useEffect, useState } from 'react';
import { galleryImages } from '../data/siteData';
import FallbackImage from './FallbackImage';

const tiles = [
  {
    image: galleryImages[1],
    size: 'w-[280px] h-[240px] sm:w-[320px] sm:h-[270px] lg:w-[350px] lg:h-[300px]',
    imageClass: 'object-cover object-center',
  },
  {
    image: galleryImages[0],
    size: 'w-[340px] h-[250px] sm:w-[390px] sm:h-[280px] lg:w-[430px] lg:h-[320px]',
    imageClass: 'object-contain object-center',
  },
  {
    image: galleryImages[2],
    size: 'w-[280px] h-[240px] sm:w-[320px] sm:h-[270px] lg:w-[350px] lg:h-[300px]',
    imageClass: 'object-cover object-[center_35%]',
  },
];

export default function Gallery() {
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveImage(null);
      }
    };

    if (activeImage) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImage]);

  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(20,58,123,0.96)_0%,rgba(20,58,123,0.9)_22%,rgba(255,255,255,0.98)_50%,rgba(255,255,255,0.96)_60%,rgba(209,63,63,0.9)_84%,rgba(209,63,63,0.98)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.96),transparent_18%),radial-gradient(circle_at_18%_56%,rgba(20,58,123,0.48),transparent_20%),radial-gradient(circle_at_84%_56%,rgba(209,63,63,0.42),transparent_20%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.06)_100%)]" />
      <div className="container-page">
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-schoolRed drop-shadow-sm">Gallery</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-schoolBlueDark drop-shadow-[0_2px_16px_rgba(255,255,255,0.45)] sm:text-6xl">
            Our Gallery
          </h2>
        </div>

        <div className="relative mx-auto mt-10 flex max-w-7xl flex-col items-center justify-center gap-6 md:flex-row md:items-end md:gap-4 lg:gap-6">
          {tiles.map((tile, index) => {
            return (
              <div
                key={tile.image.original}
                className={`relative select-none ${tile.size} ${
                  index === 1 ? 'md:-mt-10 md:z-20' : 'md:z-10'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveImage(tile.image)}
                  className={`relative h-full w-full overflow-hidden rounded-[32px] transition duration-300 hover:-translate-y-1 ${
                    index === 0
                      ? 'border border-white/20 bg-transparent shadow-none'
                      : 'border border-white/35 bg-white shadow-[0_18px_40px_rgba(10,31,68,0.16)] hover:shadow-[0_24px_50px_rgba(10,31,68,0.2)]'
                  }`}
                >
                  <FallbackImage
                    src={tile.image.src}
                    originalSrc={tile.image.original}
                    alt={`Gallery image ${index + 1}`}
                    className="h-full w-full"
                    imgClassName={`h-full w-full ${tile.imageClass} ${
                      index === 0 ? 'p-0 object-center' : ''
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {activeImage ? (
        <div
          className="fixed inset-0 z-[500] flex items-center justify-center bg-black/80 px-4 py-6"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image preview"
          onClick={() => setActiveImage(null)}
        >
          <div className="relative max-h-[90vh] w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              className="absolute -right-2 -top-2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl font-bold text-schoolBlueDark shadow-[0_12px_30px_rgba(0,0,0,0.25)]"
              aria-label="Close preview"
            >
              ×
            </button>
            <div className="overflow-hidden rounded-[28px] border border-white/20 bg-white shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
              <img
                src={activeImage.src}
                alt="Gallery preview"
                className="max-h-[90vh] w-full object-contain"
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
