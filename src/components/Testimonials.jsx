import { useEffect, useState } from 'react';

const initialReviews = [
  {
    name: 'Muhammad Ali',
    date: '25 Aug, 2024',
    review:
      'I am extremely satisfied with New Century Educational System. The school focuses not only on academics but also on character building. My child feels happy and motivated to go to school every day.',
  },
  {
    name: 'Sana Ahmed',
    date: '05 Sep, 2025',
    review:
      'New Century Educational System has exceeded my expectations in every way. The staff is friendly, the classrooms are well-organized, and the teaching quality is excellent. I truly appreciate their efforts.',
  },
  {
    name: 'Usman Tariq',
    date: '18 Jul, 2024',
    review:
      'Choosing New Century Educational System for my child was the best decision. The school offers a safe, supportive, and motivating environment. I highly recommend it to other parents.',
  },
];

function ReviewCard({ item, featured = false, tone = 'cream', onSelect }) {
  const toneClasses =
    tone === 'white'
      ? 'border border-[#e7d8b8] bg-white text-slate-700 hover:border-[#dcc899] hover:bg-[#fffefb] hover:shadow-[0_24px_55px_rgba(15,23,42,0.10)]'
      : 'border border-[#ead7ae] bg-[#fff8ea] text-slate-700 hover:border-[#dfc98f] hover:bg-[#fff4db] hover:shadow-[0_24px_55px_rgba(15,23,42,0.10)]';

  return (
    <article
      onClick={onSelect}
      className={`group relative flex h-[330px] cursor-pointer flex-col justify-between overflow-hidden rounded-[28px] px-6 py-6 shadow-[0_22px_50px_rgba(15,23,42,0.08)] transition-all duration-300 sm:h-[360px] sm:px-8 sm:py-8 ${
        featured ? 'bg-schoolBlueDark text-white shadow-[0_24px_55px_rgba(20,58,123,0.24)]' : toneClasses
      }`}
    >
      <div>
        <div className="text-sm font-bold tracking-[0.4em] text-amber-400">*****</div>

        <p
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 4,
            overflow: 'hidden',
          }}
          className={`mt-7 text-[1.02rem] leading-8 transition-colors duration-300 sm:text-[1.08rem] ${
            featured ? 'text-white/95' : 'text-slate-600 group-hover:text-slate-700'
          }`}
        >
          {item.review}
        </p>
      </div>

      <div className="mt-8">
        <div
          className={`text-[1.05rem] font-bold leading-tight transition-colors duration-300 ${
            featured ? 'text-white' : 'text-schoolBlueDark group-hover:text-schoolBlueDark'
          }`}
        >
          {item.name}
        </div>
        <div className={`mt-1 text-sm transition-colors duration-300 ${featured ? 'text-white/70' : 'text-slate-400'}`}>
          {item.date}
        </div>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const [reviews] = useState(initialReviews);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reviews.length === 0) {
      setActiveIndex(0);
      return;
    }

    if (activeIndex > reviews.length - 1) {
      setActiveIndex(reviews.length - 1);
    }
  }, [reviews, activeIndex]);

  const goToPrevious = () => {
    if (!reviews.length) return;
    setActiveIndex((current) => (current - 1 + reviews.length) % reviews.length);
  };

  const goToNext = () => {
    if (!reviews.length) return;
    setActiveIndex((current) => (current + 1) % reviews.length);
  };

  const carouselItems =
    reviews.length > 1
      ? [
          ...reviews.map((item, index) => ({
            ...item,
            originalIndex: index,
            tone: index % 2 === 0 ? 'white' : 'cream',
          })),
          ...reviews.slice(0, 2).map((item, index) => ({
            ...item,
            originalIndex: index,
            duplicate: true,
            tone: index % 2 === 0 ? 'white' : 'cream',
          })),
        ]
      : reviews.map((item, index) => ({
          ...item,
          originalIndex: index,
          tone: index % 2 === 0 ? 'white' : 'cream',
        }));

  return (
    <section id="parents-reviews" className="bg-[linear-gradient(180deg,#ffffff_0%,#fffdf7_100%)] py-16 sm:py-24">
      <div className="container-page">
        <div className="mb-8 flex items-start justify-between gap-4 sm:mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-schoolBlueDark sm:text-[2.1rem]">Parents Reviews</h2>
          </div>

          <div className="flex shrink-0 items-center gap-2 pt-1">
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Previous review"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-schoolBlueDark text-xl font-light text-white shadow-[0_10px_25px_rgba(20,58,123,0.18)] transition hover:bg-schoolBlue"
            >
              &lt;
            </button>
            <button
              type="button"
              onClick={goToNext}
              aria-label="Next review"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-schoolBlueDark text-xl font-light text-white shadow-[0_10px_25px_rgba(20,58,123,0.18)] transition hover:bg-schoolBlue"
            >
              &gt;
            </button>
          </div>
        </div>

        <div
          className="[--cards-per-view:1] [--carousel-gap:1rem] lg:[--cards-per-view:3] lg:[--carousel-gap:1.25rem]"
          style={{
            '--card-width': 'calc((100% - (var(--cards-per-view) - 1) * var(--carousel-gap)) / var(--cards-per-view))',
          }}
        >
          <div className="overflow-hidden">
            <div
              className="flex gap-[var(--carousel-gap)] transition-transform duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
              style={{
                transform: `translate3d(calc(-1 * ${activeIndex} * (var(--card-width) + var(--carousel-gap))), 0, 0)`,
              }}
            >
              {carouselItems.map((item, index) => (
                <div key={`${item.name}-${item.date}-${index}`} className="shrink-0 basis-[var(--card-width)]">
                  <ReviewCard
                    item={item}
                    featured={index === activeIndex}
                    tone={item.tone}
                    onSelect={() => setActiveIndex(item.originalIndex)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
