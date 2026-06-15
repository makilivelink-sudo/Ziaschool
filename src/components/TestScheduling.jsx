import { Link } from 'react-router-dom';
import { testSchedulingList } from '../data/siteData';

const cardTheme = {
  blue: 'bg-gradient-to-br from-[#3d468f] via-[#4f5baf] to-[#6674c8]',
  red: 'bg-gradient-to-br from-[#c93a3a] via-[#d04545] to-[#c73333]',
};

export default function TestScheduling() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-800 sm:text-5xl">Test Scheduling</h2>
        </div>

        <div className="mt-14 flex justify-center gap-6 overflow-x-auto pb-4 snap-x snap-mandatory lg:gap-8">
          {testSchedulingList.map((item, index) => (
            <Link
              key={item.slug}
              to={`/page/${item.slug}`}
              className={`group relative min-h-[360px] w-[360px] shrink-0 snap-start overflow-hidden rounded-[28px] border-[8px] border-[#d6d9e6] p-6 text-left text-white shadow-[0_18px_45px_rgba(15,23,42,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(15,23,42,0.18)] ${cardTheme[item.tone]}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-black/10" />
              <div className="absolute right-5 top-5 h-[118px] w-[118px] rounded-full border-2 border-white/18" />
              <div className="absolute bottom-10 right-10 h-14 w-14 rounded-full border-2 border-white/15" />
              <div className="absolute left-14 top-14 h-20 w-20 rounded-full border-2 border-white/10" />

              <div className="relative z-10 flex h-full flex-col">
                <span className="w-fit rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm">
                  {item.title}
                </span>

                <div className="mt-auto max-w-[16rem] pb-1">
                  <h3 className="text-[2rem] font-semibold leading-[1.04] tracking-tight sm:text-[2.35rem]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[0.98rem] leading-7 text-white/92 sm:text-[1.02rem]">{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
