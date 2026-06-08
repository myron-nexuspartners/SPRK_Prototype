import { useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  Filter,
  HandCoins,
  HeartHandshake,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { toast } from "sonner";
import SharedLayout from "@/components/SharedLayout";

type TabKey = "discovery" | "content" | "trending" | "deals" | "messages";
type ModalState =
  | { type: "content"; id: string }
  | { type: "creator"; id: string }
  | { type: "deal"; id: string }
  | { type: "info"; id: "escrow" | "rights" | "marketplace" }
  | null;

type Creator = {
  id: string;
  name: string;
  handle: string;
  tier: "Verified" | "Top Creator" | "Elite";
  focus: string[];
  followers: string;
  views: string;
  engagement: string;
  bio: string;
  avatar: string;
};

type ContentRecord = {
  id: string;
  title: string;
  description: string;
  creatorId: string;
  thumbnail: string;
  contentType: "Short Clips" | "Articles" | "Collections" | "Drops";
  tags: string[];
  platforms: string[];
  views: string;
  comments: string;
  saves: string;
  engagement: string;
  earnings: string;
  date: string;
  brandCallout?: string;
  source?: "sprk-os" | "pavilion";
  packageMetadata?: {
    origin: string;
    project: string;
    audio: string;
    format: string;
    rights: string;
    packageStatus: string;
    commerceLane: string;
    exported: string;
  };
};

type Deal = {
  id: string;
  brand: string;
  title: string;
  amount: string;
  status: "Pending" | "In Escrow" | "Accepted" | "Paid" | "Returned";
  due: string;
  terms: string;
};

type Message = {
  id: string;
  sender: string;
  subject: string;
  body: string;
  time: string;
  unread: boolean;
};

const base = import.meta.env.BASE_URL;
const generatedThumbnail = `${base}assets/wireframe/bring_in_the_katz_line_dance_preview.png`;
const fallbackPortrait = "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=700&q=85";
const fallbackDance = "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=900&q=85";
const fallbackStreetwear = "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=85";
const fallbackStudio = "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=85";
const fallbackCooking = "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=900&q=85";
const fallbackMeditation = "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=85";
const fallbackBeauty = "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85";
const fallbackCinema = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=85";
const fallbackFictionActivism = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=900&q=85";

const tabs: { key: TabKey; label: string }[] = [
  { key: "discovery", label: "Discovery Feed" },
  { key: "content", label: "My Content" },
  { key: "trending", label: "Trending" },
  { key: "deals", label: "Deals" },
  { key: "messages", label: "Messages" },
];

const creators: Creator[] = [
  {
    id: "nina-katz",
    name: "Nina Katz",
    handle: "@ninakatzmoves",
    tier: "Elite",
    focus: ["Music Scene", "Dance", "Streetwear"],
    followers: "1.2M",
    views: "18.4M",
    engagement: "12.8%",
    bio: "Choreographer turning community dance moments into brand-safe cultural campaigns.",
    avatar: generatedThumbnail,
  },
  {
    id: "mari-volt",
    name: "Mari Volt",
    handle: "@marivolt",
    tier: "Top Creator",
    focus: ["Gaming & Esports", "Tech & Innovation"],
    followers: "842K",
    views: "9.7M",
    engagement: "9.1%",
    bio: "Competitive creator building high-signal gaming explainers and stream-ready edits.",
    avatar: fallbackPortrait,
  },
  {
    id: "sol-june",
    name: "Sol June",
    handle: "@soljune",
    tier: "Verified",
    focus: ["Fashion & Streetwear", "Drops"],
    followers: "514K",
    views: "5.1M",
    engagement: "8.4%",
    bio: "Streetwear documentarian tracking limited drops and independent designers.",
    avatar: fallbackStreetwear,
  },
  {
    id: "ana-river",
    name: "Ana River",
    handle: "@anariverstudio",
    tier: "Top Creator",
    focus: ["Music Scene", "Creator Tools"],
    followers: "389K",
    views: "4.8M",
    engagement: "10.2%",
    bio: "Producer and educator translating studio workflows into short-form learning loops.",
    avatar: fallbackStudio,
  },
  {
    id: "chef-lina",
    name: "Chef Lina Park",
    handle: "@linalivekitchen",
    tier: "Verified",
    focus: ["Cooking", "Health & Beauty", "Wellness"],
    followers: "276K",
    views: "3.6M",
    engagement: "8.9%",
    bio: "Food creator translating weeknight cooking, skin-friendly nutrition, and sponsor-safe recipes into live-ready packages.",
    avatar: fallbackCooking,
  },
  {
    id: "kai-still",
    name: "Kai Still",
    handle: "@kaistill",
    tier: "Top Creator",
    focus: ["Wellness", "Meditation", "Activism"],
    followers: "608K",
    views: "7.4M",
    engagement: "12.1%",
    bio: "Meditation guide and community organizer building restorative campaigns for wellness and social impact partners.",
    avatar: fallbackMeditation,
  },
  {
    id: "noor-frames",
    name: "Noor Frames",
    handle: "@noorframes",
    tier: "Elite",
    focus: ["TV & Movies", "Fiction", "Activism"],
    followers: "931K",
    views: "11.8M",
    engagement: "10.7%",
    bio: "Narrative critic producing film, streaming, speculative fiction, and culture-change breakdowns for premium campaigns.",
    avatar: fallbackCinema,
  },
];

const baseContent: ContentRecord[] = [
  {
    id: "bring-in-the-katz",
    title: "Bring in the Katz — Line Dance Launch Cut",
    description: "A polished short-form dance package generated through SPRK-OS for syndicated commerce activation.",
    creatorId: "nina-katz",
    thumbnail: generatedThumbnail,
    contentType: "Short Clips",
    tags: ["Music Scene", "Dance", "Syndicated Commerce"],
    platforms: ["SPRK", "TikTok", "Instagram", "YouTube Shorts"],
    views: "88.4K",
    comments: "1.9K",
    saves: "12.2K",
    engagement: "14.6%",
    earnings: "$4,820",
    date: "Today",
    brandCallout: "Brand Partner Ready",
    source: "sprk-os",
    packageMetadata: {
      origin: "SPRK-OS Editor",
      project: "SPRK 0025 / Bring in the Katz",
      audio: "Bring in the Katz",
      format: "9:16 short-form video package",
      rights: "Creator-owned · review-ready · no production launch",
      packageStatus: "Healthy export · Pavilion verified",
      commerceLane: "Syndicated Commerce",
      exported: "Queued from SPRK-OS handoff",
    },
  },
  {
    id: "drop-field-notes",
    title: "SPRK 0025 Drop Field Notes",
    description: "Street-level collection recap with shoppable moments and audience sentiment tags.",
    creatorId: "sol-june",
    thumbnail: fallbackStreetwear,
    contentType: "Drops",
    tags: ["Fashion & Streetwear", "Drops"],
    platforms: ["SPRK", "Instagram"],
    views: "42.7K",
    comments: "620",
    saves: "6.1K",
    engagement: "8.8%",
    earnings: "$1,940",
    date: "Yesterday",
    brandCallout: "Sponsored Drop",
  },
  {
    id: "studio-loop",
    title: "Studio Loop: Hooks That Travel",
    description: "Creator education micro-series about turning one idea into a multi-platform package.",
    creatorId: "ana-river",
    thumbnail: fallbackStudio,
    contentType: "Articles",
    tags: ["Creator Tools", "Music Scene"],
    platforms: ["SPRK", "YouTube Shorts"],
    views: "31.8K",
    comments: "410",
    saves: "4.3K",
    engagement: "7.9%",
    earnings: "$1,120",
    date: "2 days ago",
  },
  {
    id: "ranked-reset",
    title: "Ranked Reset: PC to Mobile Meta",
    description: "Gaming creator breaks down cross-platform skill transfer with sponsor-safe overlays and live-stream cutdowns.",
    creatorId: "mari-volt",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=85",
    contentType: "Short Clips",
    tags: ["Gaming & Esports", "Gaming Live-Streaming", "Tech & Innovation"],
    platforms: ["SPRK", "TikTok", "Twitch"],
    views: "73.9K",
    comments: "980",
    saves: "8.7K",
    engagement: "11.3%",
    earnings: "$3,080",
    date: "3 days ago",
  },
  {
    id: "supper-sprint",
    title: "Table-to-Story Supper Sprint",
    description: "A cooking creator packages a thirty-minute dinner tutorial with wellness notes and shoppable pantry moments.",
    creatorId: "chef-lina",
    thumbnail: fallbackCooking,
    contentType: "Short Clips",
    tags: ["Cooking", "Health & Beauty", "Wellness"],
    platforms: ["SPRK", "Instagram", "YouTube Shorts"],
    views: "58.6K",
    comments: "740",
    saves: "9.2K",
    engagement: "10.5%",
    earnings: "$2,440",
    date: "4 days ago",
    brandCallout: "Grocery Partner Ready",
  },
  {
    id: "seven-minute-reset",
    title: "Seven-Minute Reset Meditation",
    description: "Guided meditation and breathwork sequence built for wellness brands, workplace benefits, and community care activations.",
    creatorId: "kai-still",
    thumbnail: fallbackMeditation,
    contentType: "Short Clips",
    tags: ["Wellness", "Meditation", "Activism"],
    platforms: ["SPRK", "TikTok", "Instagram"],
    views: "91.4K",
    comments: "1.2K",
    saves: "15.8K",
    engagement: "13.9%",
    earnings: "$3,720",
    date: "5 days ago",
    brandCallout: "Community Impact Fit",
  },
  {
    id: "stream-scene-watchlist",
    title: "Stream Scene Watchlist: Fiction Worlds That Move Culture",
    description: "TV, movie, and fiction essay package connecting genre fandom to values-led audience conversations.",
    creatorId: "noor-frames",
    thumbnail: fallbackCinema,
    contentType: "Articles",
    tags: ["TV & Movies", "Fiction", "Activism"],
    platforms: ["SPRK", "YouTube Shorts", "Threads"],
    views: "104.2K",
    comments: "1.6K",
    saves: "11.5K",
    engagement: "11.8%",
    earnings: "$5,160",
    date: "6 days ago",
    brandCallout: "Streaming Partner Ready",
  },
  {
    id: "skin-story-routine",
    title: "Skin Story Routine: Beauty With Ingredient Receipts",
    description: "Health and beauty creator explains a transparent routine with accessible product literacy and creator-owned shopping links.",
    creatorId: "chef-lina",
    thumbnail: fallbackBeauty,
    contentType: "Collections",
    tags: ["Health & Beauty", "Wellness", "Creator Tools"],
    platforms: ["SPRK", "Instagram", "TikTok"],
    views: "49.3K",
    comments: "530",
    saves: "7.4K",
    engagement: "9.6%",
    earnings: "$2,210",
    date: "1 week ago",
  },
  {
    id: "paper-lanterns",
    title: "Paper Lanterns: Fiction for Mutual Aid",
    description: "Short fiction serial and activism explainer pairing creator storytelling with local mutual-aid fundraising prompts.",
    creatorId: "noor-frames",
    thumbnail: fallbackFictionActivism,
    contentType: "Articles",
    tags: ["Fiction", "Activism", "TV & Movies"],
    platforms: ["SPRK", "Substack", "Instagram"],
    views: "37.8K",
    comments: "690",
    saves: "5.9K",
    engagement: "10.1%",
    earnings: "$1,880",
    date: "1 week ago",
  },
];

const dealsSeed: Deal[] = [
  { id: "nike-katz", brand: "Nike x SPRK Drops", title: "Dance challenge launch package", amount: "$12,500", status: "In Escrow", due: "Due Jun 18", terms: "Three short-form cuts, usage cleared for 30-day campaign, creator retains source package." },
  { id: "sonic-loop", brand: "Sonic Archive", title: "Music education activation", amount: "$6,800", status: "Pending", due: "Response by Jun 12", terms: "One educational clip, one live Q&A prompt set, 75% creator share after escrow acceptance." },
  { id: "thread-market", brand: "Thread Market", title: "Streetwear collection recap", amount: "$4,200", status: "Paid", due: "Paid Jun 04", terms: "Completed collection recap with shoppable article cards and proof-of-performance export." },
];

const messages: Message[] = [
  { id: "m1", sender: "Nike x SPRK Drops", subject: "Partnership opportunity: Bring in the Katz", body: "We would like to discuss activating the line dance cut as a creator-owned campaign. The package metadata and Pavilion performance are exactly what our team needs to review.", time: "2h ago", unread: true },
  { id: "m2", sender: "SPRK System", subject: "Your content is trending in Music Scene", body: "Congratulations. Bring in the Katz is currently ranked in the top music and dance lane, with healthy completion and save rates.", time: "Today", unread: true },
  { id: "m3", sender: "SPRK Academy", subject: "Creator education feature request", body: "Your SPRK-OS to Pavilion workflow has been selected for a creator education walkthrough in the next prototype review cycle.", time: "Yesterday", unread: false },
];

const cultures = ["Gaming & Esports", "Gaming Live-Streaming", "Cooking", "Meditation", "Health & Beauty", "Wellness", "TV & Movies", "Fiction", "Activism", "Fashion & Streetwear", "Music Scene", "Tech & Innovation", "Dance", "Creator Tools", "Drops"];

function creatorFor(id: string) {
  return creators.find((creator) => creator.id === id) ?? creators[0];
}

function ShellCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-[var(--r-lg)] border border-[color:var(--border)] bg-[var(--white)] shadow-sm ${className}`}>{children}</div>;
}

function GradientButton({ children, onClick, disabled = false }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean }) {
  return (
    <button type="button" disabled={disabled} onClick={onClick} className="inline-flex items-center justify-center gap-2 rounded-[var(--r-pill)] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.1em] text-[var(--white)] shadow-sm transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50" style={{ backgroundImage: "var(--grad)" }}>
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return <button type="button" onClick={onClick} className="inline-flex items-center justify-center gap-2 rounded-[var(--r-pill)] border border-[color:var(--border)] bg-[var(--cream)] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.1em] text-[var(--ink)] transition-colors hover:bg-[var(--warm)]">{children}</button>;
}

function ContentCard({ record, onOpen, onCreator, compact = false }: { record: ContentRecord; onOpen: (id: string) => void; onCreator: (id: string) => void; compact?: boolean }) {
  const creator = creatorFor(record.creatorId);
  return (
    <ShellCard className="overflow-hidden transition-transform duration-300 hover:-translate-y-1">
      <button type="button" onClick={() => onOpen(record.id)} className="block w-full text-left">
        <div className={`relative overflow-hidden bg-[var(--navy)] ${compact ? "aspect-[4/3]" : "aspect-video"}`}>
          <img src={record.thumbnail} alt={`${record.title} preview`} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/80 via-transparent to-transparent" />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <span className="rounded-[var(--r-pill)] bg-[var(--white)]/95 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[var(--ink)]">{record.contentType}</span>
            {record.source === "sprk-os" && <span className="rounded-[var(--r-pill)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[var(--white)]" style={{ backgroundImage: "var(--grad)" }}>New from SPRK-OS</span>}
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 text-[var(--white)]">
            <span className="text-xs font-bold">{record.views} views</span>
            <span className="text-xs font-bold">{record.engagement}</span>
          </div>
        </div>
      </button>
      <div className="space-y-4 p-4">
        <button type="button" onClick={() => onCreator(creator.id)} className="flex items-center gap-3 text-left">
          <img src={creator.avatar} alt="" className="h-10 w-10 rounded-[var(--r-pill)] object-cover" />
          <span><span className="block text-sm font-extrabold text-[var(--ink)]">{creator.name}</span><span className="block text-xs font-bold text-[var(--mauve)]">{creator.tier} · {creator.handle}</span></span>
        </button>
        <div><h3 className="text-lg font-extrabold leading-tight tracking-[-0.03em] text-[var(--ink)]">{record.title}</h3><p className="mt-2 line-clamp-2 text-sm font-light leading-relaxed text-[var(--steel)]">{record.description}</p></div>
        {record.packageMetadata && <div className="rounded-[var(--r)] border border-[color:var(--border)] bg-[var(--cream)] p-3"><div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--crimson)]"><Sparkles className="h-3.5 w-3.5" /> {record.packageMetadata.commerceLane}</div><p className="mt-1 text-xs font-semibold text-[var(--steel)]">{record.packageMetadata.format} · {record.packageMetadata.packageStatus}</p></div>}
        <div className="flex flex-wrap gap-2">{record.tags.map((tag) => <span key={tag} className="rounded-[var(--r-pill)] bg-[var(--cream)] px-3 py-1 text-xs font-bold text-[var(--steel)]">{tag}</span>)}</div>
        <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold text-[var(--steel)]"><span className="rounded-[var(--r)] bg-[var(--cream)] p-2">{record.comments}<br />comments</span><span className="rounded-[var(--r)] bg-[var(--cream)] p-2">{record.saves}<br />saves</span><span className="rounded-[var(--r)] bg-[var(--cream)] p-2">{record.earnings}<br />earned</span></div>
        <div className="flex flex-wrap items-center justify-between gap-3">{record.brandCallout && <button type="button" onClick={() => toast("Opening brand partnership details…")} className="text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--crimson)]">{record.brandCallout}</button>}<button type="button" onClick={() => onOpen(record.id)} className="ml-auto inline-flex items-center gap-1 text-sm font-extrabold text-[var(--ember)]">View Details <ChevronRight className="h-4 w-4" /></button></div>
      </div>
    </ShellCard>
  );
}

export default function Pavilion() {
  const [location] = useLocation();
  const hasHandoff = location.includes("handoff=sprk-os");
  const [activeTab, setActiveTab] = useState<TabKey>(hasHandoff ? "content" : "discovery");
  const [query, setQuery] = useState("");
  const [tier, setTier] = useState("All");
  const [selectedCultures, setSelectedCultures] = useState<string[]>([]);
  const [followed, setFollowed] = useState<string[]>([]);
  const [modal, setModal] = useState<ModalState>(null);
  const [deals, setDeals] = useState(dealsSeed);
  const [selectedMessage, setSelectedMessage] = useState(messages[0].id);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [trendingMode, setTrendingMode] = useState<"creators" | "content">("creators");
  const [sortMode, setSortMode] = useState("Recency");

  const filteredContent = useMemo(() => baseContent.filter((record) => {
    const creator = creatorFor(record.creatorId);
    const textMatch = `${record.title} ${record.description} ${creator.name} ${record.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase());
    const tierMatch = tier === "All" || creator.tier === tier;
    const cultureMatch = selectedCultures.length === 0 || selectedCultures.some((culture) => record.tags.includes(culture) || creator.focus.includes(culture));
    return textMatch && tierMatch && cultureMatch;
  }), [query, tier, selectedCultures]);

  const toggleCulture = (culture: string) => setSelectedCultures((current) => current.includes(culture) ? current.filter((item) => item !== culture) : [...current, culture]);
  const toggleFollow = (id: string) => setFollowed((current) => { const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id]; toast.success(next.includes(id) ? "Creator followed." : "Creator unfollowed."); return next; });
  const activeContent = modal?.type === "content" ? baseContent.find((record) => record.id === modal.id) : undefined;
  const activeCreator = modal?.type === "creator" ? creators.find((creator) => creator.id === modal.id) : activeContent ? creatorFor(activeContent.creatorId) : undefined;
  const activeDeal = modal?.type === "deal" ? deals.find((deal) => deal.id === modal.id) : undefined;
  const currentMessage = messages.find((message) => message.id === selectedMessage) ?? messages[0];
  const acceptDeal = (dealId: string) => { setDeals((current) => current.map((deal) => deal.id === dealId ? { ...deal, status: "Accepted" } : deal)); toast.success("Deal accepted for prototype review."); };

  return (
    <SharedLayout activeSite="pavilion">
      <div className="min-h-screen bg-[var(--cream)] px-4 py-6 text-[var(--ink)] md:px-6">
        <div className="mx-auto max-w-[1440px] space-y-5">
          <header className="grid gap-4 rounded-[var(--r-lg)] border border-[color:var(--border)] bg-[var(--white)] p-5 shadow-sm lg:grid-cols-[1fr_auto] lg:items-end">
            <div><span className="label-caps text-[var(--ember)]">SPRK Pavilion Marketplace</span><h1 className="mt-2 text-4xl font-extrabold leading-none tracking-[-0.05em] md:text-5xl">Culture = Credibility. Credibility = Commerce.</h1><p className="mt-3 max-w-3xl text-sm font-light leading-relaxed text-[var(--steel)]">Discover verified creators, manage syndicated SPRKs, track transparent deals, and move campaign conversations through one connected marketplace.</p></div>
            <div className="flex flex-wrap gap-2"><GradientButton onClick={() => setModal({ type: "info", id: "escrow" })}><HandCoins className="h-4 w-4" /> Fund Escrow</GradientButton><SecondaryButton onClick={() => setModal({ type: "info", id: "rights" })}><ShieldCheck className="h-4 w-4" /> Secure Rights</SecondaryButton></div>
          </header>

          {hasHandoff && <ShellCard className="grid gap-4 p-4 md:grid-cols-[120px_1fr_auto] md:items-center"><img src={generatedThumbnail} alt="Bring in the Katz marketplace thumbnail" className="aspect-[9/16] h-32 rounded-[var(--r)] object-cover" /><div><span className="inline-flex rounded-[var(--r-pill)] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--white)]" style={{ backgroundImage: "var(--grad)" }}>New from SPRK-OS</span><h2 className="mt-2 text-2xl font-extrabold tracking-[-0.04em] text-[var(--ink)]">Bring in the Katz is now in Pavilion with required package data.</h2><p className="mt-1 text-sm font-light text-[var(--steel)]">Metadata includes origin, audio, format, rights state, commerce lane, health status, platforms, performance, and earnings signals.</p></div><button type="button" onClick={() => toast.success("Verified: thumbnail, metadata, creator, platforms, and deal-readiness are present.")} className="rounded-[var(--r-pill)] border border-[color:var(--success)] bg-[var(--white)] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.1em] text-[var(--success)]">Verify Path</button></ShellCard>}

          <nav className="flex gap-2 overflow-x-auto rounded-[var(--r-lg)] border border-[color:var(--border)] bg-[var(--white)] p-2 shadow-sm" aria-label="Pavilion sections">{tabs.map((tab) => <button key={tab.key} type="button" onClick={() => setActiveTab(tab.key)} className={`whitespace-nowrap rounded-[var(--r-pill)] px-4 py-2 text-sm font-extrabold transition-colors ${activeTab === tab.key ? "text-[var(--white)]" : "text-[var(--steel)] hover:bg-[var(--cream)] hover:text-[var(--ink)]"}`} style={activeTab === tab.key ? { backgroundImage: "var(--grad)" } : undefined}>{tab.label}</button>)}</nav>

          {activeTab === "discovery" && <div className="grid gap-5 lg:grid-cols-[280px_1fr_280px]">
            <ShellCard className="h-fit p-4 lg:sticky lg:top-4"><div className="flex items-center gap-2 text-sm font-extrabold text-[var(--ink)]"><Filter className="h-4 w-4 text-[var(--ember)]" /> Filters</div><label className="mt-4 block text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--mauve)]">Search</label><div className="mt-2 flex items-center gap-2 rounded-[var(--r-pill)] border border-[color:var(--border)] bg-[var(--cream)] px-3 py-2"><Search className="h-4 w-4 text-[var(--mauve)]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search creators & content" className="w-full bg-transparent text-sm font-semibold text-[var(--ink)] outline-none placeholder:text-[var(--mauve)]" /></div><label className="mt-4 block text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--mauve)]">Creator Tier</label><select value={tier} onChange={(event) => setTier(event.target.value)} className="mt-2 w-full rounded-[var(--r)] border border-[color:var(--border)] bg-[var(--white)] p-3 text-sm font-bold text-[var(--ink)]">{["All", "Verified", "Top Creator", "Elite"].map((item) => <option key={item}>{item}</option>)}</select><div className="mt-4 max-h-[560px] space-y-2 overflow-auto pr-1"><span className="block text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--mauve)]">Culture Focus</span>{cultures.map((culture) => <label key={culture} className="flex items-center gap-2 rounded-[var(--r)] bg-[var(--cream)] px-3 py-2 text-sm font-semibold text-[var(--steel)]"><input type="checkbox" checked={selectedCultures.includes(culture)} onChange={() => toggleCulture(culture)} className="accent-[var(--ember)]" />{culture}</label>)}</div><button type="button" onClick={() => { setSelectedCultures([]); setTier("All"); setQuery(""); setActiveTab("content"); toast("Showing the expanded Pavilion content library."); }} className="mt-4 flex w-full items-center justify-center gap-2 rounded-[var(--r-pill)] border border-[color:var(--ember)] bg-[var(--white)] px-4 py-3 text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--ember)] transition hover:bg-[var(--cream)]">View More <ChevronRight className="h-4 w-4" /></button></ShellCard>
            <main className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filteredContent.map((record) => <ContentCard key={record.id} record={record} onOpen={(id) => setModal({ type: "content", id })} onCreator={(id) => setModal({ type: "creator", id })} />)}{filteredContent.length === 0 && <ShellCard className="p-8 text-center text-sm font-semibold text-[var(--steel)] md:col-span-2 xl:col-span-3">No matching creator content yet. Clear filters or search another culture lane.</ShellCard>}</main>
            <aside className="space-y-4"><ShellCard className="p-4"><h2 className="text-lg font-extrabold text-[var(--ink)]">Trending Creators</h2><div className="mt-3 space-y-3">{creators.map((creator) => <div key={creator.id} className="flex items-center gap-3"><button type="button" onClick={() => setModal({ type: "creator", id: creator.id })}><img src={creator.avatar} alt="" className="h-10 w-10 rounded-[var(--r-pill)] object-cover" /></button><div className="min-w-0 flex-1"><p className="truncate text-sm font-extrabold text-[var(--ink)]">{creator.name}</p><p className="text-xs font-bold text-[var(--mauve)]">{creator.followers}</p></div><button type="button" onClick={() => toggleFollow(creator.id)} className={`rounded-[var(--r-pill)] px-3 py-1 text-xs font-extrabold ${followed.includes(creator.id) ? "bg-[var(--success)] text-[var(--white)]" : "bg-[var(--cream)] text-[var(--ink)]"}`}>{followed.includes(creator.id) ? "Following" : "Follow"}</button></div>)}</div></ShellCard><ShellCard className="p-4"><h2 className="text-lg font-extrabold text-[var(--ink)]">Trending Content</h2><div className="mt-3 space-y-3">{baseContent.slice(0, 3).map((record) => <button key={record.id} type="button" onClick={() => setModal({ type: "content", id: record.id })} className="flex w-full items-center gap-3 text-left"><img src={record.thumbnail} alt="" className="h-12 w-12 rounded-[var(--r)] object-cover" /><span><span className="line-clamp-1 text-sm font-extrabold text-[var(--ink)]">{record.title}</span><span className="text-xs font-bold text-[var(--mauve)]">{record.views} views</span></span></button>)}</div></ShellCard><ShellCard className="p-4"><h2 className="text-lg font-extrabold text-[var(--ink)]">Ready to partner?</h2><p className="mt-2 text-sm font-light text-[var(--steel)]">Brands deploy campaigns, creators earn, culture wins.</p><div className="mt-4"><GradientButton onClick={() => setModal({ type: "info", id: "marketplace" })}>Join Marketplace <ArrowRight className="h-4 w-4" /></GradientButton></div></ShellCard></aside>
          </div>}

          {activeTab === "content" && <section className="space-y-4"><ShellCard className="flex flex-wrap items-center justify-between gap-3 p-4"><div><h2 className="text-2xl font-extrabold text-[var(--ink)]">My SPRKs</h2><p className="text-sm font-light text-[var(--steel)]">Syndicated content from SPRK-OS and Pavilion uploads.</p></div><div className="flex flex-wrap gap-2">{["Recency", "Views", "Engagement", "Earnings"].map((item) => <button key={item} type="button" onClick={() => { setSortMode(item); toast(`Sorted by ${item}.`); }} className={`rounded-[var(--r-pill)] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.08em] ${sortMode === item ? "bg-[var(--ink)] text-[var(--white)]" : "bg-[var(--cream)] text-[var(--steel)]"}`}>{item}</button>)}</div></ShellCard><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{baseContent.map((record) => <ContentCard key={record.id} record={record} compact onOpen={(id) => setModal({ type: "content", id })} onCreator={(id) => setModal({ type: "creator", id })} />)}</div></section>}

          {activeTab === "trending" && <section className="space-y-4"><ShellCard className="flex flex-wrap items-center justify-between gap-3 p-4"><div><h2 className="text-2xl font-extrabold text-[var(--ink)]">Trending Now</h2><p className="text-sm font-light text-[var(--steel)]">Last updated 2 minutes ago.</p></div><div className="flex gap-2"><SecondaryButton onClick={() => setTrendingMode("creators")}><Users className="h-4 w-4" /> Creators</SecondaryButton><SecondaryButton onClick={() => setTrendingMode("content")}><TrendingUp className="h-4 w-4" /> Content</SecondaryButton></div></ShellCard><div className="grid gap-4 md:grid-cols-2">{trendingMode === "creators" ? creators.map((creator) => <ShellCard key={creator.id} className="flex items-center gap-4 p-4"><img src={creator.avatar} alt="" className="h-16 w-16 rounded-[var(--r)] object-cover" /><button type="button" onClick={() => setModal({ type: "creator", id: creator.id })} className="min-w-0 flex-1 text-left"><h3 className="text-lg font-extrabold text-[var(--ink)]">{creator.name}</h3><p className="text-sm font-bold text-[var(--mauve)]">{creator.tier} · {creator.followers} followers</p><p className="line-clamp-1 text-xs font-semibold text-[var(--steel)]">{creator.focus.join(" · ")}</p></button><button type="button" onClick={() => toggleFollow(creator.id)} className="rounded-[var(--r-pill)] bg-[var(--cream)] px-4 py-2 text-xs font-extrabold text-[var(--ink)]">{followed.includes(creator.id) ? "Following" : "Follow"}</button></ShellCard>) : baseContent.map((record) => <ContentCard key={record.id} record={record} compact onOpen={(id) => setModal({ type: "content", id })} onCreator={(id) => setModal({ type: "creator", id })} />)}</div></section>}

          {activeTab === "deals" && <section className="space-y-4"><ShellCard className="p-4"><h2 className="text-2xl font-extrabold text-[var(--ink)]">My Deals & Partnerships</h2><p className="text-sm font-light text-[var(--steel)]">Transparent sponsorship offers with simulated smart-contract escrow status.</p></ShellCard><div className="grid gap-4">{deals.map((deal) => <ShellCard key={deal.id} className="grid gap-4 p-4 md:grid-cols-[auto_1fr_auto_auto] md:items-center"><div className="flex h-14 w-14 items-center justify-center rounded-[var(--r)] bg-[var(--cream)] text-[var(--ember)]"><HeartHandshake className="h-7 w-7" /></div><div><h3 className="text-lg font-extrabold text-[var(--ink)]">{deal.title}</h3><p className="text-sm font-bold text-[var(--mauve)]">{deal.brand} · {deal.due}</p></div><div className="text-2xl font-extrabold text-[var(--ink)]">{deal.amount}</div><button type="button" onClick={() => setModal({ type: "deal", id: deal.id })} className={`rounded-[var(--r-pill)] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.08em] ${deal.status === "Pending" ? "bg-[var(--warning)] text-[var(--white)]" : deal.status === "Returned" ? "bg-[var(--mauve)] text-[var(--white)]" : deal.status === "In Escrow" ? "bg-[var(--steel)] text-[var(--white)]" : "bg-[var(--success)] text-[var(--white)]"}`}>{deal.status}</button></ShellCard>)}</div></section>}

          {activeTab === "messages" && <section className="grid gap-4 lg:grid-cols-[340px_1fr]"><ShellCard className="overflow-hidden"><div className="border-b border-[color:var(--border)] p-4"><h2 className="text-2xl font-extrabold text-[var(--ink)]">Inbox</h2></div>{messages.map((message) => <button key={message.id} type="button" onClick={() => { setSelectedMessage(message.id); setReplyOpen(false); }} className={`flex w-full gap-3 border-b border-[color:var(--border)] p-4 text-left transition-colors hover:bg-[var(--cream)] ${selectedMessage === message.id ? "bg-[var(--cream)]" : "bg-[var(--white)]"}`}><span className="mt-1 h-3 w-3 rounded-[var(--r-pill)] bg-[var(--ember)] opacity-100" style={{ opacity: message.unread ? 1 : 0.18 }} /><span><span className="block text-sm font-extrabold text-[var(--ink)]">{message.sender}</span><span className="line-clamp-1 text-sm font-bold text-[var(--steel)]">{message.subject}</span><span className="text-xs font-semibold text-[var(--mauve)]">{message.time}</span></span></button>)}</ShellCard><ShellCard className="p-5"><span className="label-caps text-[var(--ember)]">{currentMessage.sender}</span><h2 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-[var(--ink)]">{currentMessage.subject}</h2><p className="mt-4 rounded-[var(--r)] bg-[var(--cream)] p-4 text-sm font-light leading-relaxed text-[var(--steel)]">{currentMessage.body}</p>{replyOpen ? <div className="mt-4 space-y-3"><textarea value={replyText} onChange={(event) => setReplyText(event.target.value)} className="min-h-28 w-full rounded-[var(--r)] border border-[color:var(--border)] p-3 text-sm outline-none focus:ring-2 focus:ring-[var(--ember)]" placeholder="Write a prototype reply…" /><GradientButton disabled={!replyText.trim()} onClick={() => { toast.success("Reply simulated in thread."); setReplyText(""); setReplyOpen(false); }}>Send Reply</GradientButton></div> : <div className="mt-4"><SecondaryButton onClick={() => setReplyOpen(true)}><MessageCircle className="h-4 w-4" /> Reply</SecondaryButton></div>}</ShellCard></section>}
        </div>
      </div>

      {modal && <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[var(--ink)]/70 p-4 md:items-center" role="dialog" aria-modal="true"><div className="relative w-full max-w-3xl rounded-[var(--r-lg)] bg-[var(--white)] p-5 shadow-2xl"><button type="button" onClick={() => setModal(null)} className="absolute right-4 top-4 rounded-[var(--r-pill)] bg-[var(--cream)] p-2 text-[var(--ink)]"><X className="h-5 w-5" /></button>{modal.type === "content" && activeContent && <div className="grid gap-5 md:grid-cols-[280px_1fr]"><img src={activeContent.thumbnail} alt="" className="aspect-[9/16] w-full rounded-[var(--r)] object-cover" /><div className="pr-8"><span className="label-caps text-[var(--ember)]">Content Detail</span><h2 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-[var(--ink)]">{activeContent.title}</h2><p className="mt-3 text-sm font-light leading-relaxed text-[var(--steel)]">{activeContent.description}</p><div className="mt-4 grid grid-cols-2 gap-2 text-sm font-bold text-[var(--steel)]"><span className="rounded-[var(--r)] bg-[var(--cream)] p-3">Views: {activeContent.views}</span><span className="rounded-[var(--r)] bg-[var(--cream)] p-3">Saves: {activeContent.saves}</span><span className="rounded-[var(--r)] bg-[var(--cream)] p-3">Comments: {activeContent.comments}</span><span className="rounded-[var(--r)] bg-[var(--cream)] p-3">Engagement: {activeContent.engagement}</span></div>{activeContent.packageMetadata && <div className="mt-4 rounded-[var(--r)] border border-[color:var(--border)] p-4"><h3 className="font-extrabold text-[var(--ink)]">Required package metadata</h3>{Object.entries(activeContent.packageMetadata).map(([key, value]) => <p key={key} className="mt-1 text-sm text-[var(--steel)]"><strong className="capitalize text-[var(--ink)]">{key.replace(/([A-Z])/g, " $1")}:</strong> {value}</p>)}</div>}<div className="mt-4 rounded-[var(--r)] bg-[var(--cream)] p-4"><h3 className="font-extrabold text-[var(--ink)]">Top comment</h3><p className="mt-1 text-sm text-[var(--steel)]">“This already feels like a campaign, not just a clip.”</p></div><div className="mt-5 flex flex-wrap gap-2"><SecondaryButton onClick={() => toast.success("Share link copied.")}>Share</SecondaryButton><SecondaryButton onClick={() => toast.success("Saved to Pavilion board.")}>Save</SecondaryButton><GradientButton onClick={() => setModal({ type: "deal", id: deals[0].id })}>Brand Partnership</GradientButton></div></div></div>}{modal.type === "creator" && activeCreator && <div className="pr-8"><img src={activeCreator.avatar} alt="" className="h-28 w-28 rounded-[var(--r-lg)] object-cover" /><span className="mt-4 inline-flex rounded-[var(--r-pill)] bg-[var(--cream)] px-3 py-1 text-xs font-extrabold text-[var(--crimson)]">{activeCreator.tier}</span><h2 className="mt-2 text-4xl font-extrabold tracking-[-0.05em] text-[var(--ink)]">{activeCreator.name}</h2><p className="text-sm font-bold text-[var(--mauve)]">{activeCreator.handle}</p><p className="mt-3 text-sm font-light leading-relaxed text-[var(--steel)]">{activeCreator.bio}</p><div className="mt-4 grid gap-2 md:grid-cols-3"><span className="rounded-[var(--r)] bg-[var(--cream)] p-3 text-sm font-bold text-[var(--steel)]">Followers<br /><strong className="text-xl text-[var(--ink)]">{activeCreator.followers}</strong></span><span className="rounded-[var(--r)] bg-[var(--cream)] p-3 text-sm font-bold text-[var(--steel)]">Views<br /><strong className="text-xl text-[var(--ink)]">{activeCreator.views}</strong></span><span className="rounded-[var(--r)] bg-[var(--cream)] p-3 text-sm font-bold text-[var(--steel)]">Engagement<br /><strong className="text-xl text-[var(--ink)]">{activeCreator.engagement}</strong></span></div><div className="mt-4 flex flex-wrap gap-2">{activeCreator.focus.map((tag) => <span key={tag} className="rounded-[var(--r-pill)] bg-[var(--cream)] px-3 py-1 text-xs font-bold text-[var(--steel)]">{tag}</span>)}</div><div className="mt-5 flex flex-wrap gap-2"><GradientButton onClick={() => toggleFollow(activeCreator.id)}>{followed.includes(activeCreator.id) ? "Following" : "Follow"}</GradientButton><SecondaryButton onClick={() => { setActiveTab("messages"); setModal(null); }}>Send Message</SecondaryButton></div></div>}{modal.type === "deal" && activeDeal && <div className="pr-8"><span className="label-caps text-[var(--ember)]">Deal Details</span><h2 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-[var(--ink)]">{activeDeal.title}</h2><p className="mt-2 text-sm font-bold text-[var(--mauve)]">{activeDeal.brand} · {activeDeal.due}</p><p className="mt-4 text-sm font-light leading-relaxed text-[var(--steel)]">{activeDeal.terms}</p><div className="mt-4 grid gap-2 md:grid-cols-2"><span className="rounded-[var(--r)] bg-[var(--cream)] p-3 text-sm font-bold text-[var(--steel)]">Gross amount<br /><strong className="text-2xl text-[var(--ink)]">{activeDeal.amount}</strong></span><span className="rounded-[var(--r)] bg-[var(--cream)] p-3 text-sm font-bold text-[var(--steel)]">Creator share<br /><strong className="text-2xl text-[var(--ink)]">75%</strong></span><span className="rounded-[var(--r)] bg-[var(--cream)] p-3 text-sm font-bold text-[var(--steel)]">SPRK fee<br /><strong className="text-2xl text-[var(--ink)]">8%</strong></span><span className="rounded-[var(--r)] bg-[var(--cream)] p-3 text-sm font-bold text-[var(--steel)]">Status<br /><strong className="text-2xl text-[var(--success)]">{activeDeal.status}</strong></span></div><div className="mt-4 flex flex-wrap gap-2"><GradientButton disabled={activeDeal.status !== "Pending"} onClick={() => acceptDeal(activeDeal.id)}><CheckCircle2 className="h-4 w-4" /> Accept Deal</GradientButton><SecondaryButton onClick={() => toast.success("Invoice download simulated.")}><Download className="h-4 w-4" /> Download Invoice</SecondaryButton></div></div>}{modal.type === "info" && <div className="pr-8"><span className="label-caps text-[var(--ember)]">Pavilion System</span><h2 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-[var(--ink)]">{modal.id === "escrow" ? "Smart escrow protects both sides." : modal.id === "rights" ? "Rights stay visible and creator-owned." : "Marketplace access is review-ready."}</h2><p className="mt-3 text-sm font-light leading-relaxed text-[var(--steel)]">This prototype explains the marketplace action without creating a production transaction. Brand funds, rights summaries, content metadata, and approvals remain simulated until final launch approval.</p><div className="mt-5"><GradientButton onClick={() => setModal(null)}>Understood</GradientButton></div></div>}</div></div>}
    </SharedLayout>
  );
}
