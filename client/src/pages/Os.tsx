import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Cloud,
  Download,
  FileVideo,
  Filter,
  Flame,
  HardDrive,
  Info,
  Layers,
  Loader2,
  Lock,
  Music,
  Pause,
  Play,
  Plus,
  Scissors,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Type,
  Upload,
  Volume2,
  VolumeX,
  Wand2,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import SharedLayout from "@/components/SharedLayout";

// ─── Types ────────────────────────────────────────────────────────────────────
type ToolId = "trim" | "text" | "effects" | "transitions" | "audio" | "captions" | "filters" | "speed" | "format";

// ─── Constants ────────────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, label: "Upload" },
  { id: 2, label: "Edit" },
  { id: 3, label: "Platforms" },
  { id: 4, label: "Confirm" },
  { id: 5, label: "Process" },
  { id: 6, label: "Deliver" },
];

const TOOLS: { id: ToolId; label: string; icon: React.ReactNode }[] = [
  { id: "trim",        label: "Trim",        icon: <Scissors className="h-4 w-4" /> },
  { id: "text",        label: "Text",         icon: <Type className="h-4 w-4" /> },
  { id: "effects",     label: "Effects",      icon: <Wand2 className="h-4 w-4" /> },
  { id: "transitions", label: "Transitions",  icon: <Layers className="h-4 w-4" /> },
  { id: "audio",       label: "Audio",        icon: <Music className="h-4 w-4" /> },
  { id: "captions",    label: "Captions",     icon: <FileVideo className="h-4 w-4" /> },
  { id: "filters",     label: "Filters",      icon: <Filter className="h-4 w-4" /> },
  { id: "speed",       label: "Speed",        icon: <Zap className="h-4 w-4" /> },
  { id: "format",      label: "Format",       icon: <Smartphone className="h-4 w-4" /> },
];

const EFFECTS = [
  { id: "none",       label: "Original",        note: "No treatment applied.",                    filter: "" },
  { id: "cinematic",  label: "Cinematic Lift",   note: "Deep contrast, clean creator-safe color.", filter: "contrast(1.12) saturate(1.08)" },
  { id: "launch",     label: "Launch Pulse",     note: "Fast cuts, drop-card flash, high urgency.", filter: "contrast(1.16) saturate(1.18)" },
  { id: "studio",     label: "Studio Polish",    note: "Balanced clarity for brand review.",        filter: "contrast(1.04) saturate(1.02)" },
  { id: "golden",     label: "Golden Hour",      note: "Warm tones, sunset-inspired glow.",         filter: "contrast(1.08) saturate(1.15) sepia(0.2)" },
  { id: "moody",      label: "Moody Dark",       note: "High drama, deep shadows, muted palette.",  filter: "contrast(1.22) saturate(0.75) brightness(0.88)" },
  { id: "vivid",      label: "Vivid Pop",        note: "Punchy colors for maximum scroll-stop.",    filter: "contrast(1.1) saturate(1.4)" },
  { id: "bw",         label: "B&W Editorial",    note: "Timeless monochrome for artistic content.", filter: "grayscale(1) contrast(1.1)" },
  { id: "cool",       label: "Cool Tone",        note: "Blue-shifted, clean digital aesthetic.",    filter: "contrast(1.06) saturate(0.9) hue-rotate(15deg)" },
  { id: "retro",      label: "Retro Grain",      note: "Nostalgic film look with warm grain.",      filter: "contrast(1.05) saturate(0.85) sepia(0.15) brightness(0.96)" },
];

const TRANSITIONS = [
  { id: "cut",      label: "Hard Cut",    preview: "⚡" },
  { id: "dissolve", label: "Dissolve",    preview: "🌫" },
  { id: "swipe",    label: "Swipe Left",  preview: "◀" },
  { id: "swipe_r",  label: "Swipe Right", preview: "▶" },
  { id: "zoom_in",  label: "Zoom In",     preview: "🔍" },
  { id: "fade",     label: "Fade Black",  preview: "⬛" },
];

const TEXT_ANIMATIONS = [
  { id: "none",       label: "Static" },
  { id: "fade",       label: "Fade In" },
  { id: "slide_up",   label: "Slide Up" },
  { id: "pop",        label: "Pop" },
  { id: "typewriter", label: "Typewriter" },
];

const TEXT_POSITIONS = [
  { id: "top_left",   label: "Top Left",     style: { top: "8%", left: "5%" } as React.CSSProperties },
  { id: "top_center", label: "Top Center",   style: { top: "8%", left: "50%", transform: "translateX(-50%)" } as React.CSSProperties },
  { id: "top_right",  label: "Top Right",    style: { top: "8%", right: "5%" } as React.CSSProperties },
  { id: "mid_center", label: "Middle",       style: { top: "50%", left: "50%", transform: "translate(-50%,-50%)" } as React.CSSProperties },
  { id: "bot_left",   label: "Bot Left",     style: { bottom: "22%", left: "5%" } as React.CSSProperties },
  { id: "bot_center", label: "Bot Center",   style: { bottom: "22%", left: "50%", transform: "translateX(-50%)" } as React.CSSProperties },
  { id: "bot_right",  label: "Bot Right",    style: { bottom: "22%", right: "5%" } as React.CSSProperties },
];

const COLOR_FILTERS = [
  { id: "none",  label: "Original", swatch: "bg-gradient-to-br from-gray-200 to-gray-400" },
  { id: "warm",  label: "Warm",     swatch: "bg-gradient-to-br from-orange-200 to-yellow-400" },
  { id: "cool",  label: "Cool",     swatch: "bg-gradient-to-br from-blue-200 to-cyan-400" },
  { id: "vivid", label: "Vivid",    swatch: "bg-gradient-to-br from-pink-300 to-purple-500" },
  { id: "muted", label: "Muted",    swatch: "bg-gradient-to-br from-stone-300 to-stone-500" },
  { id: "bw",    label: "B&W",      swatch: "bg-gradient-to-br from-gray-100 to-gray-800" },
];

const MUSIC_TRACKS = [
  { id: "none",   label: "No Music",               file: null,                                    bpm: null },
  { id: "hiphop", label: "High-Energy Hip Hop",    file: "assets/audio/track_hiphop_energy.wav",  bpm: "120 BPM" },
  { id: "pop",    label: "Mid-Tempo Pop Hit",       file: "assets/audio/track_pop_midtempo.wav",   bpm: "100 BPM" },
  { id: "lofi",   label: "Chill Lo-Fi Trap/House",  file: "assets/audio/track_lofi_chill.wav",     bpm: "75 BPM" },
];

const CAPTION_STYLES = [
  { id: "clean",   label: "Clean White",  preview: "text-white font-bold" },
  { id: "outline", label: "Bold Outline", preview: "text-white font-black" },
  { id: "box",     label: "Dark Box",     preview: "text-white font-semibold" },
  { id: "ember",   label: "SPRK Ember",   preview: "text-[var(--ember)] font-black" },
];

const PLATFORMS = [
  { id: "sprk",      label: "SPRK*",          audience: "Native drop layer",   locked: true,  ratio: "9:16", maxDur: "60s" },
  { id: "tiktok",    label: "TikTok",          audience: "Vertical discovery",  locked: false, ratio: "9:16", maxDur: "60s" },
  { id: "instagram", label: "Instagram",       audience: "Reels + Stories",     locked: false, ratio: "9:16", maxDur: "90s" },
  { id: "youtube",   label: "YouTube Shorts",  audience: "Searchable reach",    locked: false, ratio: "9:16", maxDur: "60s" },
  { id: "reddit",    label: "Reddit",          audience: "Community proof",     locked: false, ratio: "16:9", maxDur: "15m" },
  { id: "x",         label: "X / Twitter",     audience: "Real-time momentum",  locked: false, ratio: "16:9", maxDur: "140s" },
  { id: "snap",      label: "Snap Spotlight",  audience: "Short-form energy",   locked: false, ratio: "9:16", maxDur: "60s" },
  { id: "threads",   label: "Threads",         audience: "Conversation layer",  locked: false, ratio: "1:1",  maxDur: "5m" },
  { id: "pinterest", label: "Pinterest",       audience: "Visual intent",       locked: false, ratio: "2:3",  maxDur: "15m" },
  { id: "linkedin",  label: "LinkedIn",        audience: "Founder proof",       locked: false, ratio: "16:9", maxDur: "10m" },
  { id: "twitch",    label: "Twitch",          audience: "Live replay",         locked: false, ratio: "16:9", maxDur: "n/a" },
  { id: "kick",      label: "Kick",            audience: "Creator livestream",  locked: false, ratio: "16:9", maxDur: "n/a" },
];

const TIKTOK_TIPS = [
  "Hook in first 1.5 seconds — show the payoff before the setup",
  "Caption length: 150 chars max for full display",
  "Optimal post time: 7–9 PM local time",
  "Add 3–5 niche hashtags + 1 trending hashtag",
  "9:16 safe zones applied — UI overlaps avoided automatically",
];

const PLATFORM_LIMIT = 6;
const PREVIEW_ASSET = `${import.meta.env.BASE_URL}assets/wireframe/bring_in_the_katz_line_dance_preview.png`;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getPreviewFilter(effect: string, colorFilter: string, brightness: number) {
  const effectMap: Record<string, string> = {
    none: "", cinematic: "contrast(1.12) saturate(1.08)", launch: "contrast(1.16) saturate(1.18)",
    studio: "contrast(1.04) saturate(1.02)", golden: "contrast(1.08) saturate(1.15) sepia(0.2)",
    moody: "contrast(1.22) saturate(0.75) brightness(0.88)", vivid: "contrast(1.1) saturate(1.4)",
    bw: "grayscale(1) contrast(1.1)", cool: "contrast(1.06) saturate(0.9) hue-rotate(15deg)",
    retro: "contrast(1.05) saturate(0.85) sepia(0.15) brightness(0.96)",
  };
  const colorMap: Record<string, string> = {
    none: "", warm: "sepia(0.3) saturate(1.2)", cool: "hue-rotate(20deg) saturate(0.9)",
    vivid: "saturate(1.5)", muted: "saturate(0.6)", bw: "grayscale(1)",
  };
  const brightnessFilter = brightness !== 100 ? `brightness(${brightness / 100})` : "";
  return [effectMap[effect] || "", colorMap[colorFilter] || "", brightnessFilter].filter(Boolean).join(" ");
}

// ─── Step Indicator ───────────────────────────────────────────────────────────
function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1">
      {STEPS.map((s, i) => (
        <div key={s.id} className="flex items-center gap-1 shrink-0">
          <div className={cx(
            "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all",
            step === s.id ? "bg-[var(--ember)] text-[var(--white)] scale-110" :
            step > s.id  ? "bg-[var(--success)] text-[var(--white)]" :
                           "bg-[var(--warm)] text-[var(--steel)]"
          )}>
            {step > s.id ? <Check className="h-3.5 w-3.5" /> : s.id}
          </div>
          <span className={cx("hidden text-xs font-semibold sm:block", step === s.id ? "text-[var(--ink)]" : "text-[var(--mauve)]")}>{s.label}</span>
          {i < STEPS.length - 1 && <div className={cx("mx-1 h-px w-4 shrink-0 sm:w-8", step > s.id ? "bg-[var(--success)]" : "bg-[var(--border)]")} />}
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Os() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState(1);

  // Upload
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [fileDuration, setFileDuration] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoObjectUrl, setVideoObjectUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Tools
  const [activeTool, setActiveTool] = useState<ToolId>("trim");

  // Trim
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(30);

  // Text
  const [overlayText, setOverlayText] = useState("Bring in the Katz challenge is live");
  const [textSize, setTextSize] = useState(24);
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [textPosition, setTextPosition] = useState("bot_center");
  const [textAnimation, setTextAnimation] = useState("fade");
  const [showOverlay, setShowOverlay] = useState(true);

  // Effects
  const [selectedEffect, setSelectedEffect] = useState("launch");

  // Transitions
  const [selectedTransition, setSelectedTransition] = useState("cut");

  // Audio
  const [selectedTrack, setSelectedTrack] = useState("none");
  const [audioVolume, setAudioVolume] = useState(70);
  const [originalVolume, setOriginalVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Captions
  const [captionsEnabled, setCaptionsEnabled] = useState(false);
  const [captionStyle, setCaptionStyle] = useState("clean");
  const [captionText, setCaptionText] = useState("A new line dance becomes a creator-owned commerce moment through SPRK Pavilion.");
  const [captionPosition, setCaptionPosition] = useState("bottom");

  // Filters
  const [selectedColorFilter, setSelectedColorFilter] = useState("none");
  const [filterIntensity, setFilterIntensity] = useState(100);
  const [brightness, setBrightness] = useState(100);

  // Speed
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

  // Format
  const [selectedFormat, setSelectedFormat] = useState("9:16");

  // Hashtags
  const [hashtagInput, setHashtagInput] = useState("");
  const [hashtags, setHashtags] = useState(["BringInTheKatz", "CreatorCommerce", "LineDance"]);

  // Platforms
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["sprk", "tiktok"]);
  const [showAllPlatforms, setShowAllPlatforms] = useState(false);

  // Terms
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsAlert, setTermsAlert] = useState("");

  // Processing
  const [loadingProgress, setLoadingProgress] = useState<Record<string, number>>({});
  const [loadingMessage, setLoadingMessage] = useState("Preparing syndication package");

  // Delivery
  const [showStorageModal, setShowStorageModal] = useState(false);
  const [showDriveModal, setShowDriveModal] = useState(false);
  const [showICloudModal, setShowICloudModal] = useState(false);
  const [showPavilionPreview, setShowPavilionPreview] = useState(false);

  // Intro
  const [showIntro, setShowIntro] = useState(() => window.localStorage.getItem("sprk-studio-intro-seen") !== "true");

  // ─── Computed ───────────────────────────────────────────────────────────────
  const isUploaded = Boolean(fileName);
  const selectedPlatformObjects = PLATFORMS.filter(p => selectedPlatforms.includes(p.id));
  const displayedPlatforms = showAllPlatforms ? PLATFORMS : PLATFORMS.slice(0, 8);
  const previewFilter = getPreviewFilter(selectedEffect, selectedColorFilter, brightness);
  const textPositionStyle = TEXT_POSITIONS.find(p => p.id === textPosition)?.style || {};
  const canContinue =
    (step === 1 && isUploaded) ||
    (step === 2 && isUploaded) ||
    (step === 3 && selectedPlatforms.length >= 2) ||
    (step === 4 && termsAccepted) ||
    step === 6;

  // ─── Effects ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (step !== 5) return;
    const sequence = ["Analyzing cut points and overlay clarity", "Rendering creator-safe export variants", "Packaging syndicated commerce metadata", "Registering SPRK-native Pavilion handoff"];
    let tick = 0;
    setLoadingProgress(Object.fromEntries(selectedPlatforms.map(id => [id, 4])));
    setLoadingMessage(sequence[0]);
    const timer = window.setInterval(() => {
      tick += 1;
      setLoadingMessage(sequence[Math.min(sequence.length - 1, Math.floor(tick / 3))]);
      setLoadingProgress(current => {
        const next = { ...current };
        selectedPlatforms.forEach((id, index) => { next[id] = Math.min(100, (next[id] ?? 0) + 7 + index * 2 + (tick % 3)); });
        return next;
      });
      if (tick >= 14) { window.clearInterval(timer); setLoadingProgress(Object.fromEntries(selectedPlatforms.map(id => [id, 100]))); window.setTimeout(() => setStep(6), 700); }
    }, 900);
    return () => window.clearInterval(timer);
  }, [step, selectedPlatforms]);

  useEffect(() => { if (videoRef.current) videoRef.current.playbackRate = playbackSpeed; }, [playbackSpeed]);

  // ─── Handlers ───────────────────────────────────────────────────────────────
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("video/")) { toast.error("Please upload a video file (MP4, MOV, WebM, etc.)"); return; }
    const url = URL.createObjectURL(file);
    setVideoObjectUrl(url);
    setFileName(file.name);
    setFileSize(Math.round(file.size / (1024 * 1024)));
    const tempVideo = document.createElement("video");
    tempVideo.src = url;
    tempVideo.onloadedmetadata = () => { const dur = Math.round(tempVideo.duration); setFileDuration(dur); setTrimStart(0); setTrimEnd(Math.min(dur, 60)); };
    toast.success("Video uploaded. Preview is now live — start editing.");
  };

  const simulateUpload = () => {
    setFileName("bring_in_the_katz_master_cut.mp4"); setFileSize(286); setFileDuration(31); setTrimStart(3); setTrimEnd(27); setVideoObjectUrl(null);
    toast.success("Demo draft loaded. The live preview is ready for WYSIWYG editing.");
  };

  const togglePlay = () => {
    if (videoRef.current) { if (isPlaying) { videoRef.current.pause(); setIsPlaying(false); } else { videoRef.current.play(); setIsPlaying(true); } }
    else { setIsPlaying(p => !p); toast(isPlaying ? "Preview paused." : "Preview playing (demo mode)."); }
  };

  const toggleAudioPreview = () => {
    if (!audioRef.current) return;
    if (isAudioPlaying) { audioRef.current.pause(); setIsAudioPlaying(false); } else { audioRef.current.play().catch(() => {}); setIsAudioPlaying(true); }
  };

  const addHashtag = () => {
    const cleaned = hashtagInput.replace(/#/g, "").trim();
    if (!cleaned) return;
    if (hashtags.includes(cleaned)) { setHashtagInput(""); return; }
    setHashtags(c => [...c, cleaned]); setHashtagInput("");
  };

  const togglePlatform = (id: string) => {
    if (id === "sprk") return;
    setSelectedPlatforms(current => {
      if (current.includes(id)) return current.filter(p => p !== id);
      if (current.length >= PLATFORM_LIMIT) { toast.warning(`Select up to ${PLATFORM_LIMIT} platforms for this package.`); return current; }
      return [...current, id];
    });
  };

  const moveNext = () => {
    if (step === 1 && !fileName) { toast.error("Upload a video before continuing."); return; }
    if (step === 3 && selectedPlatforms.length < 2) { toast.error("Keep SPRK selected and add at least one external platform."); return; }
    if (step === 4 && !termsAccepted) { setTermsAlert("You must accept the content accountability terms to continue."); return; }
    setTermsAlert(""); setStep(s => Math.min(s + 1, 6));
  };

  // ─── WYSIWYG Preview ─────────────────────────────────────────────────────────
  const renderPreview = () => (
    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[var(--r)] bg-[var(--navy)]">
      {videoObjectUrl ? (
        <video ref={videoRef} src={videoObjectUrl} className="h-full w-full object-cover" style={{ filter: previewFilter }} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} playsInline loop muted={isMuted} />
      ) : isUploaded ? (
        <img src={PREVIEW_ASSET} alt="Video preview" className="h-full w-full object-cover transition-all duration-500" style={{ filter: previewFilter }} />
      ) : (
        <div className="flex h-full items-center justify-center"><div className="text-center text-[var(--mauve)]"><Upload className="mx-auto mb-2 h-10 w-10" /><p className="text-sm font-semibold">Upload to preview</p></div></div>
      )}
      {isUploaded && showOverlay && overlayText && (
        <div className="absolute" style={{ ...textPositionStyle, maxWidth: "90%" }}>
          <p className="font-black uppercase leading-tight drop-shadow-lg" style={{ fontSize: textSize, color: textColor }}>{overlayText}</p>
        </div>
      )}
      {isUploaded && captionsEnabled && captionText && (
        <div className={cx("absolute inset-x-4", captionPosition === "top" ? "top-16" : captionPosition === "middle" ? "top-1/2 -translate-y-1/2" : "bottom-16")}>
          <p className={cx("text-center text-sm leading-snug", CAPTION_STYLES.find(s => s.id === captionStyle)?.preview || "text-white font-bold")}>{captionText}</p>
        </div>
      )}
      {isUploaded && (
        <button type="button" onClick={togglePlay} className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[var(--ink)] shadow-lg transition-transform hover:scale-110" aria-label={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
        </button>
      )}
      {isUploaded && (
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          <span className="rounded-[var(--r-pill)] bg-[var(--ink)]/80 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">{step <= 1 ? "Raw" : step === 2 ? "Editing" : "Packaged"}</span>
          {selectedEffect !== "none" && <span className="rounded-[var(--r-pill)] bg-[var(--ember)]/90 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">{EFFECTS.find(e => e.id === selectedEffect)?.label}</span>}
        </div>
      )}
      <span className="absolute right-2 top-2 rounded-[var(--r-pill)] bg-[var(--success)] px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">{isUploaded ? "Live" : "Waiting"}</span>
      {isUploaded && (
        <div className="absolute inset-x-2 bottom-2">
          <div className="h-1 rounded-full bg-white/20">
            <div className="h-full rounded-full bg-[var(--ember)]" style={{ marginLeft: `${(trimStart / Math.max(fileDuration, 31)) * 100}%`, width: `${((trimEnd - trimStart) / Math.max(fileDuration, 31)) * 100}%` }} />
          </div>
          <p className="mt-0.5 text-center text-[9px] font-bold text-white/70">{trimStart}s – {trimEnd}s · {trimEnd - trimStart}s clip</p>
        </div>
      )}
    </div>
  );

  // ─── Tool Panel ───────────────────────────────────────────────────────────────
  const renderToolPanel = () => {
    switch (activeTool) {
      case "trim": return (
        <div className="flex flex-col gap-[var(--space-lg)]">
          <h3 className="flex items-center gap-2 font-bold text-[var(--ink)]"><Scissors className="h-4 w-4 text-[var(--ember)]" /> Trim & Cut</h3>
          <div className="rounded-[var(--r)] border border-[var(--border)] bg-[var(--cream)] p-[var(--space-lg)]">
            <div className="mb-3 flex items-center justify-between text-sm"><span className="font-semibold text-[var(--ink)]">Duration: {trimEnd - trimStart}s</span><span className="text-[var(--steel)]">{fileDuration > 0 ? `of ${fileDuration}s` : "Upload to set"}</span></div>
            <label className="block text-xs font-semibold text-[var(--steel)] mb-1">Start: {trimStart}s</label>
            <input type="range" min={0} max={Math.max(fileDuration - 2, 28)} step={1} value={trimStart} onChange={e => setTrimStart(Math.min(Number(e.target.value), trimEnd - 2))} className="w-full accent-[var(--ember)] mb-3" />
            <label className="block text-xs font-semibold text-[var(--steel)] mb-1">End: {trimEnd}s</label>
            <input type="range" min={2} max={Math.max(fileDuration, 31)} step={1} value={trimEnd} onChange={e => setTrimEnd(Math.max(Number(e.target.value), trimStart + 2))} className="w-full accent-[var(--ember)]" />
          </div>
          <div className="rounded-[var(--r)] border border-[var(--border)] bg-[var(--cream)] p-[var(--space-lg)]">
            <p className="text-xs font-semibold text-[var(--steel)] mb-2">Quick Trim Presets</p>
            <div className="flex flex-wrap gap-2">
              {[15, 30, 45, 60].map(d => (
                <button key={d} type="button" onClick={() => { setTrimStart(0); setTrimEnd(d); toast.success(`Trimmed to ${d}s`); }} className="rounded-[var(--r-pill)] border border-[var(--border)] bg-[var(--white)] px-3 py-1.5 text-xs font-bold text-[var(--ink)] hover:border-[var(--ember)] hover:text-[var(--ember)] transition-colors">{d}s</button>
              ))}
            </div>
          </div>
        </div>
      );
      case "text": return (
        <div className="flex flex-col gap-[var(--space-lg)]">
          <h3 className="flex items-center gap-2 font-bold text-[var(--ink)]"><Type className="h-4 w-4 text-[var(--ember)]" /> Text Overlay</h3>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[var(--ink)]">Show Overlay</span>
            <button type="button" onClick={() => setShowOverlay(v => !v)} className={cx("relative h-6 w-11 rounded-full transition-colors", showOverlay ? "bg-[var(--ember)]" : "bg-[var(--warm)]")}>
              <span className={cx("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform", showOverlay ? "translate-x-5" : "translate-x-0.5")} />
            </button>
          </div>
          <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--steel)]">Overlay Text<input value={overlayText} onChange={e => setOverlayText(e.target.value)} className="min-h-10 rounded-[var(--r)] border border-[var(--border)] bg-[var(--cream)] px-3 text-sm font-medium text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--ember)]" /></label>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--steel)]">Font Size: {textSize}px<input type="range" min={14} max={48} step={2} value={textSize} onChange={e => setTextSize(Number(e.target.value))} className="accent-[var(--ember)]" /></label>
            <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--steel)]">Text Color<input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="h-10 w-full cursor-pointer rounded-[var(--r-sm)] border border-[var(--border)]" /></label>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold text-[var(--steel)]">Position</p>
            <div className="grid grid-cols-3 gap-1.5">
              {TEXT_POSITIONS.map(pos => (
                <button key={pos.id} type="button" onClick={() => setTextPosition(pos.id)} className={cx("rounded-[var(--r-sm)] border p-2 text-[10px] font-semibold transition-all", textPosition === pos.id ? "border-[var(--ember)] bg-[var(--ember)] text-white" : "border-[var(--border)] bg-[var(--cream)] text-[var(--steel)] hover:border-[var(--ink)]")}>{pos.label}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold text-[var(--steel)]">Animation</p>
            <div className="flex flex-wrap gap-2">
              {TEXT_ANIMATIONS.map(a => (
                <button key={a.id} type="button" onClick={() => setTextAnimation(a.id)} className={cx("rounded-[var(--r-pill)] border px-3 py-1.5 text-xs font-semibold transition-all", textAnimation === a.id ? "border-[var(--ember)] bg-[var(--ember)] text-white" : "border-[var(--border)] bg-[var(--cream)] text-[var(--steel)] hover:border-[var(--ink)]")}>{a.label}</button>
              ))}
            </div>
          </div>
        </div>
      );
      case "effects": return (
        <div className="flex flex-col gap-[var(--space-lg)]">
          <h3 className="flex items-center gap-2 font-bold text-[var(--ink)]"><Wand2 className="h-4 w-4 text-[var(--ember)]" /> Visual Effects</h3>
          <div className="grid gap-2">
            {EFFECTS.map(effect => (
              <button key={effect.id} type="button" onClick={() => setSelectedEffect(effect.id)} className={cx("rounded-[var(--r)] border p-3 text-left transition-all", selectedEffect === effect.id ? "border-[var(--ember)] bg-[var(--white)] shadow-sm" : "border-[var(--border)] bg-[var(--cream)] hover:bg-[var(--warm)]")}>
                <div className="flex items-center justify-between"><span className="text-sm font-bold text-[var(--ink)]">{effect.label}</span>{selectedEffect === effect.id && <Check className="h-4 w-4 text-[var(--ember)]" />}</div>
                <span className="text-xs leading-relaxed text-[var(--steel)]">{effect.note}</span>
              </button>
            ))}
          </div>
        </div>
      );
      case "transitions": return (
        <div className="flex flex-col gap-[var(--space-lg)]">
          <h3 className="flex items-center gap-2 font-bold text-[var(--ink)]"><Layers className="h-4 w-4 text-[var(--ember)]" /> Transitions</h3>
          <div className="grid grid-cols-2 gap-2">
            {TRANSITIONS.map(t => (
              <button key={t.id} type="button" onClick={() => { setSelectedTransition(t.id); toast.success(`Transition: ${t.label}`); }} className={cx("rounded-[var(--r)] border p-3 text-center transition-all", selectedTransition === t.id ? "border-[var(--ember)] bg-[var(--white)] shadow-sm" : "border-[var(--border)] bg-[var(--cream)] hover:bg-[var(--warm)]")}>
                <span className="block text-2xl mb-1">{t.preview}</span><span className="text-xs font-semibold text-[var(--ink)]">{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      );
      case "audio": return (
        <div className="flex flex-col gap-[var(--space-lg)]">
          <h3 className="flex items-center gap-2 font-bold text-[var(--ink)]"><Music className="h-4 w-4 text-[var(--ember)]" /> Audio</h3>
          <div>
            <p className="mb-2 text-xs font-semibold text-[var(--steel)]">Background Music</p>
            <div className="grid gap-2">
              {MUSIC_TRACKS.map(track => (
                <div key={track.id} className={cx("rounded-[var(--r)] border p-3 transition-all", selectedTrack === track.id ? "border-[var(--ember)] bg-[var(--white)] shadow-sm" : "border-[var(--border)] bg-[var(--cream)]")}>
                  <div className="flex items-center justify-between">
                    <button type="button" onClick={() => setSelectedTrack(track.id)} className="flex-1 text-left">
                      <span className="block text-sm font-bold text-[var(--ink)]">{track.label}</span>
                      {track.bpm && <span className="text-xs text-[var(--steel)]">{track.bpm}</span>}
                    </button>
                    {track.file && (
                      <button type="button" onClick={() => { setSelectedTrack(track.id); toggleAudioPreview(); }} className={cx("ml-2 flex h-8 w-8 items-center justify-center rounded-full border transition-colors", selectedTrack === track.id ? "border-[var(--ember)] bg-[var(--ember)] text-white" : "border-[var(--border)] bg-[var(--white)] text-[var(--ink)]")}>
                        {isAudioPlaying && selectedTrack === track.id ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 ml-0.5" />}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {selectedTrack !== "none" && MUSIC_TRACKS.find(t => t.id === selectedTrack)?.file && (
              <audio ref={audioRef} src={`${import.meta.env.BASE_URL}${MUSIC_TRACKS.find(t => t.id === selectedTrack)?.file}`} loop onEnded={() => setIsAudioPlaying(false)} />
            )}
          </div>
          <div className="rounded-[var(--r)] border border-[var(--border)] bg-[var(--cream)] p-[var(--space-lg)]">
            <label className="flex flex-col gap-2 text-xs font-semibold text-[var(--steel)]">
              <span className="flex items-center justify-between">Music Volume: {audioVolume}%<button type="button" onClick={() => setIsMuted(m => !m)} className="text-[var(--mauve)] hover:text-[var(--ink)]">{isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}</button></span>
              <input type="range" min={0} max={100} value={isMuted ? 0 : audioVolume} onChange={e => { setAudioVolume(Number(e.target.value)); setIsMuted(false); }} className="accent-[var(--ember)]" />
            </label>
            <label className="mt-3 flex flex-col gap-2 text-xs font-semibold text-[var(--steel)]">Original Audio: {originalVolume}%<input type="range" min={0} max={100} value={originalVolume} onChange={e => setOriginalVolume(Number(e.target.value))} className="accent-[var(--ember)]" /></label>
          </div>
        </div>
      );
      case "captions": return (
        <div className="flex flex-col gap-[var(--space-lg)]">
          <h3 className="flex items-center gap-2 font-bold text-[var(--ink)]"><FileVideo className="h-4 w-4 text-[var(--ember)]" /> Captions</h3>
          <div className="flex items-center justify-between rounded-[var(--r)] border border-[var(--border)] bg-[var(--cream)] p-3">
            <div><p className="text-sm font-bold text-[var(--ink)]">Auto-Captions</p><p className="text-xs text-[var(--steel)]">AI-generated from audio</p></div>
            <button type="button" onClick={() => { setCaptionsEnabled(v => !v); if (!captionsEnabled) toast.success("Auto-captions enabled."); }} className={cx("relative h-6 w-11 rounded-full transition-colors", captionsEnabled ? "bg-[var(--ember)]" : "bg-[var(--warm)]")}>
              <span className={cx("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform", captionsEnabled ? "translate-x-5" : "translate-x-0.5")} />
            </button>
          </div>
          {captionsEnabled && (
            <>
              <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--steel)]">Caption Text<textarea value={captionText} onChange={e => setCaptionText(e.target.value)} rows={3} className="rounded-[var(--r)] border border-[var(--border)] bg-[var(--cream)] px-3 py-2 text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--ember)]" /></label>
              <div>
                <p className="mb-2 text-xs font-semibold text-[var(--steel)]">Style</p>
                <div className="grid gap-2">{CAPTION_STYLES.map(s => (<button key={s.id} type="button" onClick={() => setCaptionStyle(s.id)} className={cx("rounded-[var(--r)] border p-2.5 text-left transition-all", captionStyle === s.id ? "border-[var(--ember)] bg-[var(--white)]" : "border-[var(--border)] bg-[var(--cream)] hover:bg-[var(--warm)]")}><span className={cx("text-sm", s.preview)}>{s.label}</span></button>))}</div>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold text-[var(--steel)]">Position</p>
                <div className="flex gap-2">{["top", "middle", "bottom"].map(pos => (<button key={pos} type="button" onClick={() => setCaptionPosition(pos)} className={cx("flex-1 rounded-[var(--r-pill)] border py-1.5 text-xs font-semibold capitalize transition-all", captionPosition === pos ? "border-[var(--ember)] bg-[var(--ember)] text-white" : "border-[var(--border)] bg-[var(--cream)] text-[var(--steel)] hover:border-[var(--ink)]")}>{pos}</button>))}</div>
              </div>
            </>
          )}
        </div>
      );
      case "filters": return (
        <div className="flex flex-col gap-[var(--space-lg)]">
          <h3 className="flex items-center gap-2 font-bold text-[var(--ink)]"><Filter className="h-4 w-4 text-[var(--ember)]" /> Color Filters</h3>
          <div className="grid grid-cols-3 gap-2">
            {COLOR_FILTERS.map(f => (
              <button key={f.id} type="button" onClick={() => setSelectedColorFilter(f.id)} className={cx("rounded-[var(--r)] border p-2 text-center transition-all", selectedColorFilter === f.id ? "border-[var(--ember)] shadow-sm" : "border-[var(--border)] hover:border-[var(--ink)]")}>
                <div className={cx("mx-auto mb-1.5 h-10 w-full rounded-[var(--r-sm)]", f.swatch)} /><span className="text-xs font-semibold text-[var(--ink)]">{f.label}</span>
              </button>
            ))}
          </div>
          <label className="flex flex-col gap-2 text-xs font-semibold text-[var(--steel)]">Filter Intensity: {filterIntensity}%<input type="range" min={0} max={100} value={filterIntensity} onChange={e => setFilterIntensity(Number(e.target.value))} className="accent-[var(--ember)]" /></label>
          <label className="flex flex-col gap-2 text-xs font-semibold text-[var(--steel)]">Brightness: {brightness}%<input type="range" min={50} max={150} value={brightness} onChange={e => setBrightness(Number(e.target.value))} className="accent-[var(--ember)]" /></label>
        </div>
      );
      case "speed": return (
        <div className="flex flex-col gap-[var(--space-lg)]">
          <h3 className="flex items-center gap-2 font-bold text-[var(--ink)]"><Zap className="h-4 w-4 text-[var(--ember)]" /> Speed</h3>
          <div className="rounded-[var(--r)] border border-[var(--border)] bg-[var(--cream)] p-[var(--space-lg)]">
            <div className="mb-3 flex items-center justify-between"><span className="text-sm font-bold text-[var(--ink)]">Playback Speed</span><span className="rounded-[var(--r-pill)] bg-[var(--ember)] px-3 py-1 text-xs font-black text-white">{playbackSpeed}×</span></div>
            <input type="range" min={0.25} max={2} step={0.25} value={playbackSpeed} onChange={e => setPlaybackSpeed(Number(e.target.value))} className="w-full accent-[var(--ember)]" />
            <div className="mt-2 flex justify-between text-[10px] text-[var(--mauve)]"><span>0.25×</span><span>0.5×</span><span>1×</span><span>1.5×</span><span>2×</span></div>
          </div>
          <div className="flex flex-wrap gap-2">{[0.5, 0.75, 1.0, 1.25, 1.5, 2.0].map(s => (<button key={s} type="button" onClick={() => setPlaybackSpeed(s)} className={cx("rounded-[var(--r-pill)] border px-3 py-1.5 text-xs font-bold transition-all", playbackSpeed === s ? "border-[var(--ember)] bg-[var(--ember)] text-white" : "border-[var(--border)] bg-[var(--cream)] text-[var(--ink)] hover:border-[var(--ink)]")}>{s}×</button>))}</div>
        </div>
      );
      case "format": return (
        <div className="flex flex-col gap-[var(--space-lg)]">
          <h3 className="flex items-center gap-2 font-bold text-[var(--ink)]"><Smartphone className="h-4 w-4 text-[var(--ember)]" /> Format & Ratio</h3>
          <div className="grid gap-2">
            {[{ ratio: "9:16", label: "Vertical (9:16)", desc: "TikTok, Reels, Shorts", icon: "📱" }, { ratio: "1:1", label: "Square (1:1)", desc: "Instagram Feed, Threads", icon: "⬜" }, { ratio: "16:9", label: "Landscape (16:9)", desc: "YouTube, Reddit, X", icon: "🖥" }, { ratio: "4:5", label: "Portrait (4:5)", desc: "Instagram Feed", icon: "🖼" }].map(f => (
              <button key={f.ratio} type="button" onClick={() => setSelectedFormat(f.ratio)} className={cx("rounded-[var(--r)] border p-3 text-left transition-all", selectedFormat === f.ratio ? "border-[var(--ember)] bg-[var(--white)] shadow-sm" : "border-[var(--border)] bg-[var(--cream)] hover:bg-[var(--warm)]")}>
                <div className="flex items-center gap-3"><span className="text-xl">{f.icon}</span><div><p className="text-sm font-bold text-[var(--ink)]">{f.label}</p><p className="text-xs text-[var(--steel)]">{f.desc}</p></div>{selectedFormat === f.ratio && <Check className="ml-auto h-4 w-4 text-[var(--ember)]" />}</div>
              </button>
            ))}
          </div>
        </div>
      );
      default: return null;
    }
  };

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <SharedLayout activeSite="os">
      {showIntro && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--ink)]/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-[var(--r-lg)] bg-[var(--white)] p-[var(--space-2xl)] shadow-2xl">
            <div className="mb-[var(--space-lg)] flex h-14 w-14 items-center justify-center rounded-[var(--r)] bg-[var(--ember)]"><Sparkles className="h-7 w-7 text-white" /></div>
            <h2 className="text-2xl font-black tracking-tight text-[var(--ink)]">Welcome to SPRK<span className="text-[var(--ember)]">*</span>Studio</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--steel)]">Upload a short-form video, apply professional edits, select your target platforms, and package everything for deployment — all in one workflow.</p>
            <ul className="mt-4 space-y-2 text-sm text-[var(--steel)]">
              {["Upload your video from device", "Apply effects, text, audio & more", "Optimize for TikTok, IG, YouTube & more", "Download or send to SPRK*Pavilion"].map((item, i) => (
                <li key={i} className="flex items-center gap-2"><Check className="h-4 w-4 shrink-0 text-[var(--ember)]" />{item}</li>
              ))}
            </ul>
            <button type="button" onClick={() => { window.localStorage.setItem("sprk-studio-intro-seen", "true"); setShowIntro(false); }} className="mt-6 w-full rounded-[var(--r-pill)] bg-[var(--ember)] py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#E55A2B]">Open Studio</button>
          </div>
        </div>
      )}

      <section className="min-h-screen bg-[var(--cream)] px-[var(--space-lg)] py-[var(--space-2xl)] md:px-[var(--space-2xl)]">
        <div className="mx-auto max-w-[1400px]">
          {/* Header */}
          <div className="mb-[var(--space-xl)] flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ember)]">SPRK<span className="text-[var(--ink)]">*</span>Studio</p>
              <h1 className="mt-1 text-[clamp(22px,3vw,36px)] font-black leading-none tracking-tight text-[var(--ink)]">
                {step === 1 && "Upload Your Video"}{step === 2 && "Edit & Refine"}{step === 3 && "Select Platforms"}{step === 4 && "Confirm & Certify"}{step === 5 && "Processing"}{step === 6 && "Package Ready"}
              </h1>
            </div>
            <StepIndicator step={step} />
          </div>

          {/* STEP 1: UPLOAD */}
          {step === 1 && (
            <div className="grid gap-[var(--space-xl)] lg:grid-cols-[1fr_320px]">
              <div className="flex flex-col gap-[var(--space-xl)]">
                <div onClick={() => fileInputRef.current?.click()} className="flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-[var(--r-lg)] border-2 border-dashed border-[var(--border)] bg-[var(--white)] p-[var(--space-2xl)] text-center transition-all hover:border-[var(--ember)] hover:bg-[var(--warm)]">
                  <input ref={fileInputRef} type="file" accept="video/*" className="hidden" onChange={handleFileSelect} />
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--warm)]"><Upload className="h-8 w-8 text-[var(--ember)]" /></div>
                  <h3 className="mt-4 text-lg font-bold text-[var(--ink)]">Drop your video here</h3>
                  <p className="mt-2 text-sm text-[var(--steel)]">MP4, MOV, WebM · Up to 2GB · Short-form recommended</p>
                  <button type="button" className="mt-4 rounded-[var(--r-pill)] bg-[var(--ember)] px-6 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#E55A2B]">Choose File</button>
                </div>
                {isUploaded && (
                  <div className="rounded-[var(--r-lg)] border border-[var(--success)] bg-[var(--warm)] p-[var(--space-xl)]">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--r)] bg-[var(--success)]"><FileVideo className="h-5 w-5 text-white" /></div>
                        <div><p className="font-bold text-[var(--ink)]">{fileName}</p><p className="text-xs text-[var(--steel)]">{fileSize} MB · {fileDuration > 0 ? `${fileDuration}s` : "loading…"}</p></div>
                      </div>
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--success)]" />
                    </div>
                  </div>
                )}
                {!isUploaded && (
                  <div className="rounded-[var(--r)] border border-[var(--border)] bg-[var(--white)] p-[var(--space-lg)]">
                    <div className="flex items-center gap-3">
                      <Info className="h-5 w-5 shrink-0 text-[var(--steel)]" />
                      <div className="flex-1"><p className="text-sm font-bold text-[var(--ink)]">No video handy?</p><p className="text-xs text-[var(--steel)]">Load our demo file to explore the full Studio workflow.</p></div>
                      <button type="button" onClick={simulateUpload} className="shrink-0 rounded-[var(--r-pill)] border border-[var(--ink)] px-4 py-2 text-xs font-bold text-[var(--ink)] transition-all hover:bg-[var(--ink)] hover:text-white">Load Demo</button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-[var(--space-lg)]">
                {renderPreview()}
                <div className="rounded-[var(--r)] border border-[var(--border)] bg-[var(--white)] p-[var(--space-lg)]">
                  <p className="text-xs font-black uppercase tracking-wider text-[var(--mauve)] mb-3">File Details</p>
                  <dl className="grid gap-2 text-sm">
                    <div className="flex justify-between"><dt className="text-[var(--steel)]">File</dt><dd className="font-bold text-[var(--ink)] truncate max-w-[160px]">{fileName || "—"}</dd></div>
                    <div className="flex justify-between"><dt className="text-[var(--steel)]">Size</dt><dd className="font-bold text-[var(--ink)]">{fileSize > 0 ? `${fileSize} MB` : "—"}</dd></div>
                    <div className="flex justify-between"><dt className="text-[var(--steel)]">Duration</dt><dd className="font-bold text-[var(--ink)]">{fileDuration > 0 ? `${fileDuration}s` : "—"}</dd></div>
                    <div className="flex justify-between"><dt className="text-[var(--steel)]">Format</dt><dd className="font-bold text-[var(--ink)]">{fileName ? "MP4" : "—"}</dd></div>
                  </dl>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: EDIT */}
          {step === 2 && (
            <div className="grid gap-[var(--space-xl)] lg:grid-cols-[220px_1fr_300px] xl:grid-cols-[240px_1fr_320px]">
              <aside className="flex flex-row flex-wrap gap-1 lg:flex-col lg:gap-1">
                {TOOLS.map(tool => (
                  <button key={tool.id} type="button" onClick={() => setActiveTool(tool.id)} className={cx("flex items-center gap-2 rounded-[var(--r)] border px-3 py-2.5 text-sm font-semibold transition-all lg:w-full", activeTool === tool.id ? "border-[var(--ember)] bg-[var(--ember)] text-white shadow-sm" : "border-[var(--border)] bg-[var(--white)] text-[var(--steel)] hover:border-[var(--ink)] hover:text-[var(--ink)]")}>
                    {tool.icon}<span className="hidden sm:block">{tool.label}</span>
                  </button>
                ))}
              </aside>
              <main className="flex flex-col gap-[var(--space-lg)]">
                <div className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--white)] p-[var(--space-xl)]">{renderToolPanel()}</div>
                <div className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--white)] p-[var(--space-xl)]">
                  <div className="mb-3 flex items-center gap-2 font-bold text-[var(--ink)]"><Flame className="h-4 w-4 text-[var(--ember)]" /> Hashtags</div>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {hashtags.map(tag => (
                      <span key={tag} className="inline-flex items-center gap-1.5 rounded-[var(--r-pill)] border border-[var(--border)] bg-[var(--warm)] px-3 py-1 text-xs font-bold text-[var(--steel)]">#{tag}<button type="button" onClick={() => setHashtags(c => c.filter(h => h !== tag))} aria-label={`Remove #${tag}`} className="text-[var(--mauve)] hover:text-[var(--ink)]"><X className="h-3 w-3" /></button></span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input value={hashtagInput} onChange={e => setHashtagInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addHashtag(); } }} placeholder="Add hashtag (press Enter)" className="min-h-10 flex-1 rounded-[var(--r)] border border-[var(--border)] bg-[var(--cream)] px-3 text-sm text-[var(--ink)] placeholder:text-[var(--blush)] focus:outline-none focus:ring-2 focus:ring-[var(--ember)]" />
                    <button type="button" onClick={addHashtag} className="inline-flex h-10 items-center gap-1 rounded-[var(--r-pill)] bg-[var(--ink)] px-4 text-sm font-bold text-white hover:bg-[var(--navy)]"><Plus className="h-4 w-4" /> Add</button>
                  </div>
                </div>
              </main>
              <aside className="flex flex-col gap-[var(--space-lg)]">
                <div className="sticky top-[80px]">
                  <p className="mb-2 text-xs font-black uppercase tracking-wider text-[var(--mauve)]">Live Preview</p>
                  {renderPreview()}
                  <div className="mt-3 rounded-[var(--r)] border border-[var(--border)] bg-[var(--white)] p-3">
                    <dl className="grid gap-1.5 text-xs">
                      <div className="flex justify-between"><dt className="text-[var(--steel)]">Clip</dt><dd className="font-bold text-[var(--ink)]">{trimStart}s–{trimEnd}s</dd></div>
                      <div className="flex justify-between"><dt className="text-[var(--steel)]">Effect</dt><dd className="font-bold text-[var(--ink)]">{EFFECTS.find(e => e.id === selectedEffect)?.label}</dd></div>
                      <div className="flex justify-between"><dt className="text-[var(--steel)]">Speed</dt><dd className="font-bold text-[var(--ink)]">{playbackSpeed}×</dd></div>
                      <div className="flex justify-between"><dt className="text-[var(--steel)]">Format</dt><dd className="font-bold text-[var(--ink)]">{selectedFormat}</dd></div>
                      <div className="flex justify-between"><dt className="text-[var(--steel)]">Music</dt><dd className="font-bold text-[var(--ink)]">{MUSIC_TRACKS.find(t => t.id === selectedTrack)?.label || "None"}</dd></div>
                    </dl>
                  </div>
                </div>
              </aside>
            </div>
          )}

          {/* STEP 3: PLATFORMS */}
          {step === 3 && (
            <div className="grid gap-[var(--space-xl)] lg:grid-cols-[1fr_340px]">
              <div className="flex flex-col gap-[var(--space-xl)]">
                <div className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--white)] p-[var(--space-xl)]">
                  <h3 className="mb-1 font-bold text-[var(--ink)]">Select Target Platforms</h3>
                  <p className="mb-4 text-sm text-[var(--steel)]">SPRK* is always included. Select up to {PLATFORM_LIMIT - 1} additional platforms.</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {displayedPlatforms.map(platform => {
                      const isSelected = selectedPlatforms.includes(platform.id);
                      return (
                        <button key={platform.id} type="button" onClick={() => togglePlatform(platform.id)} className={cx("rounded-[var(--r)] border p-3 text-left transition-all", platform.locked ? "cursor-not-allowed opacity-80" : "", isSelected ? "border-[var(--ember)] bg-[var(--white)] shadow-sm" : "border-[var(--border)] bg-[var(--cream)] hover:bg-[var(--warm)]")}>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-1.5"><span className="text-sm font-bold text-[var(--ink)]">{platform.label}</span>{platform.locked && <Lock className="h-3 w-3 text-[var(--ember)]" />}</div>
                              <p className="text-xs text-[var(--steel)]">{platform.audience}</p>
                              <p className="mt-1 text-[10px] text-[var(--mauve)]">{platform.ratio} · {platform.maxDur}</p>
                            </div>
                            <div className={cx("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all", isSelected ? "border-[var(--ember)] bg-[var(--ember)]" : "border-[var(--border)]")}>{isSelected && <Check className="h-3 w-3 text-white" />}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {!showAllPlatforms && PLATFORMS.length > 8 && (
                    <button type="button" onClick={() => setShowAllPlatforms(true)} className="mt-3 flex w-full items-center justify-center gap-1 text-sm font-semibold text-[var(--steel)] hover:text-[var(--ink)]"><ChevronDown className="h-4 w-4" /> Show all platforms</button>
                  )}
                </div>
                {selectedPlatforms.includes("tiktok") && (
                  <div className="rounded-[var(--r-lg)] border border-[var(--ember)]/30 bg-[var(--white)] p-[var(--space-xl)]">
                    <div className="mb-4 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white text-xs font-black">TT</div>
                      <div><h4 className="font-bold text-[var(--ink)]">TikTok Optimization</h4><p className="text-xs text-[var(--steel)]">Active — settings applied automatically</p></div>
                      <span className="ml-auto rounded-[var(--r-pill)] bg-[var(--success)] px-2 py-0.5 text-[10px] font-black uppercase text-white">Active</span>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {[{ label: "Apply 9:16 Safe Zones", desc: "Avoids TikTok UI overlaps" }, { label: "Generate AI Hooks", desc: "Platform-tuned first-3-second hook" }, { label: "Auto-Add Trending Sound", desc: "Suggest matching trending audio" }, { label: "Optimize Caption Length", desc: "150 char limit for full display" }].map(opt => (
                        <div key={opt.label} className="flex items-start gap-2 rounded-[var(--r)] border border-[var(--success)]/30 bg-[var(--warm)] p-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--success)]" />
                          <div><p className="text-xs font-bold text-[var(--ink)]">{opt.label}</p><p className="text-[10px] text-[var(--steel)]">{opt.desc}</p></div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 rounded-[var(--r)] bg-[var(--cream)] p-3">
                      <p className="text-xs font-bold text-[var(--ink)] mb-2">💡 TikTok Pro Tips</p>
                      <ul className="space-y-1">{TIKTOK_TIPS.map((tip, i) => <li key={i} className="text-xs text-[var(--steel)]">• {tip}</li>)}</ul>
                    </div>
                  </div>
                )}
                {selectedPlatforms.filter(id => id !== "sprk" && id !== "tiktok").length > 0 && (
                  <div className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--white)] p-[var(--space-xl)]">
                    <h4 className="mb-3 font-bold text-[var(--ink)]">Additional Platform Optimization</h4>
                    <div className="grid gap-2">
                      {selectedPlatforms.filter(id => id !== "sprk" && id !== "tiktok").map(id => {
                        const platform = PLATFORMS.find(p => p.id === id);
                        return platform ? (
                          <div key={id} className="flex items-center justify-between rounded-[var(--r)] border border-[var(--border)] bg-[var(--cream)] p-3">
                            <div><p className="text-sm font-bold text-[var(--ink)]">{platform.label}</p><p className="text-xs text-[var(--steel)]">Optimization panel — coming in next iteration</p></div>
                            <span className="rounded-[var(--r-pill)] bg-[var(--warm)] px-2 py-0.5 text-[10px] font-bold text-[var(--mauve)] border border-[var(--border)]">Soon</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
              <aside className="flex flex-col gap-[var(--space-lg)]">
                <div className="sticky top-[80px]">
                  <p className="mb-2 text-xs font-black uppercase tracking-wider text-[var(--mauve)]">Package Preview</p>
                  {renderPreview()}
                  <div className="mt-3 rounded-[var(--r)] border border-[var(--border)] bg-[var(--white)] p-3">
                    <p className="mb-2 text-xs font-black uppercase tracking-wider text-[var(--mauve)]">Selected Surfaces</p>
                    <div className="flex flex-wrap gap-1.5">{selectedPlatformObjects.map(p => <span key={p.id} className="rounded-[var(--r-pill)] bg-[var(--warm)] border border-[var(--border)] px-2 py-1 text-xs font-bold text-[var(--ink)]">{p.label}</span>)}</div>
                    <p className="mt-2 text-xs text-[var(--steel)]">{selectedPlatformObjects.length} surface{selectedPlatformObjects.length !== 1 ? "s" : ""} selected</p>
                  </div>
                </div>
              </aside>
            </div>
          )}

          {/* STEP 4: CONFIRM */}
          {step === 4 && (
            <div className="grid gap-[var(--space-xl)] lg:grid-cols-[1fr_320px]">
              <div className="flex flex-col gap-[var(--space-xl)]">
                <div className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--white)] p-[var(--space-xl)]">
                  <h3 className="mb-4 font-bold text-[var(--ink)]">Package Summary</h3>
                  <dl className="grid gap-3 text-sm">
                    {[{ label: "File", value: fileName }, { label: "Clip Duration", value: `${trimStart}s – ${trimEnd}s (${trimEnd - trimStart}s)` }, { label: "Effect", value: EFFECTS.find(e => e.id === selectedEffect)?.label || "None" }, { label: "Speed", value: `${playbackSpeed}×` }, { label: "Format", value: selectedFormat }, { label: "Music", value: MUSIC_TRACKS.find(t => t.id === selectedTrack)?.label || "None" }, { label: "Captions", value: captionsEnabled ? `Enabled (${CAPTION_STYLES.find(s => s.id === captionStyle)?.label})` : "Disabled" }, { label: "Hashtags", value: hashtags.map(h => `#${h}`).join(", ") || "None" }, { label: "Platforms", value: selectedPlatformObjects.map(p => p.label).join(", ") }].map(item => (
                      <div key={item.label} className="flex justify-between gap-4 border-b border-[var(--border)] pb-3 last:border-0 last:pb-0">
                        <dt className="shrink-0 font-semibold text-[var(--steel)]">{item.label}</dt><dd className="text-right font-bold text-[var(--ink)]">{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--white)] p-[var(--space-xl)]">
                  <div className="mb-4 flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-[var(--ember)]" /><h3 className="font-bold text-[var(--ink)]">Content Accountability Disclaimer</h3></div>
                  <div className="max-h-48 overflow-y-auto rounded-[var(--r)] border border-[var(--border)] bg-[var(--cream)] p-4 text-xs leading-relaxed text-[var(--steel)]">
                    <p className="mb-3"><strong className="text-[var(--ink)]">SPRK Creator Content Agreement</strong></p>
                    <p className="mb-2">By proceeding, you ("Creator") confirm and certify the following:</p>
                    <p className="mb-2"><strong>1. Ownership & Rights.</strong> You own or have obtained all necessary rights, licenses, and permissions for the uploaded content, including any music, footage, images, likenesses, and intellectual property contained therein.</p>
                    <p className="mb-2"><strong>2. Compliance.</strong> The content does not violate any applicable laws, regulations, or platform policies of the selected distribution surfaces.</p>
                    <p className="mb-2"><strong>3. AI Disclosure.</strong> If any element of this content was generated or substantially modified using artificial intelligence, you acknowledge your obligation to disclose this where required by applicable platform policies.</p>
                    <p className="mb-2"><strong>4. Liability.</strong> You accept full responsibility for the content and its distribution. SPRK Unlimited LLC provides processing and distribution tools only and assumes no liability for the content itself.</p>
                    <p className="mb-2"><strong>5. SPRK*Pavilion.</strong> You consent to a copy of this content being indexed and made discoverable within SPRK*Pavilion for brand and agency partnership opportunities, subject to your privacy settings.</p>
                    <p><strong>6. Storage.</strong> SPRK will store processed files for 72 hours. Reminder notifications will be sent at 48h, 24h, 12h, 1h, and 15 minutes before expiration.</p>
                  </div>
                  <label className="mt-4 flex cursor-pointer items-start gap-3">
                    <div className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                      <input type="checkbox" className="peer sr-only" checked={termsAccepted} onChange={e => { setTermsAccepted(e.target.checked); setTermsAlert(""); }} />
                      <div className="h-5 w-5 rounded border-2 border-[var(--border)] peer-checked:border-[var(--ember)] peer-checked:bg-[var(--ember)] transition-all" />
                      <Check className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-sm font-semibold text-[var(--ink)]">I have read and agree to the SPRK Content Accountability Terms. I confirm this content package is ready for review and distribution.</span>
                  </label>
                  {termsAlert && <div className="mt-3 flex items-center gap-2 rounded-[var(--r)] border border-[var(--error)] bg-red-50 p-3 text-xs font-semibold text-[var(--error)]"><AlertCircle className="h-4 w-4 shrink-0" /> {termsAlert}</div>}
                </div>
              </div>
              <aside className="flex flex-col gap-[var(--space-lg)]"><div className="sticky top-[80px]">{renderPreview()}</div></aside>
            </div>
          )}

          {/* STEP 5: PROCESSING */}
          {step === 5 && (
            <div className="flex flex-col items-center gap-[var(--space-xl)] py-[var(--space-3xl)] text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-[var(--success)] bg-[var(--warm)]"><Loader2 className="h-10 w-10 animate-spin text-[var(--success)]" /></div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--mauve)]">Processing</p>
                <h2 className="mt-2 text-[clamp(24px,3vw,40px)] font-bold leading-tight tracking-tight text-[var(--ink)]">{loadingMessage}</h2>
                <p className="mt-3 text-sm text-[var(--steel)]">SPRK*Studio is rendering and packaging your content for each selected surface.</p>
              </div>
              <div className="w-full max-w-2xl space-y-3">
                {selectedPlatformObjects.map(platform => (
                  <div key={platform.id} className="rounded-[var(--r)] border border-[var(--success)] bg-[var(--warm)] p-4 text-left">
                    <div className="mb-2 flex items-center justify-between text-sm font-bold text-[var(--ink)]"><span>{platform.label}</span><span className="text-[var(--success)]">{Math.round(loadingProgress[platform.id] ?? 0)}%</span></div>
                    <div className="h-2 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full bg-[var(--success)] transition-all duration-700" style={{ width: `${loadingProgress[platform.id] ?? 0}%` }} /></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6: DELIVER */}
          {step === 6 && (
            <div className="flex flex-col gap-[var(--space-xl)]">
              <div className="rounded-[var(--r-lg)] border border-[var(--success)] bg-[var(--warm)] p-[var(--space-xl)] text-center">
                <CheckCircle2 className="mx-auto h-14 w-14 text-[var(--success)]" />
                <h2 className="mt-3 text-[clamp(24px,3vw,40px)] font-bold tracking-tight text-[var(--ink)]">Package Ready.</h2>
                <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-[var(--steel)]">Your "{fileName.replace(".mp4", "")}" clip has been processed and packaged for {selectedPlatformObjects.length} surfaces.</p>
              </div>
              <div className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--white)] p-[var(--space-xl)]">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-[var(--r)] bg-[var(--warm)]"><Clock3 className="h-5 w-5 text-[var(--ember)]" /></div>
                    <div><p className="font-bold text-[var(--ink)]">Files expire in: <span className="font-black text-[var(--ember)]">72:00:00</span></p><p className="text-xs text-[var(--steel)]">Reminders at 48h, 24h, 12h, 1h, and 15 min before expiration.</p></div>
                  </div>
                  <button type="button" onClick={() => setShowStorageModal(true)} className="rounded-[var(--r-pill)] border border-[var(--ember)] px-4 py-2 text-xs font-bold text-[var(--ember)] hover:bg-[var(--ember)] hover:text-white transition-all">Extend Storage →</button>
                </div>
              </div>
              <div className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--white)] p-[var(--space-xl)]">
                <h3 className="mb-4 font-bold text-[var(--ink)]">File Versions Created</h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {selectedPlatformObjects.map(platform => (
                    <div key={platform.id} className="flex items-center justify-between rounded-[var(--r)] border border-[var(--success)] bg-[var(--warm)] p-3">
                      <div><p className="text-sm font-bold text-[var(--ink)]">{platform.label}</p><p className="text-xs text-[var(--steel)]">{platform.ratio} · {trimEnd - trimStart}s · {EFFECTS.find(e => e.id === selectedEffect)?.label}</p><p className="text-[10px] text-[var(--mauve)]">sprk_{platform.id}_{fileName.replace(".mp4", "")}.mp4</p></div>
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--success)]" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--white)] p-[var(--space-xl)]">
                <h3 className="mb-4 font-bold text-[var(--ink)]">Download Your Files</h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {[{ label: "Download to Device", icon: <Download className="h-5 w-5" />, action: () => toast.success("Preparing download package…"), color: "bg-[var(--ink)] text-white hover:bg-[var(--navy)]" }, { label: "Save to Google Drive", icon: <Cloud className="h-5 w-5" />, action: () => setShowDriveModal(true), color: "border border-[var(--border)] bg-[var(--warm)] text-[var(--ink)] hover:border-[var(--ink)]" }, { label: "Save to iCloud", icon: <Cloud className="h-5 w-5" />, action: () => setShowICloudModal(true), color: "border border-[var(--border)] bg-[var(--warm)] text-[var(--ink)] hover:border-[var(--ink)]" }, { label: "Buy SPRK Storage", icon: <HardDrive className="h-5 w-5" />, action: () => setShowStorageModal(true), color: "border border-[var(--ember)] text-[var(--ember)] hover:bg-[var(--ember)] hover:text-white" }].map(opt => (
                    <button key={opt.label} type="button" onClick={opt.action} className={cx("flex flex-col items-center gap-2 rounded-[var(--r)] p-4 text-sm font-bold transition-all", opt.color)}>{opt.icon}<span className="text-center text-xs">{opt.label}</span></button>
                  ))}
                </div>
              </div>
              {!showPavilionPreview ? (
                <div className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--white)] p-[var(--space-xl)]">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div><h3 className="font-bold text-[var(--ink)]">SPRK<span className="text-[var(--ember)]">*</span>Pavilion Handoff</h3><p className="mt-1 text-sm text-[var(--steel)]">A copy has been indexed and is ready for brand & agency discovery.</p></div>
                    <button type="button" onClick={() => setShowPavilionPreview(true)} className="rounded-[var(--r-pill)] bg-gradient-to-r from-[var(--ember)] to-[var(--crimson)] px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5">Preview in Pavilion →</button>
                  </div>
                </div>
              ) : (
                <div className="rounded-[var(--r-lg)] border-2 border-[var(--ember)] bg-[var(--white)] p-[var(--space-xl)]">
                  <div className="mb-4 flex items-center gap-2"><Star className="h-5 w-5 text-[var(--ember)]" /><h3 className="font-bold text-[var(--ink)]">How this appears in SPRK<span className="text-[var(--ember)]">*</span>Pavilion</h3></div>
                  <div className="overflow-hidden rounded-[var(--r-lg)] border border-[var(--border)] shadow-md max-w-sm">
                    <div className="relative aspect-[9/16] max-h-64 overflow-hidden bg-[var(--navy)]">
                      <img src={PREVIEW_ASSET} alt="Pavilion preview" className="h-full w-full object-cover" style={{ filter: previewFilter }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-4"><span className="rounded-[var(--r-pill)] bg-[var(--ember)] px-2 py-0.5 text-[10px] font-black uppercase text-white">New Drop</span><p className="mt-1 text-sm font-black text-white">{overlayText}</p></div>
                    </div>
                    <div className="bg-[var(--white)] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[var(--ember)] to-[var(--crimson)]" />
                        <div><p className="text-xs font-bold text-[var(--ink)]">@generra_sprrkles</p><p className="text-[10px] text-[var(--steel)]">Creator · {selectedPlatformObjects.length} surfaces</p></div>
                      </div>
                      <div className="flex flex-wrap gap-1">{hashtags.slice(0, 3).map(tag => <span key={tag} className="rounded-[var(--r-pill)] bg-[var(--warm)] px-2 py-0.5 text-[10px] font-semibold text-[var(--steel)]">#{tag}</span>)}</div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button type="button" onClick={() => setStep(2)} className="flex-1 rounded-[var(--r)] border border-[var(--border)] bg-[var(--warm)] py-2.5 text-sm font-bold text-[var(--ink)] hover:bg-[var(--cream)] transition-all">← Return to Studio</button>
                    <button type="button" onClick={() => navigate("/pavilion")} className="flex-1 rounded-[var(--r-pill)] bg-gradient-to-r from-[var(--ember)] to-[var(--crimson)] py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5">View in Pavilion →</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          {step !== 5 && (
            <div className="mt-[var(--space-2xl)] flex items-center justify-between gap-4 border-t border-[var(--border)] pt-[var(--space-xl)]">
              <button type="button" onClick={() => setStep(s => Math.max(s - 1, 1))} disabled={step === 1} className="inline-flex items-center gap-2 rounded-[var(--r)] border border-[var(--border)] bg-[var(--white)] px-5 py-2.5 text-sm font-bold text-[var(--ink)] transition-all hover:bg-[var(--warm)] disabled:cursor-not-allowed disabled:opacity-40"><ChevronLeft className="h-4 w-4" /> Back</button>
              {step < 6 ? (
                <button type="button" onClick={moveNext} disabled={!canContinue} className="inline-flex items-center gap-2 rounded-[var(--r-pill)] bg-[var(--ember)] px-6 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#E55A2B] disabled:cursor-not-allowed disabled:opacity-40">
                  {step === 4 ? "Process Package" : "Continue"} <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button type="button" onClick={() => { setStep(1); setFileName(""); setVideoObjectUrl(null); }} className="inline-flex items-center gap-2 rounded-[var(--r-pill)] bg-[var(--ink)] px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-[var(--navy)]">Start New Project <Sparkles className="h-4 w-4" /></button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* STORAGE MODAL */}
      {showStorageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--ink)]/70 backdrop-blur-sm p-4" onClick={() => setShowStorageModal(false)}>
          <div className="w-full max-w-md rounded-[var(--r-lg)] bg-[var(--white)] p-[var(--space-2xl)] shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between"><h3 className="text-xl font-black text-[var(--ink)]">SPRK<span className="text-[var(--ember)]">*</span> Storage</h3><button type="button" onClick={() => setShowStorageModal(false)} className="text-[var(--mauve)] hover:text-[var(--ink)]"><X className="h-5 w-5" /></button></div>
            <p className="mb-4 text-sm text-[var(--steel)]">Extend your file storage beyond the 72-hour window.</p>
            <div className="grid gap-3">
              {[{ plan: "7 Days", price: "$2.99", features: ["All file versions", "Priority download"] }, { plan: "30 Days", price: "$7.99", features: ["All file versions", "Priority download", "Version history"] }, { plan: "1 Year", price: "$49.99", features: ["Unlimited storage", "All features", "Creator archive"] }].map(tier => (
                <button key={tier.plan} type="button" onClick={() => { setShowStorageModal(false); toast.success(`${tier.plan} storage plan selected — checkout coming soon.`); }} className="rounded-[var(--r)] border border-[var(--border)] p-4 text-left transition-all hover:border-[var(--ember)] hover:shadow-sm">
                  <div className="flex items-center justify-between"><span className="font-bold text-[var(--ink)]">{tier.plan}</span><span className="font-black text-[var(--ember)]">{tier.price}</span></div>
                  <ul className="mt-2 space-y-1">{tier.features.map(f => <li key={f} className="flex items-center gap-1.5 text-xs text-[var(--steel)]"><Check className="h-3 w-3 text-[var(--success)]" />{f}</li>)}</ul>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* GOOGLE DRIVE MODAL */}
      {showDriveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--ink)]/70 backdrop-blur-sm p-4" onClick={() => setShowDriveModal(false)}>
          <div className="w-full max-w-sm rounded-[var(--r-lg)] bg-[var(--white)] p-[var(--space-2xl)] shadow-2xl text-center" onClick={e => e.stopPropagation()}>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50"><Cloud className="h-7 w-7 text-blue-500" /></div>
            <h3 className="text-lg font-black text-[var(--ink)]">Connect Google Drive</h3>
            <p className="mt-2 mb-4 text-sm text-[var(--steel)]">Authorize SPRK to save files to your Google Drive via OAuth 2.0.</p>
            <div className="rounded-[var(--r)] border border-[var(--border)] bg-[var(--cream)] p-3 mb-4 text-left">
              <p className="text-xs font-bold text-[var(--ink)] mb-1">Permissions requested:</p>
              <ul className="space-y-1 text-xs text-[var(--steel)]"><li>• Create files in your Drive</li><li>• Read file names (to avoid duplicates)</li></ul>
              <p className="mt-2 text-[10px] text-[var(--mauve)]">OAuth 2.0 — SPRK never sees your Drive password.</p>
            </div>
            <button type="button" onClick={() => { setShowDriveModal(false); toast.success("Google Drive OAuth — coming in next iteration."); }} className="w-full rounded-[var(--r-pill)] bg-blue-500 py-3 text-sm font-bold text-white hover:bg-blue-600 transition-colors">Connect with Google</button>
            <button type="button" onClick={() => setShowDriveModal(false)} className="mt-2 w-full text-sm text-[var(--steel)] hover:text-[var(--ink)]">Cancel</button>
          </div>
        </div>
      )}

      {/* ICLOUD MODAL */}
      {showICloudModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--ink)]/70 backdrop-blur-sm p-4" onClick={() => setShowICloudModal(false)}>
          <div className="w-full max-w-sm rounded-[var(--r-lg)] bg-[var(--white)] p-[var(--space-2xl)] shadow-2xl text-center" onClick={e => e.stopPropagation()}>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-50"><Cloud className="h-7 w-7 text-gray-600" /></div>
            <h3 className="text-lg font-black text-[var(--ink)]">Connect iCloud Drive</h3>
            <p className="mt-2 mb-4 text-sm text-[var(--steel)]">Save your SPRK files directly to iCloud Drive via Apple's CloudKit framework.</p>
            <div className="rounded-[var(--r)] border border-[var(--border)] bg-[var(--cream)] p-3 mb-4 text-left">
              <p className="text-xs font-bold text-[var(--ink)] mb-1">Permissions requested:</p>
              <ul className="space-y-1 text-xs text-[var(--steel)]"><li>• Write to your iCloud Drive</li><li>• Create a SPRK folder</li></ul>
              <p className="mt-2 text-[10px] text-[var(--mauve)]">Apple Sign In — SPRK never sees your Apple ID password.</p>
            </div>
            <button type="button" onClick={() => { setShowICloudModal(false); toast.success("iCloud integration — coming in next iteration."); }} className="w-full rounded-[var(--r-pill)] bg-gray-900 py-3 text-sm font-bold text-white hover:bg-gray-700 transition-colors">Sign in with Apple</button>
            <button type="button" onClick={() => setShowICloudModal(false)} className="mt-2 w-full text-sm text-[var(--steel)] hover:text-[var(--ink)]">Cancel</button>
          </div>
        </div>
      )}
    </SharedLayout>
  );
}
