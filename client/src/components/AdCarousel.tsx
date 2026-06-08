import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { toast } from "sonner";

type AdTone = "light" | "dark" | "event" | "academy";

interface AdItem {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  tone: AdTone;
  image: string;
  imageAlt: string;
  href?: string;
}

const wireframeAsset = (filename: string) => `${import.meta.env.BASE_URL}assets/wireframe/${filename}`;

interface AdCarouselProps {
  label?: string;
  compact?: boolean;
  variant?: "feed" | "rail" | "strip";
  staticMode?: boolean;
}

const ads: AdItem[] = [
  {
    eyebrow: "Sponsored Ad",
    title: "Nike x SPRK 0025 Collection",
    body: "A limited creator-first drop engineered for movement, footage, and launch-day heat.",
    cta: "Shop the exclusive drop",
    tone: "dark",
    image: wireframeAsset("ProtoSPRK0025.png"),
    imageAlt: "Human model wearing the SPRK 0025 collaboration collection before the drop",
    href: "/pavilion",
  },
  {
    eyebrow: "Open Norm Ecosystems · Sponsored Ad",
    title: "SPRK-CON 2027 registration opens soon",
    body: "The Polyculture has spoken and it will not be ignored. 40% off using code: OPENNORM.",
    cta: "Register early",
    tone: "event",
    image: wireframeAsset("home_dance_review.png"),
    imageAlt: "Crowd gathered at a live creator event",
    href: "/pavilion",
  },
  {
    eyebrow: "SPRK*Academy",
    title: "Learn from the best. Surpass the rest.",
    body: "3,000+ tips, tricks, deal structures, and creator-business resources on demand.",
    cta: "Open SPRK*OS tools",
    tone: "academy",
    image: wireframeAsset("clip_citymotion_distinct.png"),
    imageAlt: "Creative team planning content on a wall",
    href: "/os",
  },
  {
    eyebrow: "SPRK*Pavilion · Promoted Ad",
    title: "Authenticity accelerates purchase intent",
    body: "SPRK your realness. SPRK your returns. Access brand-safe escrow and rights tools today.",
    cta: "Access SPRK*Pavilion",
    tone: "light",
    image: wireframeAsset("light_balenciaga_card.png"),
    imageAlt: "Premium fashion retail rack and boutique interior",
    href: "/pavilion",
  },
];

function toneClasses(tone: AdTone) {
  switch (tone) {
    case "dark":
      return "bg-[#1E2235] text-white border-[#1E2235]";
    case "event":
      return "bg-[#F0E8E4] text-[#0A0A0F] border-[#C4A09A]";
    case "academy":
      return "bg-[#0A0A0F] text-white border-[#0A0A0F]";
    default:
      return "bg-white text-[#0A0A0F] border-[#C4A09A]";
  }
}

export default function AdCarousel({ label = "Sponsored Ad", compact = false, variant = "feed", staticMode = false }: AdCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const visibleAd = ads[index];

  const heightClass = useMemo(() => {
    if (variant === "strip") return "min-h-[88px]";
    if (variant === "rail") return compact ? "min-h-[270px]" : "min-h-[340px]";
    return compact ? "min-h-[160px]" : "min-h-[220px]";
  }, [compact, variant]);

  useEffect(() => {
    if (staticMode || paused || dismissed) return;
    const timer = window.setInterval(() => setIndex((prev) => (prev + 1) % ads.length), 4000);
    return () => window.clearInterval(timer);
  }, [paused, dismissed, staticMode]);

  if (dismissed) {
    return (
      <button
        type="button"
        onClick={() => setDismissed(false)}
        className="w-full rounded-2xl border border-dashed border-black/10 bg-[#F5F0EB] px-4 py-6 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[#8E7A8A] transition-colors hover:text-[#0A0A0F]"
      >
        Ad hidden · Restore
      </button>
    );
  }

  const go = (direction: number) => setIndex((prev) => (prev + direction + ads.length) % ads.length);

  const openAd = () => {
    toast.success(`${visibleAd.cta} opened.`);
    if (visibleAd.href) window.location.href = visibleAd.href;
  };

  return (
    <section
      className={`group relative overflow-hidden rounded-2xl border shadow-[0_2px_12px_rgba(0,0,0,0.08)] ${heightClass} ${toneClasses(visibleAd.tone)}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label={label}
    >
      <img src={visibleAd.image} alt={visibleAd.imageAlt} className={`absolute inset-0 h-full w-full ${visibleAd.image.includes("ProtoSPRK0025") ? "object-cover object-center" : "object-cover"}`} />
      <div className={`absolute inset-0 ${visibleAd.tone === "light" || visibleAd.tone === "event" ? "bg-white/72" : "bg-[#0A0A0F]/68"}`} />
      <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-[#FF6B35]/20" />
      <div className="relative z-10 flex h-full min-h-[inherit] flex-col justify-between gap-5 p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] opacity-80">
            <span className="h-2 w-2 rounded-full bg-[#FF6B35]" />
            <span>{visibleAd.eyebrow || label}</span>
          </div>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setDismissed(true);
              toast("Ad hidden for this prototype view.");
            }}
            className="rounded-full bg-white/20 p-1 opacity-0 transition-opacity hover:bg-white/30 group-hover:opacity-100"
            aria-label="Close ad"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
        <button type="button" onClick={openAd} className="text-left">
          <div className="transition-opacity duration-500 ease-in-out">
            <h3 className={`${compact || variant === "strip" ? "text-lg" : "text-2xl"} max-w-xl font-extrabold leading-tight tracking-[-0.03em]`}>
              {visibleAd.title}
            </h3>
            {variant !== "strip" && <p className="mt-2 max-w-xl text-sm font-light leading-relaxed opacity-85">{visibleAd.body}</p>}
          </div>
        </button>
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={openAd}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#0A0A0F] transition-transform hover:-translate-y-0.5"
          >
            {visibleAd.cta} <ExternalLink className="h-3 w-3" />
          </button>
          {!staticMode && (
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => go(-1)} className="rounded-full bg-white/20 p-1.5 hover:bg-white/30" aria-label="Previous ad">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => go(1)} className="rounded-full bg-white/20 p-1.5 hover:bg-white/30" aria-label="Next ad">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
