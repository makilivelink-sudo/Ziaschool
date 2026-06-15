import { founderImage } from '../data/siteData';
import FallbackImage from './FallbackImage';

export default function AboutUs() {
  return (
    <section id="about" className="relative overflow-hidden bg-schoolBlueDark py-16 text-white sm:py-20">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect width="1440" height="900" fill="#143a7b" />
        <path
          d="M0,0 H1440 V0 H0 Z"
          fill="#143a7b"
        />
        <path
          d="M0,72 C160,40 320,28 500,34 C690,40 840,72 1010,78 C1180,84 1296,62 1440,28 L1440,0 L0,0 Z"
          fill="#f4e6c4"
        />
        <path
          d="M0,110 C180,72 370,62 560,74 C760,88 930,132 1100,140 C1240,148 1340,136 1440,100 L1440,900 L0,900 Z"
          fill="#143a7b"
        />
        <path
          d="M0,900 H1440 V846 C1230,806 1060,812 880,832 C660,856 470,892 250,898 C136,902 60,896 0,888 Z"
          fill="#ff1717"
        />
        <path
          d="M0,900 H1440 V874 C1260,838 1070,844 880,858 C650,876 450,908 240,912 C120,914 50,910 0,904 Z"
          fill="#143a7b"
        />
        <path
          d="M0,150 C220,112 420,106 620,124 C810,140 980,176 1150,174 C1280,172 1370,150 1440,118"
          fill="none"
          stroke="#ff1717"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="container-page relative pt-10">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex border-b-2 border-yellow-400 text-lg font-medium text-yellow-400">
              About Us
            </p>

            <h2 className="max-w-3xl text-4xl font-serif font-bold leading-tight tracking-tight text-white sm:text-5xl">
              About Us - Our Founder
            </h2>

            <div className="space-y-6 text-base leading-8 text-white/92 sm:text-[1.1rem]">
              <p className="max-w-3xl">
                Zia Public High School Bhalwal is committed to providing a disciplined, value-driven, and modern
                learning environment for students. Our mission is to shape confident learners who carry strong moral
                character alongside academic excellence.
              </p>
              <p className="max-w-3xl">
                The founder&apos;s vision is reflected in every program: strong foundations in early years, focused
                academic pathways, digital learning opportunities, and a school culture built on respect,
                achievement, and care.
              </p>
            </div>

            <div className="grid gap-4 pt-2 sm:grid-cols-2">
              {['Leadership with vision', 'Student-centered learning', 'Discipline & manners', 'Modern education'].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/10 px-5 py-5 text-lg font-semibold text-white shadow-[0_16px_35px_rgba(0,0,0,0.12)] backdrop-blur"
                  >
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[470px] lg:mr-0">
            <div className="about-orb about-orb-a absolute -left-6 top-20 h-16 w-16 rounded-full bg-[#ffb400] shadow-lg" />
            <div className="about-orb about-orb-b absolute -left-2 bottom-8 h-12 w-12 rounded-full bg-[#ff4d3d]" />
            <div className="about-orb about-orb-c absolute -right-3 bottom-16 h-14 w-14 rounded-full bg-[#ffb400] shadow-lg" />
            <div className="about-orb about-orb-d absolute -right-6 top-24 h-10 w-10 rounded-full bg-[#ffb400]" />

            <div className="relative rounded-full border-[6px] border-[#ff1717] bg-white p-2 shadow-2xl">
              <div className="overflow-hidden rounded-full">
                <FallbackImage
                  src={founderImage.src}
                  originalSrc={founderImage.original}
                  alt="Founder of Zia Public High School"
                  className="aspect-square w-full"
                  imgClassName="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
