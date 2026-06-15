import { Link } from 'react-router-dom';
import { serviceCards } from '../data/siteData';

export default function OurServices() {
  const loopingCards = [...serviceCards, ...serviceCards];

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-page">
        <div className="mx-auto mb-10 max-w-5xl text-center">
          <p className="section-subtitle">Our Services</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Student Life at <span className="text-schoolBlue">Zia Public High School</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
            Supporting students through every stage with learning, communication, and guidance that stays consistent.
          </p>
        </div>

        <div className="services-marquee overflow-hidden">
          <div className="services-marquee-track flex w-max gap-5 pb-4 lg:gap-6">
            {loopingCards.map((item, index) => {
              const isBlue = index % 2 === 1;

              const cardBg = isBlue
                ? 'bg-gradient-to-br from-schoolBlueDark via-schoolBlue to-[#4ea5ff]'
                : 'bg-white';
              const textClass = isBlue ? 'text-white' : 'text-slate-700';
              const ringClass = isBlue ? 'border-white' : 'border-[#f3e7c8]';
              const shadowClass = isBlue ? 'shadow-[0_18px_40px_rgba(0,0,0,0.12)]' : 'shadow-[0_18px_40px_rgba(15,23,42,0.08)]';
              const circleClass = isBlue ? 'border-white/15' : 'border-[#f1e8d3]/20';

              const offsetClass = index % 2 === 0 ? 'lg:translate-y-2' : 'lg:-translate-y-2';

              return (
                <Link
                  key={`${item.path}-${index}`}
                  to={item.path}
                  className={`group relative flex h-[360px] w-[290px] shrink-0 overflow-hidden rounded-[28px] border-8 p-6 text-left transition duration-300 hover:-translate-y-1 hover:shadow-2xl sm:h-[400px] sm:w-[340px] lg:w-[360px] ${cardBg} ${ringClass} ${shadowClass} ${offsetClass}`}
                >
                  <div className="absolute inset-0 opacity-20">
                    <div className={`absolute -left-6 top-6 h-28 w-28 rounded-full border-[10px] ${circleClass}`} />
                    <div className={`absolute right-3 top-3 h-20 w-20 rounded-full border-[10px] ${circleClass}`} />
                    <div className={`absolute bottom-10 left-8 h-16 w-16 rounded-full border-[8px] ${circleClass}`} />
                    <div className={`absolute bottom-8 right-6 h-14 w-14 rounded-full border-[8px] ${circleClass}`} />
                  </div>

                  <div className={`relative z-10 flex h-full flex-col justify-between ${textClass}`}>
                    <div
                      className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-semibold shadow-sm ${
                        isBlue ? 'bg-white text-schoolBlueDark' : 'bg-[#fffdf7] text-schoolBlueDark'
                      }`}
                    >
                      {item.badge || item.label}
                    </div>

                    <div className="max-w-[17rem]">
                      <h3 className="text-3xl font-black leading-tight sm:text-[2.5rem]">{item.label}</h3>
                      <p className={`mt-4 text-base leading-7 ${isBlue ? 'text-white/90' : 'text-slate-600'}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
