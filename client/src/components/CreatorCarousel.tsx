import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { toast } from "sonner";

const wireframeAsset = (filename: string) => `${import.meta.env.BASE_URL}assets/wireframe/${filename}`;

const creators = [
  { handle: "@aria_valk", name: "Aria Valk", category: "Techwear styling · SPRK 0025 fit checks", image: wireframeAsset("ProtoSPRK0025.png"), metric: "1.4M reach", pronouns: "she/her" },
  { handle: "@kingmyron", name: "Myron Sterling", category: "Gaming analysis · live boss clears", image: wireframeAsset("home_crimson_dawn_game_stream.png"), metric: "1.2M reach", pronouns: "he/him" },
  { handle: "@lunadreams", name: "Luna Dreams", category: "Beauty storytelling · soft glam", image: wireframeAsset("home_makeup_artist_live.png"), metric: "980K reach", pronouns: "she/they" },
  { handle: "@itsdylan.exe", name: "Dylan Park", category: "Open-norm fashion · studio design", image: wireframeAsset("home_trans_fashion_designer.png"), metric: "760K reach", pronouns: "they/he" },
  { handle: "@mel.notes", name: "Mel Reyes", category: "Film essays · community watchlists", image: wireframeAsset("home_michael_movie_review.png"), metric: "540K reach", pronouns: "she/her" },
  { handle: "@shotbykai", name: "Kai Baptiste", category: "Street portraiture · fashion drops", image: wireframeAsset("home_balenciaga_hoodie_drop.png"), metric: "430K reach", pronouns: "he/they" },
  { handle: "@glowbyimani", name: "Imani Bello", category: "Make-up artistry · inclusive complexion", image: wireframeAsset("clip_makeup_artist.png"), metric: "390K reach", pronouns: "she/her" },
  { handle: "@solsundays", name: "Sol Alvarez", category: "Indie soul · first EP rollout", image: wireframeAsset("clip_musician_human.png"), metric: "118K reach", pronouns: "they/them" },
  { handle: "@momo_makes", name: "Yuki Tanaka", category: "Cosplay fabrication · convention care", image: wireframeAsset("home_black_woman_cosplay.png"), metric: "680K reach", pronouns: "she/her" },
];

export default function CreatorCarousel() {
  const scroller = useRef<HTMLDivElement>(null);
  const [following, setFollowing] = useState<Record<string, boolean>>({ "@aria_valk": true });

  const scroll = (direction: number) => {
    scroller.current?.scrollBy({ left: direction * 260, behavior: "smooth" });
  };

  return (
    <section className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <span className="label-caps text-[#FF6B35]">Featured creators to follow</span>
          <h2 className="mt-1 text-xl font-extrabold tracking-[-0.03em] text-[#0A0A0F]">Creators moving culture</h2>
        </div>
        <div className="flex gap-1.5">
          <button type="button" onClick={() => scroll(-1)} className="rounded-full border border-black/10 p-2 hover:bg-[#F5F0EB]" aria-label="Previous creators">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => scroll(1)} className="rounded-full border border-black/10 p-2 hover:bg-[#F5F0EB]" aria-label="Next creators">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div ref={scroller} className="flex snap-x gap-3 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {creators.map((creator) => {
          const isFollowing = following[creator.handle];
          return (
            <article key={creator.handle} className="min-w-[166px] snap-start rounded-2xl border border-black/5 bg-[#F5F0EB] p-4 text-center transition-transform hover:-translate-y-1">
              <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-white shadow-sm ring-1 ring-black/10">
                <img src={creator.image} alt={`${creator.name} creator portrait`} className="h-full w-full object-cover object-center" />
              </div>
              <span className="mt-2 inline-flex rounded-full border border-black/10 bg-white/85 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.09em] text-[#0A0A0F]">{creator.pronouns}</span>
              <div className="pt-2">
                <h3 className="text-sm font-extrabold text-[#0A0A0F]">{creator.handle}</h3>
                <p className="mt-1 text-xs font-light leading-snug text-[#4A5278]">{creator.category}</p>
                <p className="mt-2 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#FF6B35]">{creator.metric}</p>
                <button
                  type="button"
                  onClick={() => {
                    setFollowing((prev) => ({ ...prev, [creator.handle]: !prev[creator.handle] }));
                    toast.success(`${isFollowing ? "Unfollowed" : "Following"} ${creator.handle}`);
                  }}
                  className={`mt-4 inline-flex items-center gap-1 rounded-full px-4 py-2 text-xs font-bold transition-colors ${isFollowing ? "bg-white text-[#4A5278]" : "bg-[#0A0A0F] text-white hover:bg-[#1E2235]"}`}
                >
                  {!isFollowing && <Plus className="h-3 w-3" />}
                  {isFollowing ? "Following" : "Follow"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
