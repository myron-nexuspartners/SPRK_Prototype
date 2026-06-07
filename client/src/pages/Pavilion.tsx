import React, { useState } from "react";
import { 
  Search, SlidersHorizontal, Star, DollarSign, ArrowRight, 
  ShieldCheck, FileText, CheckCircle, Flame, Sparkles, 
  Play, Video, BookOpen, Layers, X, Calendar, MapPin, Award
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import SharedLayout from "@/components/SharedLayout";

export default function Pavilion() {
  // Search & Taxonomy Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  
  // Escrow Deal Modal State
  const [isEscrowOpen, setIsEscrowOpen] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState<any>(null);
  const [dealBudget, setDealBudget] = useState("5000");
  const [dealTerms, setDealTerms] = useState("30-second integrated overlay drop during next livestream.");

  // Realistic Grounded Creators
  const featuredCreators = [
    {
      id: 1,
      name: "Myron 'KingMyron' Sterling",
      handle: "@kingmyron",
      niche: "Gaming & Esports",
      metric: "1.2M Reach",
      rate: "$2,500 / Drop",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
      badge: "Verified Partner",
      surveyResults: { culture: "Hardcore Competitive", vibe: "High-Octane", focus: "First-Person Shooters" }
    },
    {
      id: 2,
      name: "Aria 'Valkyrie' Chen",
      handle: "@aria_valk",
      niche: "Fashion & Streetwear",
      metric: "450K Reach",
      rate: "$1,800 / Drop",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      badge: "Rising Star",
      surveyResults: { culture: "Cyberpunk / Techwear", vibe: "Aesthetic / Minimalist", focus: "Limited Sneaker Drops" }
    },
    {
      id: 3,
      name: "Marcus 'SciFi_Guy' Vance",
      handle: "@scifi_vance",
      niche: "Sci-Fi & Comics",
      metric: "820K Reach",
      rate: "$2,000 / Drop",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      badge: "Official Expert",
      surveyResults: { culture: "Lore & Theory", vibe: "Deep-Dive / Analytical", focus: "Blade Runner & Timelines" }
    },
    {
      id: 4,
      name: "Yuki 'Momo_Cos' Tanaka",
      handle: "@yuki_momo",
      niche: "Anime & Cosplay",
      metric: "680K Reach",
      rate: "$1,500 / Drop",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
      badge: "CCXP Master",
      surveyResults: { culture: "Cosplay & Fabrication", vibe: "Creative / Tutorial", focus: "Cyberpunk Builds" }
    }
  ];

  // Realistic Grounded Content Library (Last 30 Days)
  const contentItems = [
    {
      id: 101,
      title: "SPRK x Balenciaga Drop Collection: Live Coverage & Exclusive Drop Cards",
      creator: "@aria_valk",
      type: "Article",
      interest: "Fashion & Drops",
      views: "16.4K",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
      desc: "An inside look at the limited-edition techwear drops featuring secure smart-contract physical redemption keys."
    },
    {
      id: 102,
      title: "Elden Ring GOTY DLC Blindfolded Speedrun (Timestamp 10-Second Hook)",
      creator: "@kingmyron",
      type: "Live Stream",
      interest: "Gaming & Esports",
      views: "48.2K",
      image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80",
      desc: "Watch the legendary full stream run where interactive poll overlays determined the path in real-time."
    },
    {
      id: 103,
      title: "Blade Runner 2099: Casting Leaks, Timeline Analysis & Production Rumors",
      creator: "@scifi_vance",
      type: "Video",
      interest: "Sci-Fi & Fantasy",
      views: "12.5K",
      image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=600&q=80",
      desc: "Breaking down the recent scheduling rumors and what they mean for the Cyberpunk timeline expansion."
    },
    {
      id: 104,
      title: "Cyberpunk Netrunner Momo Con Cosplay Build Process & Fabrications",
      creator: "@yuki_momo",
      type: "Shorts",
      interest: "Anime & Comics",
      views: "24.1K",
      image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80",
      desc: "How I built the illuminated LED wiring panels for my Momo Con stage appearance under $200."
    },
    {
      id: 105,
      title: "Streetwear Drops 2026: Sneaker Drop Escrow Coupon Deployment Tutorial",
      creator: "@aria_valk",
      type: "Video",
      interest: "Creator Resources",
      views: "8.9K",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
      desc: "A quick walkthrough on using SPRK-OS to deploy secure discount smart contracts directly into video feeds."
    },
    {
      id: 106,
      title: "Momo Con & Comic-Con 2026: Live Stage Highlights & Cosplay Winners",
      creator: "@yuki_momo",
      type: "Live Stream",
      interest: "Events & Expos",
      views: "31.2K",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80",
      desc: "Streaming live from the exhibition floor with active interactive sponsor overlays and real-time polls."
    }
  ];

  // Handle taxonomy filtering
  const handleTypeChange = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleInterestChange = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const filteredContent = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(item.type);
    const matchesInterest = selectedInterests.length === 0 || selectedInterests.includes(item.interest);
    
    return matchesSearch && matchesType && matchesInterest;
  });

  const openEscrowModal = (creator: any) => {
    setSelectedCreator(creator);
    setIsEscrowOpen(true);
  };

  const handleFundEscrow = () => {
    toast.success(`Smart Contract Escrow initialized for ${selectedCreator.name}! $${dealBudget} locked in secure escrow.`);
    setIsEscrowOpen(false);
  };

  return (
    <SharedLayout activeSite="pavilion">
      <div className="bg-[#F5F0EB]/30 min-h-screen py-8">
        <div className="container max-w-6xl">
          
          {/* 1. HERO SECTION: Confirmed Tagline & Full Subhead */}
          <div className="bg-white border border-black/5 rounded-3xl p-8 lg:p-12 mb-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#FF6B35]/10 to-[#E8003D]/10 rounded-full blur-3xl -z-10"></div>
            <div className="max-w-3xl">
              <Badge className="bg-gradient-to-r from-[#FF6B35] to-[#E8003D] text-white font-bold uppercase rounded-full px-3 py-1 text-xs mb-4">
                SPRK Pavilion Marketplace
              </Badge>
              <h1 className="text-3xl lg:text-5xl font-extrabold text-[#0A0A0F] leading-tight tracking-tight">
                Culture = Credibility.<br />
                Credibility = Commerce.<br />
                <span className="bg-gradient-to-r from-[#FF6B35] via-[#E8003D] to-[#CC0055] bg-clip-text text-transparent">
                  SPRK Pavilion - Built for Both.
                </span>
              </h1>
              <p className="text-sm lg:text-base text-[#4A5278] mt-4 leading-relaxed font-medium">
                The ultimate Spotify-style marketplace connecting cultural trendsetters with elite brands. Deploy instant, secure sponsorship campaigns backed by real-time smart contract escrow. Lock in budgets, verify reach metrics, and deploy interactive overlay campaigns in minutes.
              </p>
            </div>
          </div>

          {/* 2. MAIN LAYOUT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Spotify-Style Taxonomy Filters */}
            <aside className="lg:col-span-3 w-full">
              <div className="sticky top-24 flex flex-col gap-6">
                
                {/* Search Field */}
                <div className="bg-white border border-black/5 rounded-2xl p-5 shadow-sm">
                  <h4 className="text-xs font-bold text-[#0A0A0F] uppercase tracking-wider mb-3">Search Creators & Content</h4>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E7A8A]" />
                    <Input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search titles, tags, handles..."
                      className="pl-9 bg-[#F5F0EB]/50 border border-black/5 rounded-xl h-10 text-xs font-medium focus:ring-[#FF6B35]"
                    />
                  </div>
                </div>

                {/* Taxonomy Filter Panel */}
                <div className="bg-white border border-black/5 rounded-2xl p-5 shadow-sm flex flex-col gap-6">
                  
                  {/* Content Type Filters */}
                  <div>
                    <h4 className="text-xs font-bold text-[#0A0A0F] uppercase tracking-wider mb-3 pb-2 border-b border-black/5 flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-[#FF6B35]" />
                      <span>Content Type</span>
                    </h4>
                    <div className="flex flex-col gap-2.5">
                      {["Live Stream", "Video", "Article", "Shorts"].map((type) => (
                        <div key={type} className="flex items-center gap-2">
                          <Checkbox
                            id={`type-${type}`}
                            checked={selectedTypes.includes(type)}
                            onCheckedChange={() => handleTypeChange(type)}
                          />
                          <label htmlFor={`type-${type}`} className="text-xs font-bold text-[#4A5278] cursor-pointer select-none">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interest Category Filters */}
                  <div>
                    <h4 className="text-xs font-bold text-[#0A0A0F] uppercase tracking-wider mb-3 pb-2 border-b border-black/5 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-[#E8003D]" />
                      <span>Interest Category</span>
                    </h4>
                    <div className="flex flex-col gap-2.5">
                      {[
                        "Gaming & Esports",
                        "Sci-Fi & Fantasy",
                        "Anime & Comics",
                        "Fashion & Drops",
                        "Events & Expos",
                        "Creator Resources"
                      ].map((interest) => (
                        <div key={interest} className="flex items-center gap-2">
                          <Checkbox
                            id={`interest-${interest}`}
                            checked={selectedInterests.includes(interest)}
                            onCheckedChange={() => handleInterestChange(interest)}
                          />
                          <label htmlFor={`interest-${interest}`} className="text-xs font-bold text-[#4A5278] cursor-pointer select-none">
                            {interest}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters Button */}
                  {(selectedTypes.length > 0 || selectedInterests.length > 0 || searchQuery !== "") && (
                    <button
                      onClick={() => {
                        setSelectedTypes([]);
                        setSelectedInterests([]);
                        setSearchQuery("");
                        toast.success("Filters cleared successfully.");
                      }}
                      className="w-full text-center text-xs font-extrabold text-[#FF6B35] hover:underline"
                    >
                      Clear All Active Filters
                    </button>
                  )}

                </div>

              </div>
            </aside>

            {/* RIGHT COLUMN: Featured Ribbon + Content Grid */}
            <main className="lg:col-span-9 w-full flex flex-col gap-8">
              
              {/* HORIZONTAL SCROLLING FEATURED CREATORS RIBBON */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#0A0A0F]">Featured Creators</h3>
                    <p className="text-xs text-[#4A5278] mt-0.5">High-impact creators with verified survey profiles</p>
                  </div>
                  <span className="text-xs font-bold text-[#FF6B35] hover:underline cursor-pointer">View All Creators</span>
                </div>

                {/* Scrolling Container */}
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scroll-smooth">
                  {featuredCreators.map((creator) => (
                    <div 
                      key={creator.id} 
                      className="bg-white border border-black/5 rounded-2xl p-4 shadow-sm min-w-[280px] max-w-[280px] flex flex-col justify-between hover:border-[#FF6B35]/20 transition-all shrink-0"
                    >
                      <div>
                        {/* Creator Header */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-full overflow-hidden border border-black/5 bg-[#F5F0EB]">
                            <img src={creator.image} alt={creator.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <span className="text-xs font-extrabold text-[#0A0A0F] block leading-snug">{creator.name}</span>
                            <span className="text-[10px] text-[#8E7A8A] block">{creator.handle}</span>
                          </div>
                        </div>

                        {/* Niche & Metrics */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          <Badge className="bg-[#F5F0EB] text-[#0A0A0F] border border-black/5 text-[9px] font-bold uppercase rounded-full">
                            {creator.niche}
                          </Badge>
                          <Badge className="bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/20 text-[9px] font-bold uppercase rounded-full">
                            {creator.metric}
                          </Badge>
                        </div>

                        {/* Culture Profile Survey Preview */}
                        <div className="bg-[#F5F0EB]/30 rounded-xl p-3 text-[10px] font-semibold text-[#4A5278] flex flex-col gap-1.5 mb-4 border border-black/5">
                          <div className="flex justify-between">
                            <span>Culture Focus:</span>
                            <span className="text-[#0A0A0F] font-extrabold">{creator.surveyResults.culture}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Vibe:</span>
                            <span className="text-[#0A0A0F] font-extrabold">{creator.surveyResults.vibe}</span>
                          </div>
                        </div>
                      </div>

                      {/* Brand Deal Action CTA */}
                      <div className="flex items-center justify-between border-t border-black/5 pt-3">
                        <span className="text-xs font-extrabold text-[#0A0A0F]">{creator.rate}</span>
                        <button 
                          onClick={() => openEscrowModal(creator)}
                          className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-white bg-[#0A0A0F] hover:bg-[#FF6B35] px-3 py-2 rounded-full transition-colors"
                        >
                          <span>Propose Deal</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              </div>

              {/* DYNAMIC STREAMING CONTENT GRID */}
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-black/5 pb-2">
                  <div>
                    <h3 className="text-lg font-bold text-[#0A0A0F]">Streaming Content Library</h3>
                    <p className="text-xs text-[#4A5278] mt-0.5">Explore active content streams, articles, and shorts</p>
                  </div>
                  <Badge className="bg-[#0A0A0F] text-white text-xs font-bold px-3 py-1 rounded-full">
                    {filteredContent.length} Assets Found
                  </Badge>
                </div>

                {/* Library Grid */}
                {filteredContent.length === 0 ? (
                  <div className="bg-white border border-black/5 rounded-2xl p-12 text-center shadow-sm">
                    <h4 className="font-bold text-[#0A0A0F] mb-1">No assets match your filters</h4>
                    <p className="text-xs text-[#4A5278]">Try clearing some category checkboxes or refining your search term.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredContent.map((item) => (
                      <div key={item.id} className="bg-white border border-black/5 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-[#FF6B35]/20 transition-all">
                        
                        {/* Card Image Header */}
                        <div className="relative aspect-video bg-[#F5F0EB] overflow-hidden">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          <div className="absolute top-3 left-3 flex gap-1.5">
                            <Badge className="bg-[#0A0A0F] text-white text-[9px] font-extrabold uppercase rounded-full px-2.5 py-1">
                              {item.type}
                            </Badge>
                            <Badge className="bg-white/90 text-[#0A0A0F] border border-black/5 text-[9px] font-extrabold uppercase rounded-full px-2.5 py-1">
                              {item.interest}
                            </Badge>
                          </div>
                          <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                            {item.views} views
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                          <div>
                            <span className="text-[10px] font-extrabold text-[#FF6B35] uppercase tracking-wider block mb-1">
                              By {item.creator}
                            </span>
                            <h4 className="text-sm font-bold text-[#0A0A0F] leading-snug mb-2">
                              {item.title}
                            </h4>
                            <p className="text-xs text-[#4A5278] leading-relaxed">
                              {item.desc}
                            </p>
                          </div>

                          {/* Quick Overlay Action */}
                          <div className="border-t border-black/5 pt-3 flex items-center justify-between">
                            <button 
                              onClick={() => toast.info(`Viewing live analytics for campaign: ${item.id}`)}
                              className="text-xs font-bold text-[#4A5278] hover:text-[#0A0A0F] flex items-center gap-1"
                            >
                              <SlidersHorizontal className="w-3.5 h-3.5" />
                              <span>View Metrics</span>
                            </button>
                            <button 
                              onClick={() => toast.success(`Interactive overlay preview active for stream ${item.id}!`)}
                              className="text-xs font-extrabold text-[#FF6B35] hover:underline"
                            >
                              Launch Stream Preview
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>

            </main>

          </div>

        </div>
      </div>

      {/* SMART CONTRACT ESCROW DEAL MODAL */}
      {isEscrowOpen && selectedCreator && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-black/10 rounded-3xl p-6 lg:p-8 max-w-lg w-full shadow-2xl relative flex flex-col gap-6 animate-in fade-in zoom-in duration-200">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsEscrowOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-[#F5F0EB] transition-colors"
            >
              <X className="w-5 h-5 text-[#4A5278]" />
            </button>

            {/* Modal Header */}
            <div className="border-b border-black/5 pb-4">
              <div className="flex items-center gap-2 mb-1.5">
                <ShieldCheck className="w-5 h-5 text-[#FF6B35]" />
                <span className="text-[10px] font-bold text-[#FF6B35] uppercase tracking-widest">SPRK Escrow Smart Contract</span>
              </div>
              <h3 className="text-lg font-bold text-[#0A0A0F]">Propose Deal with {selectedCreator.name}</h3>
              <p className="text-xs text-[#4A5278] mt-0.5">Secure your campaign budget with automated milestone verification</p>
            </div>

            {/* Modal Body */}
            <div className="flex flex-col gap-4">
              
              {/* Creator Card Mini */}
              <div className="flex items-center gap-3 bg-[#F5F0EB]/30 p-3 rounded-xl border border-black/5">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-black/5 bg-[#F5F0EB]">
                  <img src={selectedCreator.image} alt={selectedCreator.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-[#0A0A0F] block">{selectedCreator.name}</span>
                  <span className="text-[10px] text-[#8E7A8A] block">{selectedCreator.handle} • {selectedCreator.metric}</span>
                </div>
              </div>

              {/* Budget Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#4A5278] uppercase tracking-wider">Escrow Budget (USD)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0A0A0F]" />
                  <Input
                    type="number"
                    value={dealBudget}
                    onChange={(e) => setDealBudget(e.target.value)}
                    className="pl-9 bg-[#F5F0EB]/30 border border-black/5 rounded-xl h-11 text-xs font-bold text-[#0A0A0F]"
                  />
                </div>
              </div>

              {/* Campaign Terms */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#4A5278] uppercase tracking-wider">Campaign Deliverables & Terms</label>
                <textarea
                  value={dealTerms}
                  onChange={(e) => setDealTerms(e.target.value)}
                  rows={3}
                  className="w-full p-3 bg-[#F5F0EB]/30 border border-black/5 rounded-xl text-xs font-medium text-[#0A0A0F] focus:outline-none focus:ring-1 focus:ring-[#FF6B35]"
                />
              </div>

              {/* Escrow Disclaimer */}
              <div className="bg-[#FF6B35]/5 border border-[#FF6B35]/10 rounded-xl p-3 text-[10px] font-semibold text-[#FF6B35] leading-relaxed">
                By initiating this escrow contract, your budget will be securely locked in the SPRK Escrow Vault. Funds will be released to the creator automatically upon verification of deliverables via SPRK-OS streaming telemetry.
              </div>

            </div>

            {/* Modal Footer */}
            <div className="flex items-center gap-3 border-t border-black/5 pt-4">
              <button 
                onClick={() => setIsEscrowOpen(false)}
                className="flex-1 border border-black/5 text-[#4A5278] hover:bg-[#F5F0EB]/30 font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-all"
              >
                Cancel Proposal
              </button>
              <button 
                onClick={handleFundEscrow}
                className="flex-1 bg-[#0A0A0F] hover:bg-[#FF6B35] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-all"
              >
                Fund Escrow
              </button>
            </div>

          </div>
        </div>
      )}

    </SharedLayout>
  );
}
