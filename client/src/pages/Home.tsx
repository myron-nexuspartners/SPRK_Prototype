import React, { useState } from "react";
import { Link } from "wouter";
import { Sparkles, ArrowRight, ArrowUpRight, CheckCircle2, Star, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import SharedLayout from "@/components/SharedLayout";

export default function Home() {
  const [email, setEmail] = useState("");
  const [surveyStep, setSurveyStep] = useState(1);
  const [surveyAnswers, setSurveyStepAnswers] = useState({
    focus: "",
    needs: "",
    tier: ""
  });

  const handleSurveySelect = (field: string, val: string) => {
    setSurveyStepAnswers((prev) => ({ ...prev, [field]: val }));
    if (surveyStep < 3) {
      setSurveyStep((prev) => prev + 1);
    } else {
      toast.success("Cultural profile compiled! Complete the email form to secure your slot.");
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Opening the official yourSPRK beta form…");
    window.open("/yoursprk.html", "_blank");
    setEmail("");
  };

  return (
    <SharedLayout activeSite="lead-gen">
      
      {/* SECTION 1: HERO */}
      <section id="hero" className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden py-16">
        
        {/* Sliding Marquee Grid Background (Official Design) - Fixed Duplicate Keys */}
        <div className="absolute inset-0 display grid grid-template-rows-3 gap-1.5 overflow-hidden opacity-[0.14] pointer-events-none">
          <div className="flex gap-1.5 animate-[marquee-slide_28s_linear_infinite] whitespace-nowrap">
            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((idx) => (
              <div key={`marquee-1-${idx}`} className="w-[180px] aspect-[4/5] rounded-xl bg-gradient-to-br from-[#C4A09A] to-[#8E7A8A] shrink-0" />
            ))}
          </div>
          <div className="flex gap-1.5 animate-[marquee-slide_32s_linear_infinite_reverse] whitespace-nowrap">
            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((idx) => (
              <div key={`marquee-2-${idx}`} className="w-[180px] aspect-[4/5] rounded-xl bg-gradient-to-br from-[#4A5278] to-[#1E2235] shrink-0" />
            ))}
          </div>
          <div className="flex gap-1.5 animate-[marquee-slide_24s_linear_infinite] whitespace-nowrap">
            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((idx) => (
              <div key={`marquee-3-${idx}`} className="w-[180px] aspect-[4/5] rounded-xl bg-gradient-to-br from-[#F0E8E4] to-[#C4A09A] shrink-0" />
            ))}
          </div>
        </div>

        {/* CSS Marquee Keyframes Inject */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee-slide {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}} />

        {/* Gradient Overlay for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white/95 pointer-events-none" />

        {/* Hero Content */}
        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 text-left flex flex-col items-start">
            <div className="inline-flex items-center gap-2 bg-[#F5F0EB] px-4 py-1.5 rounded-full mb-6 border border-black/5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]"></span>
              <span className="text-xs font-bold text-[#4A5278] uppercase tracking-wider">Beta Access — Limited Seats</span>
            </div>

            <h1 className="hero-headline text-[#0A0A0F] mb-6">
              Embrace your <span className="bg-gradient-to-r from-[#FF6B35] via-[#E8003D] to-[#CC0055] bg-clip-text text-transparent">SPRK</span>
            </h1>

            <p className="text-lg md:text-xl text-[#4A5278] font-light leading-relaxed max-w-xl mb-8">
              The creator-first operating system built for true independence. Join the SPRK beta.
            </p>

            {/* Main Form */}
            <form onSubmit={handleRegister} className="w-full max-w-md flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="bg-white border border-black/10 rounded-full h-14 px-6 text-base focus:ring-[#FF6B35] focus:border-[#FF6B35] placeholder:text-[#8E7A8A]"
              />
              <button type="submit" className="btn-primary-grad h-14 rounded-full px-8 shrink-0 font-bold uppercase tracking-wider text-sm">
                Join the Beta
              </button>
            </form>
          </div>

          {/* Right Survey Widget Column */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-black/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#FF6B35] via-[#E8003D] to-[#CC0055]"></div>
              
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-bold text-[#8E7A8A] uppercase tracking-widest">Culture Profile</span>
                <span className="text-xs font-bold text-[#FF6B35]">Step {surveyStep} of 3</span>
              </div>

              {surveyStep === 1 && (
                <div>
                  <h3 className="text-xl font-bold text-[#0A0A0F] mb-4">What is your primary focus in digital culture?</h3>
                  <div className="flex flex-col gap-2.5">
                    {[
                      { key: "gaming", label: "Gaming & Esports (PC/Mobile/Streaming)" },
                      { key: "fashion", label: "Streetwear, Sneakers & Drops" },
                      { key: "anime", label: "Anime, Comics & Sci-Fi Content" },
                      { key: "brand", label: "Brand Collaborations & Web3 Tech" }
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => handleSurveySelect("focus", opt.key)}
                        className="w-full text-left p-4 rounded-xl border border-black/5 hover:border-[#FF6B35] hover:bg-[#F5F0EB]/50 transition-all font-semibold text-sm"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {surveyStep === 2 && (
                <div>
                  <h3 className="text-xl font-bold text-[#0A0A0F] mb-4">What is your biggest bottleneck as a creator?</h3>
                  <div className="flex flex-col gap-2.5">
                    {[
                      { key: "hooks", label: "Refining video titles & high-engagement hooks" },
                      { key: "contracts", label: "Drafting smart sponsorship contracts with brands" },
                      { key: "sponsors", label: "Discovering premium sponsors & brand campaigns" },
                      { key: "editing", label: "Post overlays, assets, and rendering speed" }
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => handleSurveySelect("needs", opt.key)}
                        className="w-full text-left p-4 rounded-xl border border-black/5 hover:border-[#FF6B35] hover:bg-[#F5F0EB]/50 transition-all font-semibold text-sm"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {surveyStep === 3 && (
                <div>
                  <h3 className="text-xl font-bold text-[#0A0A0F] mb-4">Select your ideal studio workspace level:</h3>
                  <div className="flex flex-col gap-2.5">
                    {[
                      { key: "free", label: "SPRK Lite (Free, content feed & basic editor)" },
                      { key: "pro", label: "SPRK-OS Pro ($99/mo, AI editor & hooks suite)" },
                      { key: "agency", label: "SPRK-OS Agency ($299/mo, smart contracts & team seats)" }
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => handleSurveySelect("tier", opt.key)}
                        className="w-full text-left p-4 rounded-xl border border-black/5 hover:border-[#FF6B35] hover:bg-[#F5F0EB]/50 transition-all font-semibold text-sm"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {surveyStep === 3 && surveyAnswers.tier && (
                <div className="mt-6 p-4 bg-[#F5F0EB] rounded-xl border border-black/5 text-center">
                  <span className="text-xs font-bold text-[#4A5278] uppercase tracking-wider block mb-1">Secured Tier Selection</span>
                  <span className="font-extrabold text-sm text-[#FF6B35] uppercase">{surveyAnswers.tier} Workspace</span>
                  <button onClick={() => setSurveyStep(1)} className="text-xs text-[#8E7A8A] underline block mx-auto mt-2 hover:text-[#0A0A0F]">
                    Reset Survey
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: PLATFORM ECOSYSTEM SUMMARY */}
      <section className="py-24 bg-[#F5F0EB]/50 border-t border-b border-black/5">
        <div className="container max-w-5xl text-center">
          <span className="label-caps text-[#FF6B35] font-extrabold mb-4 block">The SPRK Family</span>
          <h2 className="section-headline text-[#0A0A0F] mb-16">Four Platforms, One Connected Culture</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {[
              { title: "the-SPRK.com", desc: "Reddit-style community content layer where people discover, engage, and follow creator work across global interests.", link: "/discover", btn: "Browse Feed" },
              { title: "SPRK-OS", desc: "Premium AI-powered editing workspace and content suite built to generate hooks, manage post overlays, and run your studio.", link: "/os", btn: "Enter Studio" },
              { title: "SPRK Pavilion", desc: "Spotify-style marketplace connecting culturally credible creators with transparent, smart-contract escrow brand sponsorships.", link: "/pavilion", btn: "Open Pavilion" },
              { title: "yourSPRK.com", desc: "Official landing pages, cultural profile registration, and beta access gateway built for true independence.", link: "/", btn: "Secure Beta Access" }
            ].map((item, idx) => (
              <div key={`summary-card-${idx}`} className="bg-white border border-black/5 rounded-2xl p-8 shadow-sm flex flex-col justify-between h-64 hover:shadow-md transition-shadow">
                <div>
                  <h3 className="text-xl font-bold text-[#0A0A0F] mb-3">{item.title}</h3>
                  <p className="text-sm text-[#4A5278] leading-relaxed font-light">{item.desc}</p>
                </div>
                <Link href={item.link}>
                  <button className="inline-flex items-center gap-1.5 text-sm font-bold text-[#FF6B35] hover:text-[#CC0055] transition-colors mt-4">
                    <span>{item.btn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

    </SharedLayout>
  );
}
