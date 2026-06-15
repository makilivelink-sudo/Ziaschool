import { youtubeEmbed } from '../data/siteData';

export default function VideoSection() {
  return (
    <section
      id="video"
      className="relative overflow-hidden py-16 sm:py-20"
      style={{
        background:
          'linear-gradient(135deg, #07162f 0%, #143a7b 45%, #8b1020 100%)',
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,72,72,0.22),transparent_30%)]" />
      <div className="container-page">
        <div className="relative mb-8 text-center text-white">
          <p className="text-xs font-bold uppercase tracking-[0.45em] text-white/80">Video</p>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl" style={{ textShadow: '0 8px 24px rgba(0,0,0,0.25)' }}>
            Our Video
          </h2>
        </div>

        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-white/15 bg-[#07162f]/60 p-3 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-4">
          <div className="aspect-video">
            <iframe
              className="h-full w-full"
              src={youtubeEmbed}
              title="Zia Public High School Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
