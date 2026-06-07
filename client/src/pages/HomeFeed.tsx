import React, { useState } from "react";
import { Link } from "wouter";
import { Bookmark, Heart, MessageCircle, Share2, ShoppingBag, Sparkles, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import AdCarousel from "@/components/AdCarousel";
import ClipsCarousel from "@/components/ClipsCarousel";
import CreatorCarousel from "@/components/CreatorCarousel";
import FeedShell from "@/components/FeedShell";
import { feedPosts, type FeedPost } from "@/data/feedContent";

const tabs = ["For You", "Following", "New", "Top"];

function EngagementBar({ post }: { post?: FeedPost }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <div className="flex flex-wrap items-center gap-2 border-t border-black/5 px-4 py-3 text-xs font-semibold text-[#4A5278]">
      <button onClick={() => toast.success("Upvoted.")} className="rounded-full px-2 py-1 hover:bg-[#F5F0EB]">↑ {post?.likes ?? "842"}</button>
      <button onClick={() => toast("Opening comments…")} className="inline-flex items-center gap-1 rounded-full px-2 py-1 hover:bg-[#F5F0EB]"><MessageCircle className="h-3.5 w-3.5" /> {post?.comments ?? "67"}</button>
      <button onClick={() => { setLiked(!liked); toast.success(liked ? "Like removed." : "Post liked."); }} className={`inline-flex items-center gap-1 rounded-full px-2 py-1 hover:bg-[#F5F0EB] ${liked ? "text-[#CC0055]" : ""}`}><Heart className={`h-3.5 w-3.5 ${liked ? "fill-current" : ""}`} /> {liked ? "Liked" : "Like"}</button>
      <button onClick={() => toast.success("Share link copied.")} className="inline-flex items-center gap-1 rounded-full px-2 py-1 hover:bg-[#F5F0EB]"><Share2 className="h-3.5 w-3.5" /> {post?.shares ?? "Share"}</button>
      <button onClick={() => { setSaved(!saved); toast.success(saved ? "Bookmark removed." : "Bookmarked."); }} className={`ml-auto inline-flex items-center gap-1 rounded-full px-2 py-1 hover:bg-[#F5F0EB] ${saved ? "text-[#FF6B35]" : ""}`}><Bookmark className={`h-3.5 w-3.5 ${saved ? "fill-current" : ""}`} /> Save</button>
    </div>
  );
}

function FeaturedPost() {
  const post = feedPosts[0];
  return (
    <article className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
      <Link href={`/article/${post.id}`}>
        <button className="group relative flex min-h-[340px] w-full items-end overflow-hidden bg-[#1E2235] text-left text-white md:min-h-[430px]">
          <img src={post.image} alt={post.imageAlt} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F]/88 via-[#0A0A0F]/45 to-[#FF6B35]/20" />
          <div className="absolute right-6 top-8 flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/85 backdrop-blur-sm"><Sparkles className="h-12 w-12" /></div>
          <div className="relative z-10 max-w-xl p-6 md:p-8">
            <span className="mb-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#F0E8E4]">{post.community} · {post.time}</span>
            <h1 className="text-4xl font-extrabold uppercase leading-[0.92] tracking-[-0.05em] md:text-6xl">SPRK 0025 Collection Limited. Exclusive. Yours.</h1>
            <p className="mt-4 max-w-lg text-sm font-light leading-relaxed text-white/78">{post.deck}</p>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.1em] text-[#0A0A0F]"><ShoppingBag className="h-4 w-4" /> Read + shop the drop →</span>
          </div>
        </button>
      </Link>
      <EngagementBar post={post} />
    </article>
  );
}

function FeedTabs() {
  const [active, setActive] = useState("For You");
  return (
    <div className="rounded-t-2xl border border-b-0 border-black/5 bg-white p-2 shadow-sm">
      <div className="flex items-center gap-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => { setActive(tab); toast(`Showing ${tab} feed.`); }} className={`rounded-full px-5 py-2 text-sm font-bold transition-colors ${active === tab ? "bg-[#0A0A0F] text-white" : "text-[#4A5278] hover:bg-[#F5F0EB] hover:text-[#0A0A0F]"}`}>
            {tab}
          </button>
        ))}
        <button onClick={() => toast("Sort menu opened.")} className="ml-auto rounded-full border border-black/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#4A5278] hover:bg-[#F5F0EB]">Sort</button>
      </div>
    </div>
  );
}

function PostCard({ post, compact = false }: { post: FeedPost; compact?: boolean }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-transform hover:-translate-y-1">
      <Link href={`/article/${post.id}`}>
        <button className="w-full text-left">
          <div className={`relative overflow-hidden bg-[#1E2235] ${compact ? "aspect-[4/3]" : "aspect-video"}`}>
            <img src={post.image} alt={post.imageAlt} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/70 via-transparent to-transparent" />
            <div className="absolute left-3 top-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#0A0A0F]">{post.contentType}</span>
              {post.sponsored && <span className="rounded-full bg-[#FF6B35] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-white">Sponsored</span>}
            </div>
          </div>
          <div className="p-4">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-[#8E7A8A]"><span className="h-8 w-8 overflow-hidden rounded-full bg-[#F5F0EB]"><img src={post.image} alt="" className="h-full w-full object-cover" /></span>{post.community} · {post.time}</div>
            <h2 className={`${compact ? "text-lg" : "text-2xl"} font-extrabold leading-tight tracking-[-0.03em] text-[#0A0A0F]`}>{post.title}</h2>
            <p className="mt-2 line-clamp-2 text-sm font-light leading-relaxed text-[#4A5278]">{post.deck}</p>
            <div className="mt-4 inline-flex rounded-full bg-[#F5F0EB] px-3 py-1.5 text-xs font-bold text-[#0A0A0F]">Open article template →</div>
          </div>
        </button>
      </Link>
      <EngagementBar post={post} />
    </article>
  );
}

function DesignPromo() {
  return (
    <article className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
      <div className="grid gap-4 p-5 md:grid-cols-[1fr_220px] md:items-center">
        <div>
          <span className="label-caps text-[#8E7A8A]">SPRK Studio Systems</span>
          <h2 className="mt-2 text-4xl font-extrabold leading-none tracking-[-0.05em] text-[#0A0A0F]">Transparency by design.</h2>
          <p className="mt-3 text-sm font-light leading-relaxed text-[#4A5278]">A premium paper-field interface for creators who want ownership, visibility, and clean collaboration lanes.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href="/os"><button className="rounded-full bg-[#0A0A0F] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-white hover:bg-[#1E2235]">Open SPRK*OS →</button></Link>
            <Link href="/pavilion"><button className="rounded-full border border-black/10 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-[#0A0A0F] hover:bg-[#F5F0EB]">Pavilion landing →</button></Link>
          </div>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-[28px] bg-[#F0E8E4]"><img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=700&q=85" alt="Creative team using content editor tools" className="h-full w-full object-cover" /></div>
      </div>
    </article>
  );
}

export default function HomeFeed() {
  const primaryPosts = feedPosts.slice(1, 5);
  const secondaryPosts = feedPosts.slice(5);

  return (
    <FeedShell active="home" railMode="home">
      <div className="mx-auto max-w-[720px] space-y-4">
        <FeedTabs />
        <FeaturedPost />
        <AdCarousel label="Sponsored Ad" />
        <CreatorCarousel />
        <div className="grid gap-4 md:grid-cols-2">
          {primaryPosts.map((post) => <PostCard key={post.id} post={post} compact />)}
        </div>
        <AdCarousel label="Open Norm Ecosystems · Sponsored Ad" />
        <div id="clips"><ClipsCarousel /></div>
        <DesignPromo />
        <div className="space-y-4">
          {secondaryPosts.map((post, index) => (
            <React.Fragment key={post.id}>
              <PostCard post={post} />
              {index === 2 && <AdCarousel label="SPRK*Pavilion · Promoted Ad" compact />}
            </React.Fragment>
          ))}
        </div>
        <div className="rounded-2xl border border-black/5 bg-white p-5 text-center shadow-sm">
          <TrendingUp className="mx-auto mb-3 h-5 w-5 text-[#FF6B35]" />
          <button onClick={() => toast("Loading more high-signal posts…")} className="rounded-full border border-black/10 px-8 py-3 text-sm font-bold text-[#0A0A0F] hover:bg-[#0A0A0F] hover:text-white">Load More</button>
        </div>
      </div>
    </FeedShell>
  );
}
