import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { getPrototypeAccessEmail, getYoursprkDashboardEmail, isValidEmail, saveYoursprkDashboardEmail } from "@/lib/accessGate";
import {
  ArrowUpRight,
  BarChart3,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  DollarSign,
  Download,
  Filter,
  Inbox,
  LayoutDashboard,
  Library,
  LogOut,
  Play,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import SharedLayout from "@/components/SharedLayout";

type HubView = "dashboard" | "content" | "performance" | "financials" | "business" | "messages" | "academy" | "account";
type DealStatus = "Pending" | "In Escrow" | "Completed" | "Returned";

type SprkItem = {
  id: string;
  title: string;
  type: string;
  thumbnail: string;
  platforms: string[];
  tags: string[];
  views: number;
  engagement: number;
  earnings: number;
  date: string;
};

type Deal = {
  id: string;
  brand: string;
  title: string;
  amount: number;
  status: DealStatus;
  date: string;
  notes: string;
};

const base = import.meta.env.BASE_URL === "/" ? "/" : import.meta.env.BASE_URL;
const thumbnail = `${base}assets/wireframe/bring_in_the_katz_line_dance_preview.png`;
const cookingThumbnail = `${base}assets/wireframe/clip_beautylab_distinct.png`;
const meditationThumbnail = `${base}assets/wireframe/clip_waterfall.png`;
const gamingThumbnail = `${base}assets/wireframe/clip_basketball.png`;

const navItems: Array<{ id: HubView; label: string; icon: typeof LayoutDashboard; badge?: number }> = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "content", label: "Content Library", icon: Library },
  { id: "performance", label: "Performance", icon: BarChart3 },
  { id: "financials", label: "Financials", icon: DollarSign },
  { id: "business", label: "Business Center", icon: BriefcaseBusiness },
  { id: "messages", label: "Messages", icon: Inbox, badge: 3 },
  { id: "academy", label: "SPRK Academy", icon: BookOpen },
  { id: "account", label: "Account", icon: Settings },
];

const sprks: SprkItem[] = [
  {
    id: "sprk-0025-katz",
    title: "Bring in the Katz — Line Dance Launch Cut",
    type: "Short-form video",
    thumbnail,
    platforms: ["SPRK", "TikTok", "Instagram", "YouTube Shorts"],
    tags: ["#BringInTheKatz", "#LineDance", "#SPRK0025"],
    views: 146200,
    engagement: 12.8,
    earnings: 1840,
    date: "Jun 07, 2026",
  },
  {
    id: "sprk-0025-fitcheck",
    title: "SPRK 0025 Fit Check Carousel",
    type: "Carousel",
    thumbnail: `${base}assets/wireframe/ProtoSPRK0025.png`,
    platforms: ["SPRK", "Instagram"],
    tags: ["#FashionDrops", "#LimitedExclusiveYours"],
    views: 88400,
    engagement: 9.4,
    earnings: 920,
    date: "Jun 04, 2026",
  },
  {
    id: "creator-os-recap",
    title: "Creator OS Revenue Recap",
    type: "Clip + article",
    thumbnail,
    platforms: ["SPRK", "YouTube Shorts"],
    tags: ["#CreatorEconomy", "#Revenue"],
    views: 52100,
    engagement: 7.1,
    earnings: 610,
    date: "May 29, 2026",
  },
  {
    id: "table-to-story-supper",
    title: "Table-to-Story Supper Sprint",
    type: "Cooking tutorial",
    thumbnail: cookingThumbnail,
    platforms: ["SPRK", "Instagram", "YouTube Shorts"],
    tags: ["#Cooking", "#FoodCreators", "#KitchenSprint"],
    views: 39400,
    engagement: 8.6,
    earnings: 740,
    date: "May 24, 2026",
  },
  {
    id: "seven-minute-reset",
    title: "Seven-Minute Reset Meditation",
    type: "Guided wellness clip",
    thumbnail: meditationThumbnail,
    platforms: ["SPRK", "TikTok", "Instagram"],
    tags: ["#Meditation", "#Wellness", "#MindfulCreators"],
    views: 67200,
    engagement: 11.1,
    earnings: 980,
    date: "May 21, 2026",
  },
  {
    id: "boss-run-live",
    title: "Boss Run Live: Creator Stream Highlights",
    type: "Gaming live-stream cutdown",
    thumbnail: gamingThumbnail,
    platforms: ["SPRK", "TikTok", "YouTube Shorts", "Twitch"],
    tags: ["#Gaming", "#LiveStreaming", "#Esports"],
    views: 118900,
    engagement: 13.5,
    earnings: 1650,
    date: "May 18, 2026",
  },
];

const deals: Deal[] = [
  { id: "nike-katz", brand: "Nike Culture Lab", title: "Line dance remix amplification", amount: 4400, status: "Pending", date: "Jun 10, 2026", notes: "Brand wants first-look rights for a remix challenge." },
  { id: "beats-sprk", brand: "Beats Studio", title: "Creator sound kit placement", amount: 4800, status: "In Escrow", date: "Jun 13, 2026", notes: "Escrow funded. Awaiting final deliverable review." },
  { id: "puma-fit", brand: "PUMA Select", title: "SPRK 0025 styling bundle", amount: 31200, status: "Completed", date: "May 25, 2026", notes: "Paid and archived with creator invoice." },
  { id: "archive-return", brand: "Archive Haus", title: "Returned campaign concept", amount: 1800, status: "Returned", date: "May 12, 2026", notes: "Returned after scope changed." },
  { id: "wellness-cohort", brand: "Calm Collective", title: "Meditation creator package renewal", amount: 40834, status: "Completed", date: "Apr 29, 2026", notes: "Paid to date through the wellness package renewal." },
];

const activities = [
  "Bring in the Katz reached 100K views across syndicated commerce channels.",
  "Nike Culture Lab sent a partnership offer for the line dance launch cut.",
  "Your SPRK ranked first in Fashion + Movement this week.",
  "Pavilion verified a new brand shortlist against your content package.",
  "SPRK Academy added a Smart Contract Basics live session.",
];

function currency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function number(value: number) {
  return new Intl.NumberFormat("en-US", { notation: value > 99999 ? "compact" : "standard" }).format(value);
}

function statusClass(status: DealStatus) {
  if (status === "Pending") return "border-[var(--warning)] bg-[var(--cream)] text-[var(--ink)]";
  if (status === "In Escrow") return "border-[var(--navy)] bg-[var(--cream)] text-[var(--navy)]";
  if (status === "Completed") return "border-[var(--success)] bg-[var(--cream)] text-[var(--success)]";
  return "border-[var(--steel)] bg-[var(--cream)] text-[var(--steel)]";
}

export default function Yoursprk() {
  const [email, setEmail] = useState("");
  const [authedEmail, setAuthedEmail] = useState(() => getYoursprkDashboardEmail());
  const [view, setView] = useState<HubView>("dashboard");
  const [selectedSprk, setSelectedSprk] = useState<SprkItem | null>(null);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [timeframe, setTimeframe] = useState("Week");
  const [mode, setMode] = useState("By Platform");
  const [sortBy, setSortBy] = useState("Date Created");
  const [query, setQuery] = useState("");
  const [platformFilters, setPlatformFilters] = useState<string[]>(["SPRK", "TikTok", "Instagram", "YouTube Shorts"]);
  const [activeMessage, setActiveMessage] = useState(0);
  const [reply, setReply] = useState("");
  const [savedNotice, setSavedNotice] = useState("");
  const [twoFactor, setTwoFactor] = useState(false);

  const isAuthenticated = authedEmail.length > 0;
  const emailIsValid = isValidEmail(email);

  useEffect(() => {
    const savedDashboardEmail = getYoursprkDashboardEmail();
    if (savedDashboardEmail) {
      setAuthedEmail(savedDashboardEmail);
      return;
    }

    const accessEmail = getPrototypeAccessEmail();
    if (accessEmail) {
      setEmail(accessEmail);
    }
  }, []);
  const displayName = authedEmail ? authedEmail.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()) : "Creator";
  const totalViews = sprks.reduce((sum, item) => sum + item.views, 0);
  const pendingDeals = deals.filter((deal) => deal.status === "Pending").length;

  const filteredSprks = useMemo(() => {
    const matches = sprks.filter((item) => {
      const searchMatch = `${item.title} ${item.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase());
      const platformMatch = item.platforms.some((platform) => platformFilters.includes(platform));
      return searchMatch && platformMatch;
    });

    return [...matches].sort((a, b) => {
      if (sortBy === "Views") return b.views - a.views;
      if (sortBy === "Engagement") return b.engagement - a.engagement;
      if (sortBy === "Earnings") return b.earnings - a.earnings;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [platformFilters, query, sortBy]);

  const login = () => {
    if (!emailIsValid) {
      setSavedNotice("Enter a properly formatted email address to simulate secure access.");
      return;
    }
    const normalizedEmail = email.trim().toLowerCase();
    saveYoursprkDashboardEmail(normalizedEmail);
    setAuthedEmail(normalizedEmail);
    setSavedNotice("Welcome back. Dashboard unlocked for prototype review.");
  };

  const showNotice = (message: string) => {
    setSavedNotice(message);
    window.setTimeout(() => setSavedNotice(""), 2200);
  };

  const togglePlatform = (platform: string) => {
    setPlatformFilters((current) => current.includes(platform) ? current.filter((item) => item !== platform) : [...current, platform]);
  };

  if (!isAuthenticated) {
    return (
      <SharedLayout activeSite="yoursprk">
        <section className="flex min-h-[calc(100vh-180px)] items-center justify-center bg-[var(--cream)] px-[var(--space-lg)] py-[var(--space-4xl)]">
          <div className="grid w-full max-w-5xl gap-[var(--space-2xl)] rounded-[var(--r-xl)] border border-[var(--border)] bg-[var(--white)] p-[var(--space-xl)] shadow-[0_30px_80px_var(--shadow)] md:grid-cols-[1fr_1.1fr] md:p-[var(--space-3xl)]">
            <div className="flex flex-col justify-between gap-[var(--space-2xl)] rounded-[var(--r-lg)] bg-[var(--ink)] p-[var(--space-xl)] text-[var(--white)]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--blush)]">Authenticated creator hub</p>
                <h1 className="mt-[var(--space-md)] font-display text-4xl font-black leading-none md:text-6xl">Welcome back to yourSPRK</h1>
                <p className="mt-[var(--space-lg)] max-w-md text-base text-[var(--cream)]">Manage your creative empire, deal flow, performance, and syndicated commerce package data from one connected dashboard.</p>
              </div>
              <div className="grid gap-[var(--space-md)] sm:grid-cols-3">
                {["Own your data", "Track payouts", "Manage deals"].map((item) => (
                  <div key={item} className="rounded-[var(--r)] border border-[var(--mauve)] p-[var(--space-md)] text-xs font-bold uppercase tracking-[0.12em] text-[var(--cream)]">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center gap-[var(--space-xl)]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--ember)]">Login simulation</p>
                <h2 className="mt-[var(--space-sm)] font-display text-3xl font-black text-[var(--ink)]">Enter any email</h2>
                <p className="mt-[var(--space-sm)] text-sm leading-6 text-[var(--steel)]">This prototype does not authenticate against a production service. Your email simply personalizes the dashboard state for review.</p>
              </div>

              <label className="grid gap-[var(--space-xs)] text-sm font-bold text-[var(--ink)]">
                Email
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && emailIsValid && login()}
                  placeholder="creator@yoursprk.com"
                  className="rounded-[var(--r)] border border-[var(--border)] bg-[var(--white)] px-[var(--space-lg)] py-[var(--space-md)] text-base text-[var(--ink)] outline-none transition focus:border-[var(--ember)] focus:ring-2 focus:ring-[var(--warm)]"
                />
              </label>

              <button
                type="button"
                onClick={login}
                disabled={!emailIsValid}
                className={`inline-flex items-center justify-center gap-[var(--space-sm)] rounded-[var(--r-pill)] border px-[var(--space-xl)] py-[var(--space-md)] text-sm font-black uppercase tracking-[0.12em] shadow-[0_12px_30px_var(--shadow)] transition ${emailIsValid ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--white)] hover:scale-[1.01] hover:bg-[var(--navy)]" : "cursor-not-allowed border-[var(--border)] bg-[var(--cream)] text-[var(--steel)] opacity-80"}`}
              >
                Enter yourSPRK Hub <ArrowUpRight className="h-4 w-4" />
              </button>

              {savedNotice && <p className="rounded-[var(--r)] border border-[var(--warning)] bg-[var(--cream)] p-[var(--space-md)] text-sm font-bold text-[var(--ink)]">{savedNotice}</p>}

              <a href="https://www.yoursprk.com/" target="_blank" rel="noreferrer" className="text-sm font-bold text-[var(--steel)] underline decoration-[var(--blush)] decoration-2 underline-offset-4 hover:text-[var(--ink)]">New to SPRK? Join the Beta</a>
            </div>
          </div>
        </section>
      </SharedLayout>
    );
  }

  return (
    <SharedLayout activeSite="yoursprk">
      <section className="bg-[var(--cream)] px-[var(--space-md)] py-[var(--space-lg)] md:px-[var(--space-2xl)] md:py-[var(--space-2xl)]">
        <div className="mx-auto grid max-w-[1440px] gap-[var(--space-lg)] lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="rounded-[var(--r-xl)] border border-[var(--border)] bg-[var(--white)] p-[var(--space-lg)] shadow-[0_20px_60px_var(--shadow)] lg:sticky lg:top-28 lg:h-[calc(100vh-140px)] lg:overflow-auto">
            <div className="rounded-[var(--r-lg)] bg-gradient-to-br from-[#FF6B35] via-[#E8003D] to-[#CC0055] p-[var(--space-lg)] text-[var(--white)] shadow-[0_18px_45px_var(--shadow)]">
              <div className="flex items-center gap-[var(--space-md)]">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--white)] bg-[var(--white)] text-xl font-black text-[var(--crimson)]">{displayName.slice(0, 1)}</div>
                <div>
                  <p className="font-display text-xl font-black leading-tight">{displayName}</p>
                  <p className="mt-1 inline-flex rounded-[var(--r-pill)] border border-[var(--white)] bg-[var(--white)]/20 px-[var(--space-sm)] py-[var(--space-2xs)] text-[10px] font-black uppercase tracking-[0.14em] text-[var(--white)]">Creator Pro</p>
                </div>
              </div>
              <div className="mt-[var(--space-lg)] grid grid-cols-3 gap-[var(--space-xs)] text-center text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--white)]">
                <span className="rounded-[var(--r)] bg-[var(--white)]/20 p-[var(--space-sm)]">1,234<br />SPRKs</span>
                <span className="rounded-[var(--r)] bg-[var(--white)]/20 p-[var(--space-sm)]">222K<br />Views</span>
                <span className="rounded-[var(--r)] bg-[var(--white)]/20 p-[var(--space-sm)]">$81,234<br />Earned</span>
              </div>
              <button onClick={() => setProfileOpen(true)} className="mt-[var(--space-lg)] w-full rounded-[var(--r-pill)] bg-[var(--white)] px-[var(--space-md)] py-[var(--space-sm)] text-xs font-black uppercase tracking-[0.12em] text-[var(--ink)]">Edit Profile</button>
            </div>

            <nav className="mt-[var(--space-lg)] grid gap-[var(--space-xs)] sm:grid-cols-2 lg:grid-cols-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button key={item.id} onClick={() => setView(item.id)} className={`flex items-center justify-between rounded-[var(--r)] border px-[var(--space-md)] py-[var(--space-sm)] text-left text-sm font-bold transition ${view === item.id ? "border-[var(--ember)] bg-[var(--cream)] text-[var(--ink)]" : "border-[var(--border)] bg-[var(--white)] text-[var(--steel)] hover:text-[var(--ink)]"}`}>
                    <span className="flex items-center gap-[var(--space-sm)]"><Icon className="h-4 w-4" />{item.label}{item.badge && <span className="ml-[var(--space-xs)] rounded-[var(--r-pill)] bg-[var(--crimson)] px-[var(--space-sm)] py-[var(--space-2xs)] text-[10px] font-black leading-none text-[var(--white)]">{item.badge}</span>}</span>
                    {view === item.id && <Check className="h-4 w-4 text-[var(--success)]" />}
                  </button>
                );
              })}
            </nav>

            <div className="mt-[var(--space-lg)] rounded-[var(--r)] border border-[var(--success)] bg-[var(--cream)] p-[var(--space-md)] text-xs text-[var(--ink)]">
              <p className="font-black uppercase tracking-[0.14em] text-[var(--success)]">Connected path</p>
              <p className="mt-[var(--space-xs)] leading-5">SPRK-OS output, Pavilion deal flow, and yourSPRK creator controls share the same demo package.</p>
            </div>
          </aside>

          <main className="min-w-0 rounded-[var(--r-xl)] border border-[var(--border)] bg-[var(--white)] p-[var(--space-lg)] shadow-[0_20px_60px_var(--shadow)] md:p-[var(--space-2xl)]">
            <header className="mb-[var(--space-xl)] flex flex-col gap-[var(--space-md)] border-b border-[var(--border)] pb-[var(--space-lg)] md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--ember)]">yourSPRK authenticated hub</p>
                <h1 className="mt-[var(--space-xs)] font-display text-3xl font-black text-[var(--ink)] md:text-5xl">{navItems.find((item) => item.id === view)?.label}</h1>
                <p className="mt-[var(--space-sm)] max-w-2xl text-sm leading-6 text-[var(--steel)]">Signed in as <strong className="text-[var(--ink)]">{authedEmail}</strong>. This is a simulated control center for creator data, deal flow, performance, and account actions.</p>
              </div>
              <div className="flex flex-wrap items-center gap-[var(--space-sm)]">
                <button onClick={() => setView("messages")} aria-label="Open notifications" className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--cream)] text-[var(--ink)] transition hover:border-[var(--ember)]">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -right-1 -top-1 rounded-[var(--r-pill)] bg-[var(--crimson)] px-[var(--space-xs)] py-[var(--space-2xs)] text-[10px] font-black leading-none text-[var(--white)]">3</span>
                </button>
                <Link href="/os" className="inline-flex items-center gap-[var(--space-xs)] rounded-[var(--r-pill)] bg-[var(--ink)] px-[var(--space-md)] py-[var(--space-sm)] text-xs font-black uppercase tracking-[0.12em] text-[var(--white)]">Create in OS <Sparkles className="h-3.5 w-3.5" /></Link>
                <Link href="/pavilion?handoff=sprk-os" className="inline-flex items-center gap-[var(--space-xs)] rounded-[var(--r-pill)] bg-[var(--grad)] px-[var(--space-md)] py-[var(--space-sm)] text-xs font-black uppercase tracking-[0.12em] text-[var(--white)]">Open Pavilion <ArrowUpRight className="h-3.5 w-3.5" /></Link>
              </div>
            </header>

            {savedNotice && <div className="mb-[var(--space-lg)] rounded-[var(--r)] border border-[var(--success)] bg-[var(--cream)] p-[var(--space-md)] text-sm font-bold text-[var(--ink)]">{savedNotice}</div>}

            {view === "dashboard" && (
              <div className="grid gap-[var(--space-xl)]">
                <div className="grid gap-[var(--space-md)] md:grid-cols-2 xl:grid-cols-4">
                  {[
                    { label: "Total Views", value: number(totalViews), meta: "+18% vs last week", icon: TrendingUp },
                    { label: "Total Engagement", value: "10.2%", meta: "Above category average", icon: Sparkles },
                    { label: "Top Content", value: "Bring in the Katz", meta: `${number(sprks[0].views)} views`, icon: Play },
                    { label: "Pending Deals", value: String(pendingDeals), meta: "Awaiting response", icon: BriefcaseBusiness },
                  ].map((card) => {
                    const Icon = card.icon;
                    return <button key={card.label} onClick={() => card.label === "Pending Deals" ? setView("financials") : setView(card.label === "Top Content" ? "content" : "performance")} className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--cream)] p-[var(--space-lg)] text-left transition hover:border-[var(--ember)]"><Icon className="h-5 w-5 text-[var(--ember)]" /><p className="mt-[var(--space-md)] text-xs font-black uppercase tracking-[0.14em] text-[var(--steel)]">{card.label}</p><p className="mt-[var(--space-xs)] font-display text-3xl font-black text-[var(--ink)]">{card.value}</p><p className="mt-[var(--space-xs)] text-xs font-bold text-[var(--success)]">{card.meta}</p></button>;
                  })}
                </div>
                <section className="grid gap-[var(--space-lg)] xl:grid-cols-[1.2fr_0.8fr]">
                  <Panel title="Recent SPRKs" action={<button onClick={() => setView("content")} className="text-xs font-black uppercase tracking-[0.12em] text-[var(--ember)]">View all content</button>}>
                    <div className="grid gap-[var(--space-md)] md:grid-cols-2">
                      {sprks.slice(0, 2).map((item) => <ContentMini key={item.id} item={item} onClick={() => setSelectedSprk(item)} />)}
                    </div>
                  </Panel>
                  <Panel title="Recent Activity">
                    <div className="grid gap-[var(--space-sm)]">
                      {activities.map((activity, index) => <button key={activity} onClick={() => index === 1 ? setSelectedDeal(deals[0]) : showNotice("Activity detail opened in prototype state.")} className="flex items-center justify-between rounded-[var(--r)] border border-[var(--border)] p-[var(--space-md)] text-left text-sm text-[var(--ink)] hover:border-[var(--ember)]"><span>{activity}</span><ChevronRight className="h-4 w-4 text-[var(--steel)]" /></button>)}
                    </div>
                  </Panel>
                </section>
              </div>
            )}

            {view === "content" && (
              <Panel title="Content Library" action={<Link href="/os" className="text-xs font-black uppercase tracking-[0.12em] text-[var(--ember)]">Create first / next SPRK</Link>}>
                <div className="mb-[var(--space-lg)] grid gap-[var(--space-md)] lg:grid-cols-[1fr_auto_auto]">
                  <label className="flex items-center gap-[var(--space-sm)] rounded-[var(--r)] border border-[var(--border)] bg-[var(--white)] px-[var(--space-md)] py-[var(--space-sm)]"><Search className="h-4 w-4 text-[var(--steel)]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title or hashtag" className="w-full bg-transparent text-sm outline-none" /></label>
                  <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="rounded-[var(--r)] border border-[var(--border)] bg-[var(--white)] px-[var(--space-md)] py-[var(--space-sm)] text-sm font-bold text-[var(--ink)]"><option>Date Created</option><option>Views</option><option>Engagement</option><option>Earnings</option></select>
                  <div className="flex flex-wrap gap-[var(--space-xs)] rounded-[var(--r)] border border-[var(--border)] p-[var(--space-xs)]"><Filter className="m-[var(--space-xs)] h-4 w-4 text-[var(--steel)]" />{["SPRK", "TikTok", "Instagram", "YouTube Shorts"].map((platform) => <button key={platform} onClick={() => togglePlatform(platform)} className={`rounded-[var(--r-pill)] px-[var(--space-sm)] py-[var(--space-xs)] text-xs font-black ${platformFilters.includes(platform) ? "bg-[var(--ink)] text-[var(--white)]" : "bg-[var(--cream)] text-[var(--steel)]"}`}>{platform}</button>)}</div>
                </div>
                <div className="grid gap-[var(--space-md)] md:grid-cols-2 xl:grid-cols-3">
                  {filteredSprks.map((item) => <ContentCard key={item.id} item={item} onClick={() => setSelectedSprk(item)} />)}
                </div>
                {filteredSprks.length === 0 && <div className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--cream)] p-[var(--space-xl)] text-center"><p className="font-black text-[var(--ink)]">No SPRKs match those filters.</p><Link href="/os" className="mt-[var(--space-md)] inline-flex rounded-[var(--r-pill)] bg-[var(--grad)] px-[var(--space-lg)] py-[var(--space-sm)] text-xs font-black uppercase tracking-[0.12em] text-[var(--white)]">Create your first one in SPRK-OS</Link></div>}
              </Panel>
            )}

            {view === "performance" && (
              <Panel title="Performance Analytics">
                <Segmented options={["Week", "Month", "Quarter", "YTD"]} value={timeframe} onChange={setTimeframe} />
                <div className="mt-[var(--space-md)]"><Segmented options={["By Platform", "By Content Type", "By Culture Focus"]} value={mode} onChange={setMode} /></div>
                <PerformanceChart />
                <ResponsiveTable headers={["Platform", "Views", "Engagement", "Earnings"]} rows={[["SPRK", "68K", "14.2%", "$780"], ["TikTok", "52K", "10.8%", "$420"], ["Instagram", "31K", "8.1%", "$260"], ["YouTube Shorts", "24K", "7.4%", "$210"]]} />
              </Panel>
            )}

            {view === "financials" && (
              <Panel title="Financials & Deal Management">
                <div className="mb-[var(--space-lg)] grid gap-[var(--space-md)] md:grid-cols-4">{[["Total earnings", "$81,234"], ["Pending escrow", "$4,800"], ["Paid to date", "$72,034"], ["Next payout", "$4,400"]].map(([label, value]) => <div key={label} className="rounded-[var(--r)] border border-[var(--border)] bg-[var(--cream)] p-[var(--space-md)]"><p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--steel)]">{label}</p><p className="mt-[var(--space-xs)] font-display text-2xl font-black text-[var(--ink)]">{value}</p></div>)}</div>
                <div className="grid gap-[var(--space-md)]">{deals.map((deal) => <button key={deal.id} onClick={() => setSelectedDeal(deal)} className="grid gap-[var(--space-md)] rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--white)] p-[var(--space-lg)] text-left transition hover:border-[var(--ember)] md:grid-cols-[1fr_auto_auto]"><div><p className="font-black text-[var(--ink)]">{deal.brand}</p><p className="text-sm text-[var(--steel)]">{deal.title}</p></div><span className={`h-fit rounded-[var(--r-pill)] border px-[var(--space-md)] py-[var(--space-xs)] text-xs font-black uppercase tracking-[0.1em] ${statusClass(deal.status)}`}>{deal.status}</span><span className="font-display text-2xl font-black text-[var(--ink)]">{currency(deal.amount)}</span></button>)}</div>
              </Panel>
            )}

            {view === "business" && (
              <Panel title="Business Center">
                <div className="grid gap-[var(--space-md)] md:grid-cols-2">{[
                  ["Financial Statements", "Quarterly summaries and payout history", "Download Q2 2026"],
                  ["Smart Contracts & Escrow", "Understand how escrow protects creator revenue", "Open explainer"],
                  ["Tax Resources", "1099 forms, estimated quarterly tax guidance", "Download guide"],
                  ["Agreements & Legal", "Creator terms and partnership templates", "View templates"],
                ].map(([title, desc, action]) => <button key={title} onClick={() => showNotice(`${action} simulated for review.`)} className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--cream)] p-[var(--space-lg)] text-left hover:border-[var(--ember)]"><Download className="h-5 w-5 text-[var(--ember)]" /><p className="mt-[var(--space-md)] font-black text-[var(--ink)]">{title}</p><p className="mt-[var(--space-xs)] text-sm text-[var(--steel)]">{desc}</p><p className="mt-[var(--space-md)] text-xs font-black uppercase tracking-[0.12em] text-[var(--ember)]">{action}</p></button>)}</div>
              </Panel>
            )}

            {view === "messages" && (
              <Panel title="Messages & Notifications">
                <div className="grid gap-[var(--space-lg)] lg:grid-cols-[320px_1fr]">
                  <div className="grid gap-[var(--space-sm)]">{["Nike is interested in partnering", "Your content is trending", "SPRK Academy: New course"].map((subject, index) => <button key={subject} onClick={() => setActiveMessage(index)} className={`rounded-[var(--r)] border p-[var(--space-md)] text-left ${activeMessage === index ? "border-[var(--ember)] bg-[var(--cream)]" : "border-[var(--border)] bg-[var(--white)]"}`}><p className="font-black text-[var(--ink)]">{subject}</p><p className="text-xs text-[var(--steel)]">{index === 0 ? "Brand Outreach" : "SPRK System"}</p></button>)}</div>
                  <div className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--cream)] p-[var(--space-lg)]"><p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--ember)]">Thread</p><h3 className="mt-[var(--space-sm)] font-display text-2xl font-black text-[var(--ink)]">{["Nike is interested in partnering", "Your content is trending", "SPRK Academy: New course"][activeMessage]}</h3><p className="mt-[var(--space-md)] text-sm leading-6 text-[var(--steel)]">This simulated message connects creator outreach, platform alerts, and education into one hub. Replying below confirms the interaction path without sending anything externally.</p><textarea value={reply} onChange={(event) => setReply(event.target.value)} placeholder="Write a prototype reply..." className="mt-[var(--space-lg)] min-h-28 w-full rounded-[var(--r)] border border-[var(--border)] bg-[var(--white)] p-[var(--space-md)] outline-none focus:border-[var(--ember)]" /><button disabled={!reply.trim()} onClick={() => { setReply(""); showNotice("Reply saved in prototype state."); }} className="mt-[var(--space-md)] rounded-[var(--r-pill)] bg-[var(--ink)] px-[var(--space-lg)] py-[var(--space-sm)] text-xs font-black uppercase tracking-[0.12em] text-[var(--white)] disabled:cursor-not-allowed disabled:bg-[var(--steel)]">Send Reply</button></div>
                </div>
              </Panel>
            )}

            {view === "academy" && (
              <Panel title="SPRK Academy">
                <div className="grid gap-[var(--space-md)] md:grid-cols-3">{[
                  ["Maximizing Creator Revenue", "Jun 18, 2026", "Maya Chen", "45 min"],
                  ["Smart Contract Basics", "Jun 20, 2026", "Andre Miles", "60 min"],
                  ["Building Your Brand on SPRK", "Jun 24, 2026", "Leah Stone", "50 min"],
                ].map(([title, date, instructor, duration]) => <button key={title} onClick={() => showNotice(`${title} RSVP saved.`)} className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--cream)] p-[var(--space-lg)] text-left hover:border-[var(--ember)]"><BookOpen className="h-5 w-5 text-[var(--ember)]" /><p className="mt-[var(--space-md)] font-black text-[var(--ink)]">{title}</p><p className="mt-[var(--space-xs)] text-sm text-[var(--steel)]">{date} • {duration}</p><p className="mt-[var(--space-xs)] text-sm font-bold text-[var(--ink)]">Instructor: {instructor}</p><p className="mt-[var(--space-md)] text-xs font-black uppercase tracking-[0.12em] text-[var(--ember)]">Register</p></button>)}</div>
                <div className="mt-[var(--space-lg)] rounded-[var(--r-lg)] border border-[var(--success)] bg-[var(--cream)] p-[var(--space-lg)]"><p className="font-black text-[var(--ink)]">Completed Course</p><button onClick={() => showNotice("Certificate download simulated.")} className="mt-[var(--space-sm)] inline-flex items-center gap-[var(--space-xs)] text-sm font-black text-[var(--success)]"><Download className="h-4 w-4" /> Download Creator Revenue Certificate</button></div>
              </Panel>
            )}

            {view === "account" && (
              <Panel title="Account Settings">
                <div className="grid gap-[var(--space-md)]">
                  <SettingsBlock title="Profile" desc="Edit display name, bio, and creator category." action="Save Profile" onClick={() => showNotice("Profile settings saved.")} />
                  <SettingsBlock title="Notification Preferences" desc="Deal notifications, performance alerts, messages, and Academy updates are enabled." action="Save Notifications" onClick={() => showNotice("Notification preferences saved.")} />
                  <SettingsBlock title="Billing & Payout" desc="Payout method ending in 5678. Payouts process monthly on the 15th." action="Edit Payout Method" onClick={() => showNotice("Payout edit flow opened in prototype state.")} />
                  <button onClick={() => setTwoFactor((current) => !current)} className="flex items-center justify-between rounded-[var(--r)] border border-[var(--border)] bg-[var(--cream)] p-[var(--space-lg)] text-left"><span><span className="block font-black text-[var(--ink)]">Privacy & Security</span><span className="text-sm text-[var(--steel)]">Two-factor authentication is {twoFactor ? "enabled" : "disabled"}.</span></span><ShieldCheck className={`h-6 w-6 ${twoFactor ? "text-[var(--success)]" : "text-[var(--steel)]"}`} /></button>
                  <button onClick={() => setAuthedEmail("")} className="rounded-[var(--r)] border border-[var(--error)] bg-[var(--white)] p-[var(--space-lg)] text-left font-black text-[var(--error)]"><LogOut className="mb-[var(--space-sm)] h-5 w-5" /> Sign Out</button>
                </div>
              </Panel>
            )}
          </main>
        </div>
      </section>

      {profileOpen && <Modal title="Edit Profile" onClose={() => setProfileOpen(false)}><div className="grid gap-[var(--space-md)]"><label className="grid gap-[var(--space-xs)] text-sm font-bold text-[var(--ink)]">Display name<input defaultValue={displayName} className="rounded-[var(--r)] border border-[var(--border)] p-[var(--space-md)] outline-none focus:border-[var(--ember)]" /></label><label className="grid gap-[var(--space-xs)] text-sm font-bold text-[var(--ink)]">Bio<textarea defaultValue="Creator, dancer, and culture strategist building with SPRK." className="min-h-24 rounded-[var(--r)] border border-[var(--border)] p-[var(--space-md)] outline-none focus:border-[var(--ember)]" /></label><button onClick={() => { setProfileOpen(false); showNotice("Profile changes saved."); }} className="rounded-[var(--r-pill)] bg-gradient-to-r from-[#FF6B35] via-[#E8003D] to-[#CC0055] px-[var(--space-lg)] py-[var(--space-sm)] text-xs font-black uppercase tracking-[0.12em] text-[var(--white)]">Save Profile</button></div></Modal>}
      {selectedSprk && <Modal title={selectedSprk.title} onClose={() => setSelectedSprk(null)}><img src={selectedSprk.thumbnail} alt="Selected SPRK thumbnail" className="max-h-[52vh] w-full rounded-[var(--r)] object-cover" /><div className="mt-[var(--space-md)] grid gap-[var(--space-sm)] text-sm text-[var(--ink)]"><p><strong>Platforms:</strong> {selectedSprk.platforms.join(", ")}</p><p><strong>Views:</strong> {number(selectedSprk.views)} • <strong>Engagement:</strong> {selectedSprk.engagement}% • <strong>Earnings:</strong> {currency(selectedSprk.earnings)}</p><Link href="/pavilion?handoff=sprk-os" className="mt-[var(--space-sm)] inline-flex w-fit rounded-[var(--r-pill)] bg-[var(--ink)] px-[var(--space-lg)] py-[var(--space-sm)] text-xs font-black uppercase tracking-[0.12em] text-[var(--white)]">View in Pavilion</Link></div></Modal>}
      {selectedDeal && <Modal title={selectedDeal.title} onClose={() => setSelectedDeal(null)}><div className="grid gap-[var(--space-md)]"><p className="text-sm text-[var(--steel)]">{selectedDeal.brand} • {selectedDeal.notes}</p><div className="rounded-[var(--r)] bg-[var(--cream)] p-[var(--space-md)]"><p className="font-display text-3xl font-black text-[var(--ink)]">{currency(selectedDeal.amount)}</p><p className="text-sm text-[var(--steel)]">Creator share estimate: {currency(selectedDeal.amount * 0.75)} • SPRK fee estimate: {currency(selectedDeal.amount * 0.08)}</p></div><button onClick={() => { setSelectedDeal(null); showNotice(selectedDeal.status === "Pending" ? "Deal accepted in prototype state." : "Deal detail acknowledged."); }} className="rounded-[var(--r-pill)] bg-[var(--grad)] px-[var(--space-lg)] py-[var(--space-sm)] text-xs font-black uppercase tracking-[0.12em] text-[var(--white)]">{selectedDeal.status === "Pending" ? "Accept Deal" : "View Contract"}</button><button onClick={() => showNotice("Invoice download simulated.")} className="text-left text-sm font-black text-[var(--ember)]">Download Invoice</button></div></Modal>}
    </SharedLayout>
  );
}

function Panel({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return <section className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--white)] p-[var(--space-lg)]"><div className="mb-[var(--space-lg)] flex flex-col gap-[var(--space-sm)] border-b border-[var(--border)] pb-[var(--space-md)] sm:flex-row sm:items-center sm:justify-between"><h2 className="font-display text-2xl font-black text-[var(--ink)]">{title}</h2>{action}</div>{children}</section>;
}

function ContentMini({ item, onClick }: { item: SprkItem; onClick: () => void }) {
  return <button onClick={onClick} className="overflow-hidden rounded-[var(--r)] border border-[var(--border)] bg-[var(--cream)] text-left transition hover:border-[var(--ember)]"><img src={item.thumbnail} alt="" className="h-36 w-full object-cover" /><div className="p-[var(--space-md)]"><p className="font-black text-[var(--ink)]">{item.title}</p><p className="mt-[var(--space-xs)] text-xs font-bold text-[var(--steel)]">{number(item.views)} views • {currency(item.earnings)}</p></div></button>;
}

function ContentCard({ item, onClick }: { item: SprkItem; onClick: () => void }) {
  return <article className="overflow-hidden rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--white)] shadow-[0_14px_40px_var(--shadow)]"><button onClick={onClick} className="w-full text-left"><img src={item.thumbnail} alt={`${item.title} thumbnail`} className="h-56 w-full object-cover" /><div className="grid gap-[var(--space-sm)] p-[var(--space-lg)]"><p className="font-display text-xl font-black text-[var(--ink)]">{item.title}</p><p className="text-sm text-[var(--steel)]">{item.type} • {item.date}</p><div className="flex flex-wrap gap-[var(--space-xs)]">{item.platforms.map((platform) => <span key={platform} className="rounded-[var(--r-pill)] bg-[var(--cream)] px-[var(--space-sm)] py-[var(--space-2xs)] text-[10px] font-black uppercase tracking-[0.1em] text-[var(--ink)]">{platform}</span>)}</div><p className="text-sm font-bold text-[var(--ink)]">{number(item.views)} views • {item.engagement}% engagement • {currency(item.earnings)}</p><span className="text-xs font-black uppercase tracking-[0.12em] text-[var(--ember)]">View Details</span></div></button></article>;
}

function PerformanceChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const userPoints = "64,214 132,192 200,168 268,145 336,121 404,98 472,76";
  const cohortPoints = "64,236 132,226 200,214 268,204 336,190 404,178 472,166 540,154 608,144 676,132 744,122 812,112";

  return (
    <div className="mt-[var(--space-lg)] rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--cream)] p-[var(--space-lg)]">
      <div className="grid gap-[var(--space-lg)] xl:grid-cols-[1fr_240px]">
        <div className="overflow-x-auto">
          <div className="min-w-[860px]">
            <div className="mb-[var(--space-md)] flex flex-wrap items-center justify-between gap-[var(--space-sm)]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--ember)]">2026 income trajectory</p>
                <h3 className="font-display text-2xl font-black text-[var(--ink)]">Animated Jan–Jul creator earnings line</h3>
              </div>
              <div className="flex flex-wrap gap-[var(--space-sm)] text-xs font-bold text-[var(--steel)]">
                <span className="inline-flex items-center gap-[var(--space-xs)]"><span className="h-2.5 w-6 rounded-[var(--r-pill)] bg-[var(--ember)]" /> Your income</span>
                <span className="inline-flex items-center gap-[var(--space-xs)]"><span className="h-2.5 w-6 rounded-[var(--r-pill)] bg-[var(--steel)]" /> Average cohort</span>
              </div>
            </div>
            <svg viewBox="0 0 880 330" role="img" aria-label="2026 monthly income line graph comparing your earnings to average user cohort" className="h-auto w-full rounded-[var(--r)] bg-[var(--white)]">
              <style>{`
                .sprk-line-user { stroke-dasharray: 760; stroke-dashoffset: 760; animation: sprk-draw-line 1.6s var(--ease) forwards; }
                .sprk-marker { opacity: 0; animation: sprk-fade-marker 0.3s var(--ease) forwards; }
                .sprk-marker:nth-of-type(13) { animation-delay: 0.2s; }
                .sprk-marker:nth-of-type(14) { animation-delay: 0.4s; }
                .sprk-marker:nth-of-type(15) { animation-delay: 0.6s; }
                .sprk-marker:nth-of-type(16) { animation-delay: 0.8s; }
                .sprk-marker:nth-of-type(17) { animation-delay: 1s; }
                .sprk-marker:nth-of-type(18) { animation-delay: 1.2s; }
                .sprk-marker:nth-of-type(19) { animation-delay: 1.4s; }
                @keyframes sprk-draw-line { to { stroke-dashoffset: 0; } }
                @keyframes sprk-fade-marker { to { opacity: 1; } }
              `}</style>
              {[56, 104, 152, 200, 248].map((y) => <line key={y} x1="52" y1={y} x2="828" y2={y} stroke="var(--border)" strokeWidth="1" />)}
              {months.map((month, index) => {
                const x = 64 + index * 68;
                return <g key={month}><line x1={x} y1="48" x2={x} y2="260" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 7" /><text x={x} y="292" textAnchor="middle" className="fill-[var(--steel)] text-[12px] font-bold">{month}</text></g>;
              })}
              {[["$90K", 58], ["$72K", 106], ["$54K", 154], ["$36K", 202], ["$18K", 250]].map(([label, y]) => <text key={label} x="18" y={Number(y) + 4} className="fill-[var(--steel)] text-[11px] font-bold">{label}</text>)}
              <polyline points={cohortPoints} fill="none" stroke="var(--steel)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
              <polyline points={userPoints} fill="none" stroke="var(--ember)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className="sprk-line-user" />
              {userPoints.split(" ").map((point) => { const [x, y] = point.split(",").map(Number); return <circle key={point} cx={x} cy={y} r="7" fill="var(--white)" stroke="var(--ember)" strokeWidth="4" className="sprk-marker" />; })}
              <g>
                <rect x="534" y="64" width="248" height="74" rx="18" fill="var(--cream)" stroke="var(--ember)" />
                <text x="554" y="92" className="fill-[var(--crimson)] text-[14px] font-black">+44% above cohort average</text>
                <text x="554" y="116" className="fill-[var(--steel)] text-[12px] font-bold">Jan–Jul 2026 income run rate</text>
              </g>
            </svg>
          </div>
        </div>
        <div className="rounded-[var(--r)] border border-[var(--border)] bg-[var(--white)] p-[var(--space-md)]">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--steel)]">July comparison</p>
          <div className="mt-[var(--space-lg)] grid gap-[var(--space-md)]">
            <div><div className="mb-[var(--space-xs)] flex justify-between text-xs font-black text-[var(--ink)]"><span>You</span><span>$81.2K</span></div><div className="h-4 rounded-[var(--r-pill)] bg-[var(--cream)]"><div className="h-4 w-full rounded-[var(--r-pill)] bg-[var(--ember)]" /></div></div>
            <div><div className="mb-[var(--space-xs)] flex justify-between text-xs font-black text-[var(--steel)]"><span>Cohort avg.</span><span>$56.4K</span></div><div className="h-4 rounded-[var(--r-pill)] bg-[var(--cream)]"><div className="h-4 w-[69%] rounded-[var(--r-pill)] bg-[var(--steel)]" /></div></div>
            <p className="rounded-[var(--r)] border border-[var(--success)] bg-[var(--cream)] p-[var(--space-sm)] text-xs font-bold leading-5 text-[var(--ink)]">Your July-to-date earnings line is pacing 44% above the average creator cohort.</p>
          </div>
        </div>
      </div>
      <div className="mt-[var(--space-md)] grid gap-[var(--space-md)] md:grid-cols-4">{["Average views: 48.7K", "Engagement: 10.2%", "Top platform: SPRK", "Growth: +18%"].map((stat) => <div key={stat} className="rounded-[var(--r)] bg-[var(--white)] p-[var(--space-md)] text-sm font-bold text-[var(--ink)]">{stat}</div>)}</div>
    </div>
  );
}

function Segmented({ options, value, onChange }: { options: string[]; value: string; onChange: (value: string) => void }) {
  return <div className="flex flex-wrap gap-[var(--space-xs)] rounded-[var(--r)] border border-[var(--border)] bg-[var(--cream)] p-[var(--space-xs)]">{options.map((option) => <button key={option} onClick={() => onChange(option)} className={`rounded-[var(--r-pill)] px-[var(--space-md)] py-[var(--space-sm)] text-xs font-black uppercase tracking-[0.1em] ${value === option ? "bg-[var(--ink)] text-[var(--white)]" : "text-[var(--steel)] hover:text-[var(--ink)]"}`}>{option}</button>)}</div>;
}

function ResponsiveTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return <div className="mt-[var(--space-lg)] overflow-x-auto rounded-[var(--r)] border border-[var(--border)]"><table className="min-w-full text-left text-sm"><thead className="bg-[var(--ink)] text-[var(--white)]"><tr>{headers.map((header) => <th key={header} className="px-[var(--space-md)] py-[var(--space-sm)] font-black uppercase tracking-[0.1em]">{header}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.join("-")} className="border-t border-[var(--border)]">{row.map((cell) => <td key={cell} className="px-[var(--space-md)] py-[var(--space-sm)] text-[var(--ink)]">{cell}</td>)}</tr>)}</tbody></table></div>;
}

function SettingsBlock({ title, desc, action, onClick }: { title: string; desc: string; action: string; onClick: () => void }) {
  return <div className="rounded-[var(--r)] border border-[var(--border)] bg-[var(--cream)] p-[var(--space-lg)]"><p className="font-black text-[var(--ink)]">{title}</p><p className="mt-[var(--space-xs)] text-sm text-[var(--steel)]">{desc}</p><button onClick={onClick} className="mt-[var(--space-md)] rounded-[var(--r-pill)] bg-[var(--ink)] px-[var(--space-md)] py-[var(--space-sm)] text-xs font-black uppercase tracking-[0.12em] text-[var(--white)]">{action}</button></div>;
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--ink)]/70 p-[var(--space-md)]"><div className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-[var(--r-xl)] border border-[var(--border)] bg-[var(--white)] p-[var(--space-lg)] shadow-[0_30px_90px_var(--shadow)]"><div className="mb-[var(--space-lg)] flex items-start justify-between gap-[var(--space-md)]"><h2 className="font-display text-2xl font-black text-[var(--ink)]">{title}</h2><button onClick={onClose} className="rounded-full border border-[var(--border)] p-[var(--space-xs)] text-[var(--ink)]"><X className="h-5 w-5" /></button></div>{children}</div></div>;
}
