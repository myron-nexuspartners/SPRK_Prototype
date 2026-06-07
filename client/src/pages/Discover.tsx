import React, { useState } from "react";
import { Link } from "wouter";
import { 
  Sparkles, MessageSquare, Share2, Flame, ArrowUp, ArrowDown, 
  Search, Compass, Plus, Award, Star, Info, X, ExternalLink, 
  Play, ShieldCheck, DollarSign, Eye, AlertCircle, FileText
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import SharedLayout from "@/components/SharedLayout";

export default function Discover() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [postLikes, setPostLikes] = useState<Record<number, number>>({
    1: 48200,
    2: 36000,
    3: 12500,
    4: 18400,
    5: 8900,
    6: 22100,
    7: 5400,
    8: 14200,
    9: 3100,
    10: 9800
  });
  const [userVote, setUserVote] = useState<Record<number, "up" | "down" | null>>({});

  const handleVote = (id: number, direction: "up" | "down", e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const currentVote = userVote[id];
    let diff = 0;

    if (currentVote === direction) {
      diff = direction === "up" ? -1 : 1;
      setUserVote(prev => ({ ...prev, [id]: null }));
    } else {
      if (currentVote === null || currentVote === undefined) {
        diff = direction === "up" ? 1 : -1;
      } else {
        diff = direction === "up" ? 2 : -2;
      }
      setUserVote(prev => ({ ...prev, [id]: direction }));
    }

    setPostLikes(prev => ({ ...prev, [id]: prev[id] + diff }));
  };

  const handleShare = (title: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    toast.success(`Copied link to: "${title}"`);
  };

  // Grounded recent posts (<14 days old), including ads, AI indicator tags, and content types
  const feedPosts = [
    {
      id: 1,
      author: "streetwear_drop",
      community: "✦/FashionDrops",
      time: "2 hours ago",
      title: "SPRK x Balenciaga drop collection is officially live! First 100 to share receive exclusive drop cards today. NGL click now. FRFR.",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
      comments: 2100,
      shares: 16000,
      category: "fashion",
      sponsored: true,
      contentType: "article",
      isAiAssisted: true,
      adDetails: {
        cta: "Claim Drop Card",
        url: "https://balenciaga.com",
        sponsorName: "Balenciaga"
      },
      contentBody: "Balenciaga and SPRK have officially unlocked the next generation of streetwear activation. This drop features smart-contract backed redemption cards that grant holders priority access to physical garments. Read on to discover how to link your yourSPRK.com wallet and secure your placement before the public tier launches in 24 hours.",
      creatorBio: {
        name: "Aria 'Valkyrie' Chen",
        handle: "@aria_valk",
        metric: "450K Reach",
        survey: { culture: "Cyberpunk / Techwear", vibe: "Aesthetic", focus: "Sneaker Drops" }
      }
    },
    {
      id: 2,
      author: "ingaming",
      community: "✦/PCGaming",
      time: "4 hours ago",
      title: "Just beat the Elden Ring GOTY DLC blindfolded. My wife isn't impressed... but the stream chat went wild.",
      image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
      comments: 902,
      shares: 88,
      category: "gaming",
      contentType: "video",
      isAiAssisted: false,
      contentBody: "It took 14 hours, 3 broken controllers, and an absolute miracle, but the blindfolded Elden Ring speedrun is officially complete. Check out the full video highlight showing the exact 10-second mark where interactive polls determined the boss route. Big thanks to the community for voting live!",
      creatorBio: {
        name: "Myron 'KingMyron' Sterling",
        handle: "@kingmyron",
        metric: "1.2M Reach",
        survey: { culture: "Hardcore Competitive", vibe: "High-Octane", focus: "FPS / Action RPGs" }
      }
    },
    {
      id: 3,
      author: "cosplay_nexus",
      community: "✦/AnimeExpo",
      time: "1 day ago",
      title: "Full cosplay showcase of my custom Cyberpunk netrunner build from Momo Con 2026. Process breakdown inside!",
      image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
      comments: 407,
      shares: 318,
      category: "anime",
      contentType: "shorts",
      isAiAssisted: false,
      contentBody: "Here is the step-by-step assembly of the custom illuminated fiber-optic panels for the netrunner suit. Total cost was under $200, fully integrated with a custom Arduino controller to synchronize with live streaming events. Let me know what you want to see built next!",
      creatorBio: {
        name: "Yuki 'Momo_Cos' Tanaka",
        handle: "@yuki_momo",
        metric: "680K Reach",
        survey: { culture: "Cosplay Fabrication", vibe: "Creative", focus: "Cyberpunk Builds" }
      }
    },
    {
      id: 4,
      author: "sci_fi_vault",
      community: "✦/SciFiMovies",
      time: "2 days ago",
      title: "Blade Runner 2099 casting rumors and release schedule leak. What does this mean for the franchise timeline?",
      image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=800&q=80",
      comments: 118,
      shares: 46,
      category: "comics",
      contentType: "article",
      isAiAssisted: true,
      contentBody: "Leaked schedules suggest the upcoming series will establish a brand new cyber-detective agency in the heart of Los Angeles. With casting rumors pointing to high-profile indie stars, this could mark a return to the moody, analytical atmosphere of the original masterpiece. Read our full timeline breakdown inside.",
      creatorBio: {
        name: "Marcus 'SciFi_Guy' Vance",
        handle: "@scifi_vance",
        metric: "820K Reach",
        survey: { culture: "Lore & Theory", vibe: "Deep-Dive", focus: "Blade Runner Franchise" }
      }
    },
    {
      id: 5,
      author: "razer_hq",
      community: "$/GamingHardware",
      time: "3 days ago",
      title: "Meet the new Razer Viper V3 Pro. Ultralight wireless performance optimized for elite competitive gaming. Get 10% off with code SPRK10.",
      image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
      comments: 480,
      shares: 1200,
      category: "gaming",
      sponsored: true,
      contentType: "video",
      isAiAssisted: false,
      adDetails: {
        cta: "Shop Razer Pro",
        url: "https://razer.com",
        sponsorName: "Razer"
      },
      contentBody: "Designed in collaboration with world-class esports athletes, the Razer Viper V3 Pro features a flawless 8000Hz polling rate and a featherlight 54g design. Watch our interactive video demonstration showing the exact latency comparison against previous generations.",
      creatorBio: {
        name: "Razer Gaming",
        handle: "@razer",
        metric: "Global Sponsor",
        survey: { culture: "Esports Hardware", vibe: "Professional", focus: "Pro Mice & Keyboards" }
      }
    },
    {
      id: 6,
      author: "hiphop_central",
      community: "✦/HipHopVibe",
      time: "4 days ago",
      title: "The Death of the 16-Bar Verse: How short-form video algorithms are radically reshaping modern song structures.",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
      comments: 310,
      shares: 245,
      category: "fashion",
      contentType: "article",
      isAiAssisted: true,
      contentBody: "With the average listener attention span shrinking to under 15 seconds, producers are ditching the classic intro-verse-chorus-verse structure in favor of immediate, hook-first designs. This deep-dive narrative explores how hip-hop is adapting to survive on the-SPRK and other discovery feeds.",
      creatorBio: {
        name: "Metro Synth",
        handle: "@metro_synth",
        metric: "320K Reach",
        survey: { culture: "Hip-Hop Production", vibe: "Analytical", focus: "Music Tech & Trends" }
      }
    },
    {
      id: 7,
      author: "giga_chuckle",
      community: "✦/Humor",
      time: "5 days ago",
      title: "When the brand asks for 'organic TikTok vibes' but hands you a 45-page PDF of strict script guidelines.",
      image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&w=800&q=80",
      comments: 188,
      shares: 94,
      category: "comics",
      contentType: "shorts",
      isAiAssisted: false,
      contentBody: "We've all been there. Brand: 'Just make it feel like a casual vlog!' Also Brand: 'Please make sure to say the phrase 'integrated lifestyle optimization paradigm' exactly three times in the first 4 seconds.' Just let creators create!",
      creatorBio: {
        name: "Alex 'Chuckle' Miller",
        handle: "@giga_chuckle",
        metric: "180K Reach",
        survey: { culture: "Creator Comedy", vibe: "Satirical", focus: "Industry Memes" }
      }
    },
    {
      id: 8,
      author: "sneaker_head",
      community: "✦/FashionDrops",
      time: "6 days ago",
      title: "RTFKT x Nike Clone X Sneaker Drops: Secondary market prices surge after physical redemption window closes.",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      comments: 290,
      shares: 112,
      category: "fashion",
      contentType: "article",
      isAiAssisted: true,
      contentBody: "Now that the physical redemption window is officially locked, the rare physical sneaker models have become premium collector's items. In this article, we track the sales history and discuss the long-term viability of hybrid physical-digital assets in street culture.",
      creatorBio: {
        name: "Marcus 'Sole' Vance",
        handle: "@sneaker_head",
        metric: "510K Reach",
        survey: { culture: "Sneaker Investing", vibe: "Informative", focus: "Web3 Streetwear" }
      }
    },
    {
      id: 9,
      author: "concept_craft",
      community: "✦/SciFiAnticipation",
      time: "8 days ago",
      title: "Neo-Tokyo 2099 Skylines: A comprehensive matte painting study using custom neural shaders.",
      image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
      comments: 72,
      shares: 41,
      category: "comics",
      contentType: "shorts",
      isAiAssisted: true,
      contentBody: "A breakdown of the layer composition for my latest sci-fi world-building project. Using neural shaders inside SPRK-OS, I was able to generate dynamic rain reflections on neon-drenched streets in real-time. Check out the workflow tutorial!",
      creatorBio: {
        name: "Sarah 'Concept' Chen",
        handle: "@concept_craft",
        metric: "240K Reach",
        survey: { culture: "Sci-Fi Concept Art", vibe: "Educational", focus: "Neural Shading" }
      }
    },
    {
      id: 10,
      author: "dev_struggles",
      community: "✦/Humor",
      time: "10 days ago",
      title: "I asked SPRK-OS to optimize my code pipeline and it sent me a notification to touch grass.",
      image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80",
      comments: 420,
      shares: 310,
      category: "gaming",
      contentType: "article",
      isAiAssisted: false,
      contentBody: "I spent 6 hours trying to refactor my rendering loops. I finally ran the SPRK-OS diagnostic agent, and the very first recommendation was: 'Your screen time is 14 hours today. Touch grass and sleep. The loop is fine.' AI is getting too real.",
      creatorBio: {
        name: "Dev struggles",
        handle: "@dev_struggles",
        metric: "95K Reach",
        survey: { culture: "Tech Humor", vibe: "Sarcastic", focus: "Developer Lifestyle" }
      }
    }
  ];

  const filteredPosts = feedPosts.filter((post) => {
    const matchesCategory = activeCategory === "all" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.community.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SharedLayout activeSite="discover">
      <div className="bg-[#F5F0EB]/30 min-h-screen py-8 relative overflow-x-hidden">
        <div className="container max-w-6xl">
          
          {/* Main Grid Wrapper */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT SIDEBAR COLUMN - Non-sticky grid column track */}
            <aside className="lg:col-span-3 w-full">
              <div className="sticky top-24 flex flex-col gap-6">
                
                {/* Custom Brand Communities */}
                <div className="bg-white border border-black/5 rounded-2xl p-4 shadow-sm">
                  <div className="flex flex-col gap-1">
                    {[
                      { id: "all", label: "Discovery Feed", icon: Compass },
                      { id: "gaming", label: "✦/PCGaming", icon: Sparkles },
                      { id: "fashion", label: "✦/FashionDrops", icon: Flame },
                      { id: "anime", label: "✦/AnimeExpo", icon: Star },
                      { id: "comics", label: "✦/SciFiMovies", icon: Award }
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveCategory(item.id)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                            activeCategory === item.id
                              ? "bg-[#F5F0EB] text-[#0A0A0F]"
                              : "text-[#4A5278] hover:bg-[#F5F0EB]/40 hover:text-[#0A0A0F]"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className={`w-4 h-4 ${activeCategory === item.id ? "text-[#FF6B35]" : ""}`} />
                            <span>{item.label}</span>
                          </div>
                          {item.id === "fashion" && (
                            <Badge className="bg-[#FF6B35] text-white text-[9px] px-1.5 py-0.5 rounded-full font-extrabold">HOT</Badge>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Ad-Placement: Sidebar Native Banner */}
                <div className="bg-white border border-black/5 rounded-2xl p-4 shadow-sm overflow-hidden relative">
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-[#0A0A0F]/10 text-[#0A0A0F] border-transparent text-[8px] font-bold uppercase rounded-full">Sponsor</Badge>
                  </div>
                  <span className="text-[9px] font-extrabold text-[#FF6B35] uppercase tracking-wider block mb-1">Year 1 Commerce Partner</span>
                  <h5 className="text-xs font-bold text-[#0A0A0F] mb-2 leading-snug">Design, build, and deploy your brand directly on the-SPRK.</h5>
                  <Link href="/pavilion">
                    <button className="w-full bg-[#0A0A0F] hover:bg-[#FF6B35] text-white font-bold text-[10px] uppercase tracking-wider py-2.5 rounded-xl transition-colors">
                      Join Pavilion Marketplace
                    </button>
                  </Link>
                </div>

              </div>
            </aside>

            {/* CENTER COLUMN - Main Discovery Feed */}
            <main className="lg:col-span-6 w-full flex flex-col gap-4">
              
              {/* Search and Sort Filter Bar */}
              <div className="bg-white border border-black/5 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E7A8A]" />
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search the-SPRK feed..."
                    className="pl-10 bg-[#F5F0EB]/50 border border-black/5 rounded-full h-10 text-xs font-medium focus:ring-[#FF6B35]"
                  />
                </div>
                <div className="flex gap-1.5 w-full sm:w-auto">
                  <Badge className="bg-[#F5F0EB] text-[#0A0A0F] border border-black/5 rounded-full px-3 py-1 text-xs font-bold uppercase cursor-pointer">
                    Best
                  </Badge>
                  <Badge className="bg-transparent text-[#4A5278] hover:bg-[#F5F0EB]/50 rounded-full px-3 py-1 text-xs font-bold uppercase cursor-pointer">
                    New
                  </Badge>
                  <Badge className="bg-transparent text-[#4A5278] hover:bg-[#F5F0EB]/50 rounded-full px-3 py-1 text-xs font-bold uppercase cursor-pointer">
                    Hot
                  </Badge>
                </div>
              </div>

              {/* Feed Grid */}
              {filteredPosts.length === 0 ? (
                <div className="bg-white border border-black/5 rounded-2xl p-12 text-center shadow-sm">
                  <h4 className="font-bold text-[#0A0A0F] mb-1">No posts found</h4>
                  <p className="text-xs text-[#4A5278]">Try selecting another category or refining your search keywords.</p>
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <div 
                    key={post.id} 
                    onClick={() => {
                      setSelectedPost(post);
                      toast.success(`Opening content drawer for: "${post.title.substring(0, 30)}..."`);
                    }}
                    className={`bg-white border border-black/5 rounded-2xl shadow-sm flex overflow-hidden hover:border-black/15 transition-all cursor-pointer ${
                      post.sponsored ? "border-l-4 border-l-[#FF6B35]" : ""
                    }`}
                  >
                    
                    {/* Upvote Panel */}
                    <div className="bg-[#F5F0EB]/30 w-12 flex flex-col items-center py-4 gap-1 border-r border-black/5 shrink-0">
                      <button
                        onClick={(e) => handleVote(post.id, "up", e)}
                        className={`p-1 rounded hover:bg-[#F5F0EB] transition-colors ${userVote[post.id] === "up" ? "text-[#FF6B35]" : "text-[#4A5278]"}`}
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <span className="text-xs font-extrabold text-[#0A0A0F]">
                        {postLikes[post.id] >= 1000 ? `${(postLikes[post.id] / 1000).toFixed(1)}k` : postLikes[post.id]}
                      </span>
                      <button
                        onClick={(e) => handleVote(post.id, "down", e)}
                        className={`p-1 rounded hover:bg-[#F5F0EB] transition-colors ${userVote[post.id] === "down" ? "text-[#CC0055]" : "text-[#4A5278]"}`}
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 p-5 flex flex-col gap-3 min-w-0">
                      
                      {/* Post Header Meta */}
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-[#0A0A0F] font-extrabold truncate">{post.community}</span>
                          <span className="text-black/20 shrink-0">•</span>
                          
                          {/* AI Assisted Indicator badge */}
                          <div className="flex items-center gap-1 min-w-0">
                            <span className="text-[#8E7A8A] truncate">u/{post.author}</span>
                            {post.isAiAssisted && (
                              <div 
                                className="inline-flex items-center justify-center shrink-0 w-4 h-4 bg-gradient-to-br from-[#FF6B35] to-[#E8003D] text-white rounded-full animate-spin-slow cursor-help"
                                title="SPRK-AI Assisted Content"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toast.info("SPRK-AI assisted with this human-specific content. Optimized via SPRK-OS.");
                                }}
                              >
                                <span className="text-[9px] font-bold">✦</span>
                              </div>
                            )}
                          </div>

                          <span className="text-black/20 shrink-0">•</span>
                          <span className="text-[#8E7A8A] shrink-0">{post.time}</span>
                        </div>
                        
                        {post.sponsored && (
                          <Badge className="bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/20 text-[8px] font-extrabold uppercase rounded-full shrink-0">
                            Sponsor Drop
                          </Badge>
                        )}
                      </div>

                      {/* Post Title */}
                      <h3 className="text-sm font-bold text-[#0A0A0F] leading-snug">
                        {post.title}
                      </h3>

                      {/* Post Media Image */}
                      {post.image && (
                        <div className="rounded-xl overflow-hidden border border-black/5 aspect-video bg-[#F5F0EB] relative">
                          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                          
                          {/* Content Type overlay indicator */}
                          <div className="absolute top-2.5 right-2.5 bg-black/60 text-white text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                            {post.contentType}
                          </div>
                        </div>
                      )}

                      {/* Post Footer Action Buttons */}
                      <div className="flex items-center gap-4 mt-2 border-t border-black/5 pt-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPost(post);
                          }}
                          className="flex items-center gap-1.5 text-xs font-bold text-[#4A5278] hover:text-[#0A0A0F] transition-colors"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>{post.comments} Comments</span>
                        </button>
                        <button
                          onClick={(e) => handleShare(post.title, e)}
                          className="flex items-center gap-1.5 text-xs font-bold text-[#4A5278] hover:text-[#0A0A0F] transition-colors"
                        >
                          <Share2 className="w-4 h-4" />
                          <span>Share</span>
                        </button>
                      </div>

                    </div>

                  </div>
                ))
              )}
            </main>

            {/* RIGHT SIDEBAR COLUMN - Non-sticky grid track */}
            <aside className="lg:col-span-3 w-full">
              <div className="sticky top-24 flex flex-col gap-6">
                
                {/* Trending Communities */}
                <div className="bg-white border border-black/5 rounded-2xl p-5 shadow-sm">
                  <h4 className="text-xs font-bold text-[#0A0A0F] uppercase tracking-wider mb-4 border-b border-black/5 pb-2">Trending Sparks</h4>
                  <div className="flex flex-col gap-3">
                    {[
                      { name: "✦/FashionDrops", members: "128k creators", growth: "+12.4%" },
                      { name: "✦/PCGaming", members: "340k players", growth: "+8.2%" },
                      { name: "✦/AnimeExpo", members: "95k artists", growth: "+15.0%" },
                      { name: "✦/SciFiMovies", members: "62k critics", growth: "+4.5%" }
                    ].map((c, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-[#0A0A0F] block">{c.name}</span>
                          <span className="text-[#8E7A8A] block mt-0.5">{c.members}</span>
                        </div>
                        <span className="text-[#FF6B35] font-extrabold">{c.growth}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Creator Resources */}
                <div className="bg-white border border-black/5 rounded-2xl p-5 shadow-sm">
                  <h4 className="text-xs font-bold text-[#0A0A0F] uppercase tracking-wider mb-4 border-b border-black/5 pb-2">Creator Resources</h4>
                  <p className="text-xs text-[#4A5278] leading-relaxed mb-4">
                    Want to build interactive hook campaigns, deployment overlays, or secure brand escrow smart contracts?
                  </p>
                  <Link href="/os">
                    <button className="w-full bg-[#0A0A0F] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-full hover:bg-[#1E2235] transition-colors">
                      Open SPRK-OS Studio
                    </button>
                  </Link>
                </div>
              </div>
            </aside>

          </div>

        </div>
      </div>

      {/* ADAPTIVE CONTENT DETAIL VIEW DRAWER */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end">
          <div className="bg-white w-full max-w-2xl h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 relative">
            
            {/* Close button */}
            <button 
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 left-4 p-2 bg-white/80 backdrop-blur-sm rounded-full border border-black/5 hover:bg-[#F5F0EB] transition-all z-10"
            >
              <X className="w-4 h-4 text-[#0A0A0F]" />
            </button>

            {/* Scrollable Drawer Content */}
            <div className="flex-1 overflow-y-auto p-6 lg:p-8">
              
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-black/5 pb-4 mb-6 mt-6">
                <div className="flex items-center gap-2">
                  <Badge className="bg-[#F5F0EB] text-[#0A0A0F] border border-black/5 font-extrabold uppercase rounded-full text-[10px]">
                    {selectedPost.community}
                  </Badge>
                  <span className="text-xs text-[#8E7A8A]">Posted by u/{selectedPost.author}</span>
                  {selectedPost.isAiAssisted && (
                    <Badge className="bg-gradient-to-r from-[#FF6B35] to-[#E8003D] text-white text-[9px] font-bold uppercase rounded-full px-2 py-0.5 flex items-center gap-1">
                      <span className="animate-spin-slow">✦</span>
                      <span>AI Assisted</span>
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-[#8E7A8A]">{selectedPost.time}</span>
              </div>

              {/* Title */}
              <h2 className="text-xl lg:text-2xl font-extrabold text-[#0A0A0F] leading-snug mb-6">
                {selectedPost.title}
              </h2>

              {/* ADAPTIVE DISPLAY: VIDEO TYPE */}
              {selectedPost.contentType === "video" && (
                <div className="mb-6 flex flex-col gap-4">
                  <div className="aspect-video bg-black rounded-2xl overflow-hidden relative border border-black/10 flex items-center justify-center group">
                    <img src={selectedPost.image} alt="video thumbnail" className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white text-[#0A0A0F] flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all">
                        <Play className="w-6 h-6 fill-current ml-1" />
                      </div>
                    </div>
                    {/* Simulated live-chat overlay */}
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                      Live Chat Connected
                    </div>
                  </div>

                  {/* Video-optimized native banner ad */}
                  <div className="bg-[#F5F0EB]/40 border border-black/5 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <Badge className="bg-[#0A0A0F]/10 text-[#0A0A0F] text-[8px] font-bold uppercase rounded-full mb-1">Sponsored</Badge>
                      <h5 className="text-xs font-bold text-[#0A0A0F]">Upgrade your setup with official SPRK partner gear.</h5>
                    </div>
                    <button onClick={() => toast.success("Redirecting to partner storefront...")} className="bg-[#0A0A0F] hover:bg-[#FF6B35] text-white font-bold text-[10px] uppercase tracking-wider px-3.5 py-2 rounded-lg transition-colors">
                      Shop Now
                    </button>
                  </div>
                </div>
              )}

              {/* ADAPTIVE DISPLAY: SHORTS TYPE */}
              {selectedPost.contentType === "shorts" && (
                <div className="mb-6 flex flex-col lg:flex-row gap-6 items-start">
                  <div className="w-full lg:w-72 aspect-[9/16] bg-black rounded-2xl overflow-hidden relative border border-black/10 flex items-center justify-center group shrink-0">
                    <img src={selectedPost.image} alt="shorts preview" className="w-full h-full object-cover opacity-90" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white text-[#0A0A0F] flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all">
                        <Play className="w-5 h-5 fill-current ml-1" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col gap-4">
                    <span className="text-[10px] font-bold text-[#8E7A8A] uppercase tracking-wider">Shorts Telemetry</span>
                    <p className="text-xs text-[#4A5278] leading-relaxed">
                      This short-form loop has an average viewer retention score of **94%**. Optimized using SPRK-OS Hook templates.
                    </p>
                    <div className="bg-[#FF6B35]/5 border border-[#FF6B35]/10 rounded-xl p-3 flex flex-col gap-2">
                      <span className="text-[10px] font-extrabold text-[#FF6B35] uppercase">Active Engagement Poll</span>
                      <span className="text-xs font-bold text-[#0A0A0F]">Would you wear this techwear build?</span>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <button onClick={() => toast.success("Vote registered: YES")} className="bg-white border border-black/5 text-xs font-bold py-1.5 rounded-lg hover:bg-[#F5F0EB]">Yes (82%)</button>
                        <button onClick={() => toast.success("Vote registered: NO")} className="bg-white border border-black/5 text-xs font-bold py-1.5 rounded-lg hover:bg-[#F5F0EB]">No (18%)</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ADAPTIVE DISPLAY: ARTICLE TYPE */}
              {selectedPost.contentType === "article" && selectedPost.image && (
                <div className="mb-6 rounded-2xl overflow-hidden border border-black/5 aspect-video bg-[#F5F0EB]">
                  <img src={selectedPost.image} alt="article header" className="w-full h-full object-cover" />
                </div>
              )}

              {/* Main Content Body text */}
              <div className="prose prose-sm max-w-none text-[#4A5278] leading-relaxed font-medium text-xs mb-8">
                <p>{selectedPost.contentBody}</p>
              </div>

              {/* Sponsored Call-to-Action Block */}
              {selectedPost.sponsored && selectedPost.adDetails && (
                <div className="bg-gradient-to-r from-[#FF6B35]/10 to-[#E8003D]/10 border border-[#FF6B35]/20 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                  <div>
                    <span className="text-[9px] font-extrabold text-[#FF6B35] uppercase tracking-widest block mb-1">Exclusive Partner Activation</span>
                    <h4 className="text-sm font-bold text-[#0A0A0F]">{selectedPost.adDetails.sponsorName} Drop Program</h4>
                    <p className="text-[11px] text-[#4A5278] mt-0.5">Secure placement coupon codes are fully funded and verified in escrow.</p>
                  </div>
                  <button 
                    onClick={() => {
                      toast.success(`Initializing secure redirect to ${selectedPost.adDetails.sponsorName}...`);
                      window.open(selectedPost.adDetails.url, "_blank");
                    }}
                    className="bg-[#0A0A0F] hover:bg-[#FF6B35] text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-colors shrink-0 flex items-center gap-1.5"
                  >
                    <span>{selectedPost.adDetails.cta}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* COMPREHENSIVE CREATOR BIO CARD (Always visible inside detail drawer) */}
              <div className="bg-[#F5F0EB]/40 border border-black/5 rounded-2xl p-5 mb-8">
                <div className="flex items-center justify-between border-b border-black/5 pb-3 mb-3">
                  <span className="text-[10px] font-bold text-[#8E7A8A] uppercase tracking-widest">About the Creator</span>
                  <Badge className="bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/20 text-[9px] font-bold uppercase rounded-full">
                    {selectedPost.creatorBio.metric}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF6B35] to-[#E8003D] flex items-center justify-center text-white font-extrabold text-sm shrink-0">
                    {selectedPost.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-[#0A0A0F] block">{selectedPost.creatorBio.name}</span>
                    <span className="text-[10px] text-[#8E7A8A] block">{selectedPost.creatorBio.handle}</span>
                  </div>
                </div>

                {/* Culture profile survey preview */}
                <div className="grid grid-cols-3 gap-2 bg-white border border-black/5 rounded-xl p-3 text-[9px] font-bold text-[#4A5278] text-center">
                  <div>
                    <span className="text-[8px] text-[#8E7A8A] uppercase block mb-0.5">Culture</span>
                    <span className="text-[#0A0A0F] truncate block">{selectedPost.creatorBio.survey.culture}</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-[#8E7A8A] uppercase block mb-0.5">Vibe</span>
                    <span className="text-[#0A0A0F] truncate block">{selectedPost.creatorBio.survey.vibe}</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-[#8E7A8A] uppercase block mb-0.5">Focus</span>
                    <span className="text-[#0A0A0F] truncate block">{selectedPost.creatorBio.survey.focus}</span>
                  </div>
                </div>

                {/* Bio page cross-link */}
                <div className="mt-4 flex gap-2">
                  <Link href="/" className="flex-1">
                    <button className="w-full bg-white border border-black/5 hover:bg-[#F5F0EB]/40 text-[#0A0A0F] font-bold text-[10px] uppercase tracking-wider py-2.5 rounded-xl transition-all">
                      View yourSPRK Bio Profile
                    </button>
                  </Link>
                  <Link href="/pavilion" className="flex-1">
                    <button className="w-full bg-[#0A0A0F] hover:bg-[#FF6B35] text-white font-bold text-[10px] uppercase tracking-wider py-2.5 rounded-xl transition-all">
                      Sponsor Creator
                    </button>
                  </Link>
                </div>
              </div>

              {/* Discussion / Comments Section */}
              <div>
                <h4 className="text-xs font-bold text-[#0A0A0F] uppercase tracking-wider mb-4 border-b border-black/5 pb-2">
                  Discussion ({selectedPost.comments})
                </h4>
                <div className="flex gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#0A0A0F] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    U
                  </div>
                  <div className="flex-1 flex gap-2">
                    <Input
                      placeholder="Add to the discussion..."
                      className="bg-[#F5F0EB]/50 border border-black/5 rounded-xl h-10 text-xs font-medium focus:ring-[#FF6B35]"
                    />
                    <button 
                      onClick={() => toast.success("Comment posted successfully (demo mode).")}
                      className="bg-[#0A0A0F] hover:bg-[#FF6B35] text-white font-bold text-[10px] uppercase px-4 rounded-xl transition-colors shrink-0"
                    >
                      Post
                    </button>
                  </div>
                </div>

                {/* Simulated Comment List */}
                <div className="flex flex-col gap-4">
                  {[
                    { user: "@cyber_fanatic", text: "NGL this drop is absolutely legendary. Already linked my wallet profile.", time: "1 hour ago" },
                    { user: "@esports_tracker", text: "The stream telemetry integrations on the-SPRK are next level. FRFR.", time: "2 hours ago" }
                  ].map((comment, idx) => (
                    <div key={idx} className="flex gap-3 text-xs">
                      <div className="w-7 h-7 rounded-full bg-[#F5F0EB] text-[#0A0A0F] flex items-center justify-center font-extrabold text-[10px] shrink-0">
                        {comment.user.charAt(1).toUpperCase()}
                      </div>
                      <div className="bg-[#F5F0EB]/20 border border-black/5 rounded-2xl p-3 flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-extrabold text-[#0A0A0F]">{comment.user}</span>
                          <span className="text-[10px] text-[#8E7A8A]">{comment.time}</span>
                        </div>
                        <p className="text-[#4A5278] font-medium leading-relaxed">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>

            {/* Drawer Footer Actions */}
            <div className="border-t border-black/5 p-4 bg-[#F5F0EB]/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleVote(selectedPost.id, "up", e)}
                  className={`p-2 rounded-xl border border-black/5 bg-white hover:bg-[#F5F0EB] transition-colors ${
                    userVote[selectedPost.id] === "up" ? "text-[#FF6B35]" : "text-[#4A5278]"
                  }`}
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <span className="text-xs font-extrabold text-[#0A0A0F]">
                  {postLikes[selectedPost.id] >= 1000 ? `${(postLikes[selectedPost.id] / 1000).toFixed(1)}k` : postLikes[selectedPost.id]}
                </span>
                <button
                  onClick={(e) => handleVote(selectedPost.id, "down", e)}
                  className={`p-2 rounded-xl border border-black/5 bg-white hover:bg-[#F5F0EB] transition-colors ${
                    userVote[selectedPost.id] === "down" ? "text-[#CC0055]" : "text-[#4A5278]"
                  }`}
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    toast.success(`Securely licensed content rights from u/${selectedPost.author}!`);
                    setSelectedPost(null);
                  }}
                  className="bg-[#0A0A0F] hover:bg-[#FF6B35] text-white font-bold text-[10px] uppercase tracking-wider px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Secure Rights</span>
                </button>
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="bg-white border border-black/5 text-[#4A5278] hover:bg-[#F5F0EB]/40 font-bold text-[10px] uppercase tracking-wider px-4 py-2.5 rounded-xl transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </SharedLayout>
  );
}
