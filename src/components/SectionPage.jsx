import { Link, useParams } from 'react-router-dom';
import { pageContentBySlug, pageDetailsBySlug } from '../data/siteData';
import FallbackImage from './FallbackImage';

export default function SectionPage() {
  const { slug } = useParams();
  const title = pageContentBySlug[slug] || 'Page';
  const details = pageDetailsBySlug[slug];
  const schedule = details?.schedule;

  return (
    <main className="bg-[#f8fafc]">
      <section className="container-page py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-schoolRed">{details?.label || 'Zia Public High School Bhalwal'}</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-schoolRed sm:text-5xl">
            {details?.title || title}
          </h1>

          <div className="mt-10 rounded-[28px] border border-red-100 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8">
            {details?.image ? (
              <div className="mb-8 grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start">
                <div className="overflow-hidden rounded-[22px] border border-red-100 bg-white shadow-soft">
                  <FallbackImage
                    src={details.image.src}
                    originalSrc={details.image.original}
                    alt={details.title}
                    className="h-full w-full"
                    imgClassName="h-full w-full object-cover"
                  />
                </div>

                <div className="pt-1">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-schoolBlue">
                    {details.label || 'About Us'}
                  </p>
                  <h2 className="mt-3 text-2xl font-black text-slate-900">{details.title}</h2>
                </div>
              </div>
            ) : null}

            <p className="text-base leading-8 text-slate-700">
              {details?.intro ||
                'This section opens from the navigation menu and contains the school content from the original website layout.'}
            </p>

            <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
              {(details?.body || []).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {schedule ? (
              <div className="mt-8 overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_16px_36px_rgba(15,23,42,0.06)]">
                <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
                  <p className="text-xs font-bold uppercase tracking-[0.32em] text-schoolBlueDark">{schedule.title}</p>
                  <p className="mt-2 text-sm text-slate-600">{schedule.subtitle}</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 text-left">
                    <thead className="bg-slate-50">
                      <tr>
                        {schedule.columns.map((column) => (
                          <th
                            key={column}
                            className="whitespace-nowrap px-5 py-4 text-sm font-bold uppercase tracking-[0.18em] text-slate-600"
                          >
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {schedule.rows.map((row, rowIndex) => (
                        <tr key={`${row[0]}-${rowIndex}`} className="transition-colors hover:bg-[#f8fbff]">
                          {row.map((cell, cellIndex) => (
                            <td key={`${cell}-${cellIndex}`} className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}

            {details?.points?.length ? (
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {details.points.map((point) => (
                  <div
                    key={point}
                    className="rounded-2xl border border-blue-100 bg-[#f9fbff] px-4 py-4 text-sm font-semibold text-slate-800 shadow-sm"
                  >
                    {point}
                  </div>
                ))}
              </div>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/" className="btn-red">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
