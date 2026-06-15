import { newsEventsList } from '../data/siteData';

const accentBars = ['#28c7d7', '#f4c542', '#ff8f2b'];

export default function NewsEvents() {
  return (
    <section className="relative overflow-hidden bg-[#fbf4e6] py-16 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.75),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.45),transparent_30%)]" />
      <div className="container-page">
        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-800 sm:text-5xl">School Events</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            Stay updated with the latest school announcements, meetings, and celebrations. This section keeps parents
            and students informed in a simple, clear, and well-organized way.
          </p>
        </div>

        <div className="relative mt-14 grid gap-10 lg:grid-cols-3 lg:gap-8">
          {newsEventsList.map((event, index) => (
            <article
              key={event.title}
              className="group rounded-[28px] border border-white/70 bg-white/50 px-6 py-8 text-center shadow-[0_18px_45px_rgba(20,58,123,0.05)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/75"
            >
              <div
                className="mx-auto mb-6 h-1 w-16 rounded-full transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: accentBars[index % accentBars.length] }}
              />

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f8f1e3] text-3xl font-semibold text-schoolBlueDark shadow-[0_18px_35px_rgba(20,58,123,0.08)] transition duration-300 group-hover:bg-schoolBlueDark group-hover:text-white group-hover:shadow-[0_20px_40px_rgba(20,58,123,0.18)]">
                {index + 1}
              </div>

              <h3 className="mt-7 text-2xl font-medium text-slate-700">{event.title}</h3>
              <p className="mx-auto mt-4 max-w-md text-[1.05rem] leading-8 text-slate-600 transition-colors duration-300 group-hover:text-slate-700">
                {event.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
