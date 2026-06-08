import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Heart, MessageCircle, Play, Share2, X } from "lucide-react";
import { toast } from "sonner";

const wireframeAsset = (filename: string) => `${import.meta.env.BASE_URL}assets/wireframe/${filename}`;

const clips = [
  { title: "Drop-day fit check", channel: "↑ /FashionDrops · 34m ago", stat: "8.7K", image: wireframeAsset("clip_fashiondrops_distinct.png"), note: "Streetwear creator styling a high-contrast drop look." },
  { title: "Skate line after work", channel: "↑ /CityMotion · 1h ago", stat: "5.2K", image: wireframeAsset("clip_citymotion_distinct.png"), note: "A creator turns a neighborhood curb into a daily practice ritual." },
  { title: "Soft-glam shade match", channel: "↑ /BeautyLab · 2h ago", stat: "9.4K", image: wireframeAsset("clip_beautylab_distinct.png"), note: "Make-up artist explains undertones, lighting, and trust." },
  { title: "Pickup run, full joy", channel: "↑ /HoopCulture · 3h ago", stat: "4.8K", image: wireframeAsset("clip_hoopculture_distinct.png"), note: "Everyday athlete, public court, real celebration." },
  { title: "Mascot dance break", channel: "↑ /CityMotion · 5h ago", stat: "3.1K", image: wireframeAsset("bring_in_the_katz_line_dance_preview.png"), note: "A bright, funny street clip where a creator and mascot turn the sidewalk into a tiny parade." },
  { title: "New hook from the booth", channel: "↑ /NewMusicRoom · 6h ago", stat: "6.6K", image: wireframeAsset("clip_musician_human.png"), note: "Up-and-coming musician in process, not just a microphone." },
  { title: "Cosplay reveal with repair kit", channel: "↑ /OpenNorm · 7h ago", stat: "7.9K", image: wireframeAsset("home_black_woman_cosplay.png"), note: "A Black woman cosplayer foregrounds costume labor, repair, and expression." },
  { title: "Waterfall reset walk", channel: "↑ /OutsideTime · 9h ago", stat: "2.8K", image: wireframeAsset("clip_waterfall.png"), note: "A nature clip that keeps the feed's lifestyle range open." },
];

export default function ClipsCarousel() {
  const scroller = useRef<HTMLDivElement>(null);
  const [activeClip, setActiveClip] = useState<(typeof clips)[number] | null>(null);

  const scroll = (direction: number) => scroller.current?.scrollBy({ left: direction * 260, behavior: "smooth" });

  return (
    <section className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <span className="label-caps text-[#FF6B35]">Trending clips</span>
          <h2 className="mt-1 text-xl font-extrabold tracking-[-0.03em] text-[#0A0A0F]">Shorts with signal</h2>
        </div>
        <div className="flex gap-1.5">
          <button type="button" onClick={() => scroll(-1)} className="rounded-full border border-black/10 p-2 hover:bg-[#F5F0EB]" aria-label="Previous clips">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => scroll(1)} className="rounded-full border border-black/10 p-2 hover:bg-[#F5F0EB]" aria-label="Next clips">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div ref={scroller} className="flex snap-x gap-3 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {clips.map((clip) => (
          <article key={clip.title} className="min-w-[170px] snap-start overflow-hidden rounded-2xl border border-black/5 bg-[#F5F0EB]">
            <button type="button" onClick={() => setActiveClip(clip)} className="group relative flex aspect-[9/14] w-full items-center justify-center overflow-hidden bg-[#1E2235]">
              <img src={clip.image} alt={`${clip.title} thumbnail`} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/78 via-[#0A0A0F]/10 to-transparent" />
              <span className="absolute inset-3 rounded-xl border border-white/25" />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#0A0A0F] transition-transform group-hover:scale-110">
                <Play className="ml-0.5 h-5 w-5 fill-current" />
              </span>
            </button>
            <div className="p-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-[#CC0055]">{clip.channel}</p>
              <h3 className="mt-1 text-sm font-extrabold leading-tight text-[#0A0A0F]">{clip.title}</h3>
              <p className="mt-1 line-clamp-2 text-[11px] font-light leading-snug text-[#4A5278]">{clip.note}</p>
              <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-[#4A5278]">
                <button type="button" onClick={() => toast.success("Clip liked.")} className="inline-flex items-center gap-1 hover:text-[#CC0055]"><Heart className="h-3.5 w-3.5" /> {clip.stat}</button>
                <button type="button" onClick={() => toast("Opening comments…")} className="inline-flex items-center gap-1 hover:text-[#0A0A0F]"><MessageCircle className="h-3.5 w-3.5" /> 84</button>
                <button type="button" onClick={() => toast.success("Clip share link copied.")} className="hover:text-[#0A0A0F]" aria-label="Share clip"><Share2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {activeClip && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0A0A0F]/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-4 shadow-2xl">
            <button type="button" onClick={() => setActiveClip(null)} className="absolute right-4 top-4 z-10 rounded-full bg-white/85 p-2 text-[#0A0A0F]" aria-label="Close preview">
              <X className="h-4 w-4" />
            </button>
            <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-[#1E2235] text-white">
              <img src={activeClip.image} alt={`${activeClip.title} preview`} className="absolute inset-0 h-full w-full object-cover" />
              <span className="absolute inset-0 bg-[#0A0A0F]/45" />
              <Play className="relative h-14 w-14 fill-current" />
            </div>
            <h3 className="mt-4 text-2xl font-extrabold tracking-[-0.03em] text-[#0A0A0F]">{activeClip.title}</h3>
            <p className="mt-1 text-sm font-light text-[#4A5278]">{activeClip.note} A production build would mount the native SPRK clip player here.</p>
          </div>
        </div>
      )}
    </section>
  );
}
