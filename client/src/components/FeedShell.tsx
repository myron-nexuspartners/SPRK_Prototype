import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Bell,
  Bookmark,
  CalendarDays,
  ChevronDown,
  Flame,
  FolderHeart,
  History,
  Home,
  Instagram,
  Mail,
  Menu,
  MessageCircle,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Twitter,
  Users,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import AdCarousel from "./AdCarousel";

interface FeedShellProps {
  children: React.ReactNode;
  active?: "home" | "article";
  railMode?: "home" | "article";
}


const familyNav = [
  { label: "the-sprk.com", href: "/home", desc: "Open-norm creator content platform" },
  { label: "SPRK-OS", href: "/os", desc: "AI creator studio workspace" },
  { label: "SPRK Pavilion", href: "/pavilion", desc: "Brand and creator marketplace" },
  { label: "yourSPRK Hub", href: "/yoursprk", desc: "Authenticated creator dashboard" },
];

const mainNav = [
  { label: "Home", icon: Home, href: "/home" },
  { label: "Short Clips", icon: Zap, href: "/home#clips" },
  { label: "Articles", icon: FolderHeart, href: "/article/sprk-0025" },
  { label: "Events", icon: CalendarDays, href: "/pavilion" },
  { label: "Creators", icon: Users, href: "/pavilion" },
  { label: "Collections", icon: Bookmark, href: "/pavilion" },
];

const toolNav = [
  { label: "SPRK*OS", icon: Settings2, href: "/os", badge: "Editor" },
  { label: "SPRK*Pavilion", icon: Store, href: "/pavilion", badge: "Market" },
  { label: "yourSPRK Hub", icon: Users, href: "/yoursprk", badge: "Hub" },
  { label: "SPRK*AI", icon: WandSparkles, href: "/os", badge: "Beta" },
];

const mySprks = [
  { label: "Bookmarks", icon: Bookmark },
  { label: "History", icon: History },
  { label: "Following", icon: Star },
  { label: "Messages", icon: Mail, badge: "8" },
];

const trends = [
  { label: "Drake Lawsuit Update", tag: "Music", posts: "154.6K posts" },
  { label: "Apple WWDC 2025", tag: "Technology", posts: "511.9K posts" },
  { label: "Balenciaga Drop Program", tag: "Fashion", posts: "370.7K posts" },
  { label: "Crimson Dawn Boss Clear", tag: "Gaming", posts: "220.8K posts" },
  { label: "Cannes Film Festival", tag: "Film", posts: "163.7K posts" },
  { label: "NBA Playoffs Round 2", tag: "Sports", posts: "151K posts" },
  { label: "Tyler, The Creator Tour", tag: "Music", posts: "93.7K posts" },
  { label: "AI Tools Roundup", tag: "Technology", posts: "55.9K posts" },
];

const events = [
  { date: "JUL 19", title: "SPRK Founding Creator Connect", desc: "Live Q&A with top creators" },
  { date: "AUG 21", title: "SPRK*Showcase: New Heroes X", desc: "Community shorts screening" },
  { date: "SEP 07", title: "SPRK*Academy: BTS Creator Workshop", desc: "Creator strategy & growth" },
];

function PrototypeFamilyRibbon({ active }: { active?: "home" | "article" }) {
  return (
    <div className="border-b border-black/5 bg-[#F5F0EB] px-4 py-2 text-xs font-medium md:px-8">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-center gap-2">
          <span className="inline-block h-2 w-2 shrink-0 animate-pulse rounded-full bg-[#FF6B35]" aria-hidden="true" />
          <span className="truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-[#4A5278]">SPRK proto-family demo</span>
          <span className="hidden text-[10px] font-bold uppercase tracking-[0.14em] text-[#8E7A8A] sm:inline">Viewing: {active === "article" ? "the-sprk.com Article" : "the-sprk.com"}</span>
        </div>
        <nav aria-label="SPRK prototype family navigation" className="flex flex-wrap items-center gap-3 text-[11px] font-bold text-[#4A5278] md:justify-end">
          {familyNav.map((site) => (
            <Link key={site.label} href={site.href} title={site.desc} className={`transition-colors hover:text-[#0A0A0F] ${site.href === "/home" ? "text-[#0A0A0F]" : ""}`}>
              {site.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

function SprkMark({ dark = false, collapsed = false }: { dark?: boolean; collapsed?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg className="h-8 w-8 shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="8" fill="url(#feed-sprk-grad)" />
        <path d="M16 8C16 12.4183 19.5817 16 24 16C19.5817 16 16 19.5817 16 24C16 19.5817 12.4183 16 8 16C12.4183 16 16 12.4183 16 8Z" fill="white" />
        <defs>
          <linearGradient id="feed-sprk-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="60%" stopColor="#E8003D" />
            <stop offset="100%" stopColor="#CC0055" />
          </linearGradient>
        </defs>
      </svg>
      {!collapsed && <strong className={`text-2xl font-extrabold tracking-[-0.04em] ${dark ? "text-white" : "text-[#0A0A0F]"}`}>SPRK<span className="text-[#FF6B35]">*</span></strong>}
    </span>
  );
}

function NavItem({ item, selected, collapsed, onNavigate }: { item: { label: string; icon: React.ComponentType<{ className?: string }>; href: string; badge?: string }; selected?: boolean; collapsed?: boolean; onNavigate?: () => void }) {
  const Icon = item.icon;
  return (
    <Link key={item.label} href={item.href}>
      <button
        title={collapsed ? item.label : undefined}
        onClick={onNavigate}
        className={`mb-1 flex w-full items-center ${collapsed ? "justify-center" : "justify-between"} rounded-xl border-l-2 px-3 py-2.5 text-left text-sm font-semibold transition-colors ${selected ? "border-[#FF6B35] bg-[#F5F0EB] text-[#0A0A0F]" : "border-transparent text-[#4A5278] hover:bg-[#F5F0EB] hover:text-[#0A0A0F]"}`}
      >
        <span className={`inline-flex items-center ${collapsed ? "gap-0" : "gap-3"}`}>
          <Icon className="h-4 w-4 shrink-0" />
          {!collapsed && item.label}
        </span>
        {!collapsed && item.badge && <span className="rounded-full bg-gradient-to-r from-[#FF6B35] to-[#CC0055] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white shadow-sm">{item.badge}</span>}
      </button>
    </Link>
  );
}

function RailContent({ active, collapsed = false, onNavigate }: { active?: string; collapsed?: boolean; onNavigate?: () => void }) {
  const [email, setEmail] = useState("");

  return (
    <div className="space-y-4">
      <nav className="rounded-2xl border border-black/5 bg-white p-2 shadow-sm">
        <div className={`mb-3 flex items-center ${collapsed ? "justify-center" : "justify-between"} px-2 py-1`}>
          <Link href="/home" aria-label="Return to prototype home"><SprkMark collapsed={collapsed} /></Link>
        </div>
        {mainNav.map((item) => (
          <NavItem key={item.label} item={item} selected={(active === "home" && item.label === "Home") || (active === "article" && item.label === "Articles")} collapsed={collapsed} onNavigate={onNavigate} />
        ))}
        <div className="mt-4 border-t border-black/5 pt-4">
          {!collapsed && <span className="px-3 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#FF6B35]">Prototype Navigation</span>}
          {toolNav.map((item) => <NavItem key={item.label} item={item} collapsed={collapsed} onNavigate={onNavigate} />)}
        </div>
        <div className="mt-4 border-t border-black/5 pt-4">
          {!collapsed && <span className="px-3 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#FF6B35]">Your*SPRKS</span>}
          {mySprks.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.label} title={collapsed ? item.label : undefined} onClick={() => toast(`Loading ${item.label}…`)} className={`mt-1 flex w-full items-center ${collapsed ? "justify-center" : "justify-between"} rounded-xl px-3 py-2.5 text-sm font-semibold text-[#4A5278] hover:bg-[#F5F0EB] hover:text-[#0A0A0F]`}>
                <span className={`inline-flex items-center ${collapsed ? "gap-0" : "gap-3"}`}><Icon className="h-4 w-4" /> {!collapsed && item.label}</span>
                {!collapsed && item.badge && <span className="rounded-full bg-[#F0E8E4] px-2 py-0.5 text-[10px] text-[#CC0055]">{item.badge}</span>}
              </button>
            );
          })}
        </div>
      </nav>

      {!collapsed && (
        <>
          <div className="relative overflow-hidden rounded-2xl border border-[#F0E8E4] bg-[#F5F0EB] p-5 shadow-sm">
            <img src={`${import.meta.env.BASE_URL}assets/wireframe/light_balenciaga_card.png`} alt="Creator commerce workspace" className="absolute inset-0 h-full w-full object-cover opacity-18" />
            <Sparkles className="absolute -right-5 bottom-4 h-24 w-24 text-[#C4A09A]/40" />
            <h3 className="relative text-lg font-extrabold leading-tight text-[#0A0A0F]">Bring your ideas to life on SPRK*</h3>
            <p className="relative mt-2 text-xs font-light leading-relaxed text-[#4A5278]">Create, share, and connect with a community that inspires.</p>
            <Link href="/yoursprk"><button type="button" className="relative mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#C4A09A] px-4 py-2 text-xs font-bold text-white hover:bg-[#8E7A8A]"><Plus className="h-3 w-3" /> Open Hub</button></Link>
          </div>

          <form
            className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm"
            onSubmit={(event) => {
              event.preventDefault();
              if (!email) return toast.error("Please enter your email address.");
              toast.success("Subscribed to The Spark Letter.");
              setEmail("");
            }}
          >
            <span className="label-caps text-[#FF6B35]">The Spark Letter</span>
            <p className="mt-2 text-xs font-light leading-relaxed text-[#4A5278]">Curated inspiration, creator features, and community highlights — straight to your inbox.</p>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" className="mt-3 w-full rounded-full border border-black/10 bg-[#F5F0EB] px-3 py-2 text-xs outline-none focus:border-[#FF6B35]" />
            <button className="mt-2 w-full rounded-full bg-[#0A0A0F] px-3 py-2 text-xs font-bold text-white hover:bg-[#1E2235]">Subscribe</button>
          </form>

          <AdCarousel variant="rail" compact staticMode />

          <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between"><span className="label-caps text-[#FF6B35]">Upcoming events</span><Link href="/pavilion" className="text-[10px] font-bold text-[#FF6B35]">View all</Link></div>
            <div className="space-y-3">
              {events.map((event) => (
                <article key={event.title} className="grid grid-cols-[46px_1fr] gap-3 rounded-xl border border-black/5 p-2">
                  <div className="rounded-lg bg-[#F5F0EB] px-2 py-2 text-center text-[10px] font-extrabold leading-tight text-[#0A0A0F]">{event.date}</div>
                  <div>
                    <h4 className="text-xs font-extrabold text-[#0A0A0F]">{event.title}</h4>
                    <p className="mt-0.5 text-[11px] font-light text-[#4A5278]">{event.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-4 text-[#8E7A8A]">
            <Twitter className="h-4 w-4" /><Instagram className="h-4 w-4" /><MessageCircle className="h-4 w-4" />
          </div>
        </>
      )}
    </div>
  );
}

function LeftRail({ active, collapsed, onToggle }: { active?: string; collapsed: boolean; onToggle: () => void }) {
  return (
    <aside className={`sticky top-[76px] hidden h-[calc(100vh-5.5rem)] shrink-0 self-start overflow-y-auto pr-1 transition-all duration-300 [scrollbar-width:thin] lg:block ${collapsed ? "w-[76px]" : "w-[280px]"}`}>
      <div className="space-y-3">
        <button type="button" onClick={onToggle} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-black/5 bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#4A5278] shadow-sm hover:bg-[#F5F0EB] hover:text-[#0A0A0F]">
          {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          {!collapsed && "Collapse"}
        </button>
        <RailContent active={active} collapsed={collapsed} />
      </div>
    </aside>
  );
}

function MobileRail({ active, open, onClose }: { active?: string; open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] lg:hidden" role="dialog" aria-modal="true">
      <button className="absolute inset-0 bg-[#0A0A0F]/55 backdrop-blur-sm" onClick={onClose} aria-label="Close navigation overlay" />
      <aside className="absolute left-0 top-0 h-full w-[86vw] max-w-[340px] overflow-y-auto bg-[#F5F0EB] p-4 shadow-2xl">
        <div className="mb-3 flex items-center justify-between">
          <Link href="/home" aria-label="Return to prototype home"><SprkMark /></Link>
          <button onClick={onClose} className="rounded-full bg-white p-2 text-[#4A5278]"><X className="h-4 w-4" /></button>
        </div>
        <RailContent active={active} onNavigate={onClose} />
      </aside>
    </div>
  );
}

function RightRail({ mode = "home" }: { mode?: "home" | "article" }) {
  return (
    <aside className="sticky top-[76px] hidden h-[calc(100vh-5.5rem)] w-[320px] shrink-0 self-start overflow-y-auto pr-1 [scrollbar-width:thin] xl:block">
      <div className="space-y-4">
        {mode === "article" && (
          <div className="relative overflow-hidden rounded-2xl bg-[#1E2235] p-5 text-white shadow-sm">
            <img src={`${import.meta.env.BASE_URL}assets/wireframe/light_balenciaga_card.png`} alt="SPRK Pavilion marketplace" className="absolute inset-0 h-full w-full object-cover opacity-25" />
            <div className="relative">
              <span className="label-caps text-[#C4A09A]">SPRK*Pavilion</span>
              <h3 className="mt-3 text-2xl font-extrabold leading-none tracking-[-0.04em]">Protect your work. Fund your vision. Own your future.</h3>
              <p className="mt-3 text-xs font-light leading-relaxed text-white/78">SPRK provides escrow-backed funding and legal infrastructure for creators and backers.</p>
              <div className="mt-4 grid gap-2">
                <Link href="/pavilion"><button className="w-full rounded-xl bg-[#C4A09A] px-3 py-3 text-left text-xs font-bold text-[#0A0A0F]"><ShieldCheck className="mr-2 inline h-4 w-4" /> Open Pavilion</button></Link>
                <Link href="/os"><button className="w-full rounded-xl bg-[#F0E8E4] px-3 py-3 text-left text-xs font-bold text-[#0A0A0F]"><Settings2 className="mr-2 inline h-4 w-4" /> Open editor tools</button></Link>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <span className="label-caps text-[#FF6B35]"><Flame className="mr-1 inline h-3 w-3 text-[#FF6B35]" /> Trending now</span>
            <button onClick={() => toast("Refreshing trends…")} className="rounded-full border border-black/10 p-1.5 text-[#8E7A8A] hover:text-[#0A0A0F]"><Sparkles className="h-3.5 w-3.5" /></button>
          </div>
          {trends.map((trend, idx) => (
            <button key={trend.label} onClick={() => toast(`Loading ${trend.label}…`)} className="grid w-full grid-cols-[24px_1fr] gap-2 rounded-xl px-2 py-2.5 text-left hover:bg-[#F5F0EB]">
              <span className="text-sm font-extrabold text-[#FF6B35]">{idx + 1}</span>
              <span>
                <span className="block text-xs font-extrabold text-[#0A0A0F]">{trend.label}</span>
                <span className="mt-0.5 flex justify-between text-[10px] font-bold text-[#4A5278]"><em className="not-italic text-[#CC0055]">{trend.tag}</em><span className="text-[#FF6B35]">{trend.posts}</span></span>
              </span>
            </button>
          ))}
          <button onClick={() => toast("Loading all trends…")} className="mt-2 w-full text-center text-xs font-extrabold text-[#FF6B35] hover:text-[#CC0055]">View All Trending →</button>
        </div>

        <AdCarousel variant="rail" />

        <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between"><span className="label-caps text-[#FF6B35]">Upcoming events</span><Link href="/pavilion" className="text-[10px] font-bold text-[#FF6B35]">View all</Link></div>
          <div className="space-y-3">
            {events.map((event) => (
              <article key={event.title} className="grid grid-cols-[48px_1fr] gap-3 rounded-xl border border-black/5 p-2">
                <div className="rounded-lg bg-[#F5F0EB] px-2 py-2 text-center text-[10px] font-extrabold leading-tight text-[#0A0A0F]">{event.date}</div>
                <div>
                  <h4 className="text-xs font-extrabold text-[#0A0A0F]">{event.title}</h4>
                  <p className="mt-0.5 text-[11px] font-light text-[#4A5278]">{event.desc}</p>
                  <Link href="/pavilion"><button className="mt-2 rounded-full border border-black/10 px-3 py-1 text-[10px] font-bold hover:bg-[#0A0A0F] hover:text-white">Register</button></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

function Header({ onMenu, onToggleRail, railCollapsed }: { onMenu: () => void; onToggleRail: () => void; railCollapsed: boolean }) {
  const [, setLocation] = useLocation();
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 px-4 py-3 backdrop-blur-md md:px-8">
      <div className="mx-auto flex max-w-[1440px] items-center gap-3">
        <button onClick={onMenu} className="rounded-full border border-black/10 p-2 text-[#4A5278] hover:bg-[#F5F0EB] lg:hidden" aria-label="Open navigation"><Menu className="h-5 w-5" /></button>
        <Link href="/home" className="shrink-0"><SprkMark /></Link>
        <button onClick={onToggleRail} className="hidden rounded-full border border-black/10 px-3 py-2 text-xs font-bold text-[#4A5278] hover:bg-[#F5F0EB] hover:text-[#0A0A0F] lg:inline-flex">
          {railCollapsed ? "Expand nav" : "Collapse nav"}
        </button>
        <div className="hidden flex-1 items-center rounded-full border border-black/10 bg-white px-4 py-2 md:flex">
          <Search className="mr-2 h-4 w-4 text-[#8E7A8A]" />
          <input className="w-full bg-transparent text-sm font-light outline-none placeholder:text-[#8E7A8A]" placeholder="Search creators, clips, and more…" />
        </div>
        <button onClick={() => toast("Going back…")} className="hidden rounded-full border border-black/10 p-2 text-[#8E7A8A] hover:text-[#0A0A0F] md:block"><ChevronDown className="h-4 w-4 rotate-90" /></button>
        <button onClick={() => toast("Going forward…")} className="hidden rounded-full border border-black/10 p-2 text-[#8E7A8A] hover:text-[#0A0A0F] md:block"><ChevronDown className="h-4 w-4 -rotate-90" /></button>
        <Link href="/pavilion" className="hidden rounded-full border border-black/10 px-4 py-2 text-xs font-bold text-[#0A0A0F] hover:bg-[#F5F0EB] sm:inline-flex"><Store className="mr-1.5 h-3.5 w-3.5" /> Pavilion</Link>
        <button onClick={() => setLocation("/yoursprk")} className="inline-flex items-center gap-1.5 rounded-full bg-[#C4A09A] px-4 py-2 text-xs font-bold text-white hover:bg-[#8E7A8A]"><Plus className="h-3 w-3" /> Hub</button>
        <button onClick={() => toast("Notification center opened.")} className="rounded-full p-2 text-[#4A5278] hover:bg-[#F5F0EB]"><Bell className="h-5 w-5" /></button>
        <button onClick={() => setLocation("/os")} className="hidden rounded-full bg-[#0A0A0F] px-4 py-2 text-xs font-bold text-white hover:bg-[#1E2235] sm:inline-flex"><Settings2 className="mr-1.5 h-3.5 w-3.5" /> SPRK*OS</button>
      </div>
    </header>
  );
}

export default function FeedShell({ children, active = "home", railMode = "home" }: FeedShellProps) {
  const [railCollapsed, setRailCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F0EB]/45 text-[#0A0A0F]">
      <PrototypeFamilyRibbon active={active} />
      <Header onMenu={() => setMobileOpen(true)} onToggleRail={() => setRailCollapsed((prev) => !prev)} railCollapsed={railCollapsed} />
      <MobileRail active={active} open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="mx-auto flex max-w-[1520px] items-start gap-4 px-4 py-4 md:px-8">
        <LeftRail active={active} collapsed={railCollapsed} onToggle={() => setRailCollapsed((prev) => !prev)} />
        <main className="min-w-0 flex-1">{children}</main>
        <RightRail mode={railMode} />
      </div>
    </div>
  );
}
