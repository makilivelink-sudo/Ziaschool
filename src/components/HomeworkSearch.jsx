import { campusOptions, classOptions } from '../data/siteData';

export default function HomeworkSearch() {
  return (
    <section id="admission" className="relative overflow-hidden bg-[#f8f1e3] py-16 sm:py-24">
      <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-schoolBlueDark/10 blur-3xl" />
      <div className="pointer-events-none absolute left-[-6rem] top-1/2 h-72 w-72 rounded-full bg-white/70 blur-3xl" />
      <div className="container-page">
        <div className="mb-6 max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-schoolBlueDark">Home Work</p>
          <h2 className="max-w-3xl text-2xl font-bold tracking-tight text-slate-800 sm:text-4xl">
            Search homework and classroom details
          </h2>
        </div>

        <div className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/85 p-5 shadow-[0_24px_60px_rgba(20,58,123,0.12)] backdrop-blur sm:p-6">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(20,58,123,0.04),transparent_35%,rgba(255,255,255,0.25)_75%)]" />
          <div className="relative grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <label className="space-y-2">
              <span className="text-sm font-bold text-slate-700">Campus</span>
              <select className="input-field border-slate-200 bg-[#fffdf7] shadow-sm">
                {campusOptions.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-bold text-slate-700">Class</span>
              <select className="input-field border-slate-200 bg-[#fffdf7] shadow-sm">
                {classOptions.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-bold text-slate-700">Section</span>
              <select className="input-field border-slate-200 bg-[#fffdf7] shadow-sm">
                {['A', 'B', 'C', 'D'].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-bold text-slate-700">Date</span>
              <input type="date" className="input-field border-slate-200 bg-[#fffdf7] shadow-sm" />
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-start">
          <button
            className="inline-flex items-center justify-center rounded-full bg-schoolBlueDark px-7 py-3.5 text-base font-bold text-white shadow-[0_18px_35px_rgba(20,58,123,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-schoolBlue hover:shadow-[0_22px_45px_rgba(20,58,123,0.28)]"
            type="button"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
