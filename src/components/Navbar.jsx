import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { menuItems, schoolLogo } from '../data/siteData';
import FallbackImage from './FallbackImage';
import ActionModal from './ActionModal';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [modal, setModal] = useState(null);
  const navRef = useRef(null);
  const navigate = useNavigate();

  const closeMobile = () => setMobileOpen(false);

  const goToAbout = () => {
    navigate('/');
    window.setTimeout(() => {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };

  const toggleMenu = (title) => {
    setOpenMenu((current) => (current === title ? null : title));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className="sticky top-0 z-[120] overflow-visible text-white shadow-[0_10px_30px_rgba(20,58,123,0.18)]"
      style={{ backgroundColor: '#143a7b' }}
    >
      <div ref={navRef} className="container-page">
        <div className="flex items-center justify-between gap-3 py-3 sm:gap-4">
          <Link to="/" reloadDocument className="flex shrink-0 items-center gap-3">
            <FallbackImage
              src={schoolLogo.src}
              originalSrc={schoolLogo.original}
              alt="Zia Public High School Bhalwal Logo"
              className="h-12 w-12 overflow-hidden rounded-full border border-white/25 bg-white shadow-[0_10px_25px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-0.5 sm:h-14 sm:w-14"
              imgClassName="h-full w-full object-cover"
            />
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-4 overflow-visible xl:flex xl:gap-7">
            {menuItems.map((group) => (
              <div
                key={group.title}
                className="relative"
                onMouseEnter={() => setOpenMenu(group.title)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  type="button"
                  className={`rounded-xl px-2 py-2 text-xs font-bold transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 xl:px-3 xl:text-sm ${
                    openMenu === group.title ? 'bg-white/10 text-white' : 'text-white/95'
                  }`}
                  onClick={() => toggleMenu(group.title)}
                >
                  {group.title}
                </button>

                {openMenu === group.title && (
                  <div className="absolute left-1/2 top-full z-[200] mt-3 w-[min(90vw,360px)] -translate-x-1/2">
                    <div className="relative overflow-hidden rounded-[16px] border border-slate-200 bg-[linear-gradient(135deg,rgba(255,255,255,0.98)_0%,rgba(244,248,255,0.96)_56%,rgba(255,239,239,0.94)_100%)] p-2 text-slate-900 shadow-[0_16px_45px_rgba(8,26,58,0.18)] backdrop-blur-md">
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(20,58,123,0.02)_0%,rgba(20,58,123,0)_52%,rgba(209,63,63,0.02)_100%)]" />

                      <div className="relative space-y-1">
                        {group.items.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setOpenMenu(null)}
                            className="group flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition duration-200 hover:bg-red-50 hover:text-schoolRed"
                          >
                            <h4 className="text-[14px] font-medium leading-5 tracking-wide text-slate-900 transition group-hover:text-schoolRed">
                              {item.label}
                            </h4>
                            <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center text-slate-400 transition group-hover:text-schoolRed">
                              →
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              to="/forms/online-admission"
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full border border-white/80 px-4 py-2 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-schoolBlueDark xl:inline-flex"
              >
              Online Admission
            </Link>

            <button
              type="button"
              onClick={goToAbout}
              className="hidden rounded-full border border-white/40 px-4 py-2 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-schoolBlueDark xl:inline-flex"
            >
              About Us
            </button>

            <button
              type="button"
              onClick={() => setModal('jobs')}
              className="hidden rounded-full border border-white/40 px-4 py-2 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-schoolBlueDark xl:inline-flex"
            >
              Jobs
            </button>

            <button
              type="button"
              className="rounded-xl border border-white/25 px-3 py-2 text-lg font-bold text-white transition duration-300 hover:bg-white/10 xl:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              Menu
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="pb-4 xl:hidden">
            <div className="rounded-2xl border border-white/10 bg-schoolBlueDark p-3 shadow-soft">
              <div className="space-y-2">
                {menuItems.map((group) => (
                  <div key={group.title} className="rounded-xl border border-white/10">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-extrabold text-white transition hover:bg-white/10"
                      onClick={() => setOpenSection(openSection === group.title ? null : group.title)}
                    >
                      {group.title}
                      <span>{openSection === group.title ? '-' : '+'}</span>
                    </button>
                    {openSection === group.title && (
                      <div className="border-t border-white/10 bg-gradient-to-br from-white/5 via-transparent to-white/5 p-3">
                        {group.items.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={closeMobile}
                            className="mb-2 block rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-white transition hover:bg-white/10"
                          >
                            <span className="block text-sm font-extrabold">{item.label}</span>
                            <span className="mt-1 block text-xs leading-5 text-white/75">{item.description}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <ActionModal
        open={Boolean(modal)}
        variant={modal}
        title={modal}
        onClose={() => setModal(null)}
      />
    </header>
  );
}
