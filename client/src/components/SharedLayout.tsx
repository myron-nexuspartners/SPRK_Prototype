import React from "react";
import { Link, useLocation } from "wouter";
import { Sparkles, Layers, ShieldCheck, ChevronDown, Check, ArrowUpRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SharedLayoutProps {
  children: React.ReactNode;
  activeSite: "lead-gen" | "discover" | "os" | "pavilion";
}

export default function SharedLayout({ children, activeSite }: SharedLayoutProps) {
  const [location] = useLocation();

  const sites = [
    { id: "lead-gen", label: "yourSPRK.com", path: "/", desc: "Official Beta Access Portal" },
    { id: "discover", label: "the-SPRK.com", path: "/discover", desc: "Reddit-Style Creator Content Platform" },
    { id: "os", label: "SPRK-OS", path: "/os", desc: "Claude-Style AI Creator Studio Workspace" },
    { id: "pavilion", label: "SPRK Pavilion", path: "/pavilion", desc: "Spotify-Style Brand & Creator Marketplace" },
  ];

  const activeSiteObj = sites.find((s) => s.id === activeSite) || sites[0];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0A0A0F] antialiased selection:bg-[#FF6B35]/20">
      
      {/* Premium Top Global Switching Bar */}
      <div className="bg-[#F5F0EB] border-b border-black/5 px-6 py-2 text-xs font-medium flex items-center justify-between z-50">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#FF6B35] animate-pulse"></span>
          <span className="text-[#4A5278] font-semibold tracking-wide uppercase text-[10px]">SPRK PROTO-FAMILY DEMO</span>
        </div>
        
        {/* Dropdown switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1.5 text-[#0A0A0F] font-bold hover:opacity-80 transition-opacity outline-none cursor-pointer">
            <span>Viewing: {activeSiteObj.label}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#4A5278]" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 bg-white border border-black/10 rounded-xl p-1.5 shadow-xl z-[100]">
            <div className="px-3 py-2 border-b border-black/5 mb-1">
              <span className="text-[9px] font-bold uppercase text-[#8E7A8A] tracking-wider block">Navigate Family Platforms</span>
            </div>
            {sites.map((site) => (
              <DropdownMenuItem key={site.id} asChild className="rounded-lg focus:bg-[#F5F0EB]">
                <Link href={site.path} className="flex items-start justify-between w-full p-2.5 cursor-pointer">
                  <div>
                    <span className="font-bold text-sm block text-[#0A0A0F]">{site.label}</span>
                    <span className="text-xs text-[#4A5278] block mt-0.5">{site.desc}</span>
                  </div>
                  {activeSite === site.id && (
                    <Check className="w-4 h-4 text-[#FF6B35] mt-1 shrink-0" />
                  )}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Main Official Header Navigation - Clean Sticky Z-Index */}
      <nav className="sticky top-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-md border-b border-black/5 px-6 md:px-12 py-4 flex items-center justify-between transition-all">
        
        {/* Brand Logo Wordmark */}
        <Link href="/" className="flex items-center gap-2.5 group">
          {/* Custom SVG SPRK Logo */}
          <svg className="w-8 h-8 shrink-0 transition-transform group-hover:scale-105" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="url(#sprk-logo-grad)" />
            <path d="M16 8C16 12.4183 19.5817 16 24 16C19.5817 16 16 19.5817 16 24C16 19.5817 12.4183 16 8 16C12.4183 16 16 12.4183 16 8Z" fill="white" />
            <defs>
              <linearGradient id="sprk-logo-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="60%" stopColor="#E8003D" />
                <stop offset="100%" stopColor="#CC0055" />
              </linearGradient>
            </defs>
          </svg>
          <span className="font-display font-extrabold text-2xl tracking-tight text-[#0A0A0F]">
            SPRK<span className="text-[#FF6B35] font-medium">*</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-semibold text-sm text-[#4A5278]">
          <Link href="/" className={`hover:text-[#0A0A0F] transition-colors ${activeSite === "lead-gen" ? "text-[#0A0A0F]" : ""}`}>
            yourSPRK.com
          </Link>
          <Link href="/discover" className={`hover:text-[#0A0A0F] transition-colors ${activeSite === "discover" ? "text-[#0A0A0F]" : ""}`}>
            the-SPRK.com
          </Link>
          <Link href="/os" className={`hover:text-[#0A0A0F] transition-colors ${activeSite === "os" ? "text-[#0A0A0F]" : ""}`}>
            SPRK-OS
          </Link>
          <Link href="/pavilion" className={`hover:text-[#0A0A0F] transition-colors ${activeSite === "pavilion" ? "text-[#0A0A0F]" : ""}`}>
            SPRK Pavilion
          </Link>
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <Link href="/os">
            <button className="inline-flex items-center gap-1.5 bg-[#0A0A0F] text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-[#1E2235] transition-colors">
              <span>Launch Studio</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>
      </nav>

      {/* Main Content Area - Correct Static/Relative Layout to prevent obscuring */}
      <main className="flex-1 flex flex-col relative z-10">
        {children}
      </main>

      {/* Clean Global Footer */}
      <footer className="bg-[#F5F0EB] border-t border-black/5 py-12 px-6 md:px-12 text-center text-xs text-[#8E7A8A] font-medium uppercase tracking-wider relative z-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm text-[#0A0A0F]">SPRK*</span>
            <span className="text-black/30">|</span>
            <span>© 2026 SPRK ECOSYSTEMS INC. ALL RIGHTS RESERVED.</span>
          </div>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-[#0A0A0F] transition-colors">yoursprk.com</Link>
            <Link href="/discover" className="hover:text-[#0A0A0F] transition-colors">the-sprk.com</Link>
            <Link href="/os" className="hover:text-[#0A0A0F] transition-colors">sprk-os</Link>
            <Link href="/pavilion" className="hover:text-[#0A0A0F] transition-colors">sprk pavilion</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
