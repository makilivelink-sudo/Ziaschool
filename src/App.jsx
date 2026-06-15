import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import AboutUs from './components/AboutUs';
import OurServices from './components/OurServices';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import NewsEvents from './components/NewsEvents';
import TestScheduling from './components/TestScheduling';
import VideoSection from './components/VideoSection';
import Footer from './components/Footer';
import SectionPage from './components/SectionPage';
import FormPage from './components/FormPage';
import FloatingSupport from './components/FloatingSupport';
import Reveal from './components/Reveal';
import AdminPage from './components/AdminPage';

function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative z-[120]">
        <Navbar />
      </div>
      <main>
        <Reveal delay={40}>
          <HeroSlider />
        </Reveal>
        <Reveal delay={80}>
          <AboutUs />
        </Reveal>
        <Reveal delay={160}>
          <OurServices />
        </Reveal>
        <Reveal delay={200}>
          <Gallery />
        </Reveal>
        <Reveal delay={240}>
          <NewsEvents />
        </Reveal>
        <Reveal delay={260}>
          <TestScheduling />
        </Reveal>
        <Reveal delay={300}>
          <VideoSection />
        </Reveal>
        <Reveal delay={340}>
          <Testimonials />
        </Reveal>
      </main>
      <Reveal delay={120}>
        <Footer />
      </Reveal>
    </div>
  );
}

function PageShell() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative z-[120]">
        <Navbar />
      </div>
      <Reveal delay={140}>
        <SectionPage />
      </Reveal>
      <Reveal delay={200}>
        <Footer />
      </Reveal>
    </div>
  );
}

export default function App() {
  const showSupport = true;

  return (
    <>
      {showSupport ? <FloatingSupport /> : null}
      <Routes>
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/page/:slug" element={<PageShell />} />
        <Route path="/forms/staff-login" element={<FormPage variant="staff-login" />} />
        <Route
          path="/forms/online-admission"
          element={<FormPage variant="online-admission" />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
