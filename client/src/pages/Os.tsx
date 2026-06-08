import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileVideo,
  Loader2,
  Lock,
  Play,
  Plus,
  Scissors,
  ShieldCheck,
  Sparkles,
  Type,
  Upload,
  Wand2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import SharedLayout from "@/components/SharedLayout";

const steps = [
  { id: 1, label: "Upload" },
  { id: 2, label: "Edit" },
  { id: 3, label: "Platforms" },
  { id: 4, label: "Terms" },
  { id: 5, label: "Package" },
  { id: 6, label: "Success" },
];

const effects = [
  { id: "cinematic", label: "Cinematic Lift", note: "Deep contrast, clean creator-safe color." },
  { id: "launch", label: "Launch Pulse", note: "Fast cuts, drop-card flash, high urgency." },
  { id: "studio", label: "Studio Polish", note: "Balanced clarity for brand review." },
];

const platforms = [
  { id: "sprk", label: "SPRK", audience: "Native drop layer", locked: true },
  { id: "tiktok", label: "TikTok", audience: "Vertical discovery" },
  { id: "instagram", label: "Instagram", audience: "Reels + Stories" },
  { id: "youtube", label: "YouTube Shorts", audience: "Searchable reach" },
  { id: "twitch", label: "Twitch", audience: "Live replay" },
  { id: "reddit", label: "Reddit", audience: "Community proof" },
  { id: "snap", label: "Snap Spotlight", audience: "Short-form energy" },
  { id: "x", label: "X", audience: "Real-time momentum" },
  { id: "threads", label: "Threads", audience: "Conversation layer" },
  { id: "pinterest", label: "Pinterest", audience: "Visual intent" },
  { id: "linkedin", label: "LinkedIn", audience: "Founder proof" },
  { id: "spotify", label: "Spotify Clips", audience: "Audio culture" },
  { id: "discord", label: "Discord", audience: "Private community" },
  { id: "kick", label: "Kick", audience: "Creator livestream" },
  { id: "shopify", label: "Shopify Feed", audience: "Commerce path" },
  { id: "email", label: "Email Drop", audience: "Owned audience" },
];

const platformLimit = 8;
const previewAsset = `${import.meta.env.BASE_URL}assets/wireframe/bring_in_the_katz_line_dance_preview.png`;

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getPreviewTreatment(step: number, selectedEffect: string) {
  const effectBoost = selectedEffect === "cinematic" ? "contrast(1.12) saturate(1.08)" : selectedEffect === "studio" ? "contrast(1.04) saturate(1.02)" : "contrast(1.16) saturate(1.18)";
  if (step <= 1) return { label: "Raw upload", filter: "contrast(0.92) saturate(0.82)", opacity: "opacity-70", badge: "Unedited draft" };
  if (step === 2) return { label: "WYSIWYG edit", filter: effectBoost, opacity: "opacity-80", badge: "Trim + effect active" };
  if (step === 3) return { label: "Commerce-ready", filter: `${effectBoost} brightness(1.04)`, opacity: "opacity-85", badge: "Syndication metadata attached" };
  if (step === 4) return { label: "Rights checked", filter: `${effectBoost} brightness(1.06)`, opacity: "opacity-90", badge: "Review-safe package" };
  if (step === 5) return { label: "Packaging", filter: `${effectBoost} brightness(1.08)`, opacity: "opacity-95", badge: "Rendering platform variants" };
  return { label: "Pavilion-ready", filter: `${effectBoost} brightness(1.1)`, opacity: "opacity-100", badge: "Ready for Pavilion handoff" };
}

export default function Os() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState(1);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [start, setStart] = useState(3);
  const [end, setEnd] = useState(27);
  const [selectedEffect, setSelectedEffect] = useState("launch");
  const [overlayText, setOverlayText] = useState("Bring in the Katz challenge is live");
  const [caption, setCaption] = useState("A new line dance becomes a creator-owned commerce moment through SPRK Pavilion.");
  const [hashtagInput, setHashtagInput] = useState("");
  const [hashtags, setHashtags] = useState(["BringInTheKatz", "CreatorCommerce", "LineDance"]);
  const [selectedPlatforms, setSelectedPlatforms] = useState(["sprk", "tiktok", "instagram", "youtube"]);
  const [showAllPlatforms, setShowAllPlatforms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsAlert, setTermsAlert] = useState("");
  const [loadingProgress, setLoadingProgress] = useState<Record<string, number>>({});
  const [loadingMessage, setLoadingMessage] = useState("Preparing syndication package");
  const [showIntro, setShowIntro] = useState(() => window.localStorage.getItem("sprk-os-intro-seen") !== "true");

  const selectedPlatformObjects = useMemo(
    () => platforms.filter((platform) => selectedPlatforms.includes(platform.id)),
    [selectedPlatforms],
  );

  const displayedPlatforms = showAllPlatforms ? platforms : platforms.slice(0, 6);
  const hasLargeFileWarning = fileSize > 500;
  const isUploaded = Boolean(fileName);
  const canContinue =
    (step === 1 && isUploaded) ||
    (step === 2 && isUploaded && overlayText.trim().length > 0 && caption.trim().length > 0) ||
    (step === 3 && selectedPlatforms.length >= 2) ||
    (step === 4 && termsAccepted) ||
    step === 6;
  const previewTreatment = getPreviewTreatment(step, selectedEffect);

  useEffect(() => {
    if (step !== 5) return;

    const sequence = [
      "Analyzing cut points and overlay clarity",
      "Rendering creator-safe export variants",
      "Packaging syndicated commerce metadata",
      "Registering SPRK-native Pavilion handoff",
    ];
    let tick = 0;
    setLoadingProgress(Object.fromEntries(selectedPlatforms.map((id) => [id, 4])));
    setLoadingMessage(sequence[0]);

    const timer = window.setInterval(() => {
      tick += 1;
      setLoadingMessage(sequence[Math.min(sequence.length - 1, Math.floor(tick / 3))]);
      setLoadingProgress((current) => {
        const next = { ...current };
        selectedPlatforms.forEach((id, index) => {
          const lift = 7 + index * 2 + (tick % 3);
          next[id] = Math.min(100, (next[id] ?? 0) + lift);
        });
        return next;
      });

      if (tick >= 14) {
        window.clearInterval(timer);
        setLoadingProgress(Object.fromEntries(selectedPlatforms.map((id) => [id, 100])));
        window.setTimeout(() => setStep(6), 700);
      }
    }, 900);

    return () => window.clearInterval(timer);
  }, [step, selectedPlatforms]);

  const dismissIntro = () => {
    window.localStorage.setItem("sprk-os-intro-seen", "true");
    setShowIntro(false);
  };

  const simulateUpload = (size = 286) => {
    setFileName("bring_in_the_katz_master_cut.mp4");
    setFileSize(size);
    toast.success("Draft uploaded. The live preview is now available for WYSIWYG editing.");
  };

  const addHashtag = () => {
    const cleaned = hashtagInput.replace(/#/g, "").trim();
    if (!cleaned) return;
    if (hashtags.includes(cleaned)) {
      setHashtagInput("");
      return;
    }
    setHashtags((current) => [...current, cleaned]);
    setHashtagInput("");
  };

  const togglePlatform = (id: string) => {
    if (id === "sprk") return;
    setSelectedPlatforms((current) => {
      if (current.includes(id)) return current.filter((platform) => platform !== id);
      if (current.length >= platformLimit) {
        toast.warning(`Keep this prototype package focused: select up to ${platformLimit} platforms.`);
        return current;
      }
      return [...current, id];
    });
  };

  const moveNext = () => {
    if (step === 1 && !fileName) {
      toast.error("Upload a creator draft before continuing.");
      return;
    }
    if (step === 2 && (!overlayText.trim() || !caption.trim())) {
      toast.error("Add overlay text and caption copy before continuing.");
      return;
    }
    if (step === 3 && selectedPlatforms.length < 2) {
      toast.error("Keep SPRK selected and add at least one external platform.");
      return;
    }
    if (step === 4 && !termsAccepted) {
      setTermsAlert("Review your selections when you’re ready.");
      return;
    }
    setTermsAlert("");
    setStep((current) => Math.min(6, current + 1));
  };

  const moveBack = () => {
    setTermsAlert("");
    setStep((current) => Math.max(1, current - 1));
  };

  const viewInPavilion = () => {
    navigate("/pavilion?handoff=sprk-os");
  };

  const NavigationControls = ({ placement }: { placement: "top" | "bottom" }) => (
    <div className={classNames(
      "flex flex-col gap-[var(--space-md)] rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--white)] p-[var(--space-md)] shadow-sm sm:flex-row sm:items-center sm:justify-between",
      placement === "top" && "lg:sticky lg:top-[88px] lg:z-20",
    )}>
      <button type="button" onClick={moveBack} disabled={step === 1 || step === 5} className="inline-flex min-h-11 items-center justify-center gap-[var(--space-sm)] rounded-[var(--r)] border border-[var(--border)] bg-[var(--white)] px-[var(--space-lg)] text-sm font-bold text-[var(--ink)] disabled:cursor-not-allowed disabled:opacity-40 hover:not(:disabled):bg-[var(--warm)]"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back</button>
      <div className="text-center text-xs font-semibold uppercase tracking-[0.12em] text-[var(--mauve)]">Review-safe prototype. No production publishing.</div>
      {step < 5 ? (
        <button type="button" onClick={moveNext} disabled={!canContinue} className="inline-flex min-h-11 items-center justify-center gap-[var(--space-sm)] rounded-[var(--r-pill)] bg-[var(--ink)] px-[var(--space-xl)] text-sm font-bold text-[var(--white)] transition-all disabled:cursor-not-allowed disabled:opacity-40 hover:not(:disabled):-translate-y-0.5 hover:not(:disabled):bg-[var(--navy)]">Continue <ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
      ) : step === 5 ? (
        <span className="inline-flex min-h-11 items-center justify-center rounded-[var(--r-pill)] border border-[var(--success)] bg-[var(--warm)] px-[var(--space-xl)] text-sm font-bold text-[var(--success)]">Packaging in progress</span>
      ) : (
        <button type="button" onClick={viewInPavilion} className="inline-flex min-h-11 items-center justify-center gap-[var(--space-sm)] rounded-[var(--r-pill)] px-[var(--space-xl)] text-sm font-bold text-[var(--white)] transition-all hover:-translate-y-0.5" style={{ background: "var(--grad)" }}>Open Pavilion Handoff <ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
      )}
    </div>
  );

  return (
    <SharedLayout activeSite="os">
      <section className="min-h-screen bg-[var(--cream)] px-[var(--space-lg)] py-[var(--space-xl)] md:px-[var(--space-2xl)] lg:px-[var(--space-3xl)]">
        {showIntro && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[var(--ink)]/70 px-[var(--space-lg)] backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="sprk-os-intro-title">
            <div className="w-full max-w-2xl rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--white)] p-[var(--space-2xl)] shadow-xl">
              <p className="mb-[var(--space-sm)] text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--ember)]">SPRK-OS Editor Flow</p>
              <h1 id="sprk-os-intro-title" className="text-[clamp(32px,5vw,58px)] font-black leading-[0.95] tracking-[-0.03em] text-[var(--ink)]">Turn one creator cut into a syndicated commerce moment.</h1>
              <p className="mt-[var(--space-lg)] text-[15px] leading-[1.65] text-[var(--steel)]">This message appears before editing begins. Upload the “Bring in the Katz” draft, refine it in a Canva-style workspace, then prepare a review-safe Pavilion handoff. Nothing publishes to production from this prototype.</p>
              <button type="button" onClick={dismissIntro} className="mt-[var(--space-xl)] inline-flex min-h-12 items-center justify-center rounded-[var(--r-pill)] px-[var(--space-xl)] text-sm font-black uppercase tracking-[0.12em] text-[var(--white)] transition-all hover:-translate-y-0.5" style={{ background: "var(--grad)" }}>Begin editing</button>
            </div>
          </div>
        )}

        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-[var(--space-lg)]">
          <header className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--white)] p-[var(--space-lg)] shadow-sm">
            <div className="flex flex-col gap-[var(--space-md)] lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--mauve)]">SPRK-OS WYSIWYG workspace</p>
                <h1 className="mt-[var(--space-xs)] text-[clamp(28px,3.4vw,48px)] font-black leading-none tracking-[-0.03em] text-[var(--ink)]">Open editor for creator syndication.</h1>
              </div>
              <div className="rounded-[var(--r)] px-[var(--space-lg)] py-[var(--space-md)] text-sm font-black uppercase tracking-[0.12em] text-[var(--white)] shadow-sm" style={{ background: "var(--grad)" }}>
                Syndicated commerce
              </div>
            </div>
          </header>

          <nav aria-label="SPRK-OS progress" className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--white)] p-[var(--space-lg)] shadow-sm">
            <ol className="grid grid-cols-2 gap-[var(--space-sm)] md:grid-cols-6">
              {steps.map((item) => {
                const active = item.id === step;
                const complete = item.id < step;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => item.id < step && setStep(item.id)}
                      className={classNames(
                        "flex min-h-11 w-full items-center gap-[var(--space-sm)] rounded-[var(--r)] border px-[var(--space-md)] py-[var(--space-sm)] text-left text-[12px] font-bold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ember)]",
                        active && "border-[var(--ink)] bg-[var(--ink)] text-[var(--white)]",
                        complete && "border-[var(--success)] bg-[var(--warm)] text-[var(--ink)]",
                        !active && !complete && "border-[var(--border)] bg-[var(--cream)] text-[var(--steel)]",
                      )}
                      aria-current={active ? "step" : undefined}
                    >
                      <span className={classNames("flex h-6 w-6 items-center justify-center rounded-full text-[11px]", active ? "bg-[var(--white)] text-[var(--ink)]" : complete ? "bg-[var(--success)] text-[var(--white)]" : "bg-[var(--white)] text-[var(--steel)]")}>
                        {complete ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : item.id}
                      </span>
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="grid grid-cols-1 gap-[var(--space-xl)] xl:grid-cols-[minmax(0,1fr)_440px]">
            <main className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--white)] p-[var(--space-xl)] shadow-sm">
              {step === 1 && (
                <div className="flex flex-col gap-[var(--space-xl)]">
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--mauve)]">Step 1</p>
                    <h2 className="mt-[var(--space-xs)] text-[clamp(28px,3.2vw,44px)] font-bold leading-none tracking-[-0.02em] text-[var(--ink)]">Upload the master draft.</h2>
                    <p className="mt-[var(--space-md)] text-[15px] leading-[1.6] text-[var(--steel)]">The preview stays empty until upload, then opens a live editable canvas for the generated “Bring in the Katz” short-form video.</p>
                  </div>

                  <div className="grid gap-[var(--space-lg)] md:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => simulateUpload()}
                      className="flex min-h-[220px] flex-col items-center justify-center gap-[var(--space-md)] rounded-[var(--r-lg)] border-2 border-dashed border-[var(--ember)] bg-[var(--cream)] p-[var(--space-xl)] text-center transition-all hover:-translate-y-0.5 hover:bg-[var(--warm)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ember)]"
                    >
                      <Upload className="h-9 w-9 text-[var(--ember)]" aria-hidden="true" />
                      <span className="text-lg font-bold text-[var(--ink)]">Choose creator draft</span>
                      <span className="text-sm leading-[1.5] text-[var(--steel)]">Creates the live package preview and unlocks the next step.</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => simulateUpload(642)}
                      className="flex min-h-[220px] flex-col items-center justify-center gap-[var(--space-md)] rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--white)] p-[var(--space-xl)] text-center transition-all hover:-translate-y-0.5 hover:bg-[var(--cream)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ember)]"
                    >
                      <AlertCircle className="h-9 w-9 text-[var(--warning)]" aria-hidden="true" />
                      <span className="text-lg font-bold text-[var(--ink)]">Test large-file warning</span>
                      <span className="text-sm leading-[1.5] text-[var(--steel)]">Shows the optimization warning without blocking the happy path.</span>
                    </button>
                  </div>

                  {isUploaded && (
                    <div className="rounded-[var(--r)] border border-[var(--success)] bg-[var(--warm)] p-[var(--space-lg)]">
                      <div className="flex flex-col gap-[var(--space-md)] sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-[var(--space-md)]">
                          <FileVideo className="h-8 w-8 text-[var(--ember)]" aria-hidden="true" />
                          <div>
                            <p className="font-bold text-[var(--ink)]">{fileName}</p>
                            <p className="text-sm text-[var(--steel)]">{fileSize}MB • 00:31 • Vertical 9:16</p>
                          </div>
                        </div>
                        <CheckCircle2 className="h-7 w-7 text-[var(--success)]" aria-label="Uploaded" />
                      </div>
                      {hasLargeFileWarning && (
                        <p className="mt-[var(--space-md)] rounded-[var(--r-sm)] border border-[var(--warning)] bg-[var(--white)] p-[var(--space-md)] text-sm font-semibold text-[var(--ink)]">
                          This draft is over 500MB. SPRK-OS will optimize it during packaging.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {step === 2 && (
                <div className="flex flex-col gap-[var(--space-xl)]">
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--mauve)]">Step 2</p>
                    <h2 className="mt-[var(--space-xs)] text-[clamp(28px,3.2vw,44px)] font-bold leading-none tracking-[-0.02em] text-[var(--ink)]">Refine the drop cut.</h2>
                    <p className="mt-[var(--space-md)] text-[15px] leading-[1.6] text-[var(--steel)]">Trim timing, choose a treatment, and edit text while the live package preview updates beside you.</p>
                  </div>

                  <div className="grid gap-[var(--space-lg)] md:grid-cols-2">
                    <div className="rounded-[var(--r)] border border-[var(--border)] bg-[var(--cream)] p-[var(--space-lg)]">
                      <div className="mb-[var(--space-md)] flex items-center gap-[var(--space-sm)] font-bold text-[var(--ink)]"><Scissors className="h-4 w-4 text-[var(--ember)]" aria-hidden="true" /> Trim window</div>
                      <label className="block text-sm font-semibold text-[var(--steel)]" htmlFor="trim-start">Start: {start}s</label>
                      <input id="trim-start" type="range" min="0" max="20" step="1" value={start} onChange={(event) => setStart(Math.min(Number(event.target.value), end - 2))} className="w-full accent-[var(--ember)]" />
                      <label className="mt-[var(--space-md)] block text-sm font-semibold text-[var(--steel)]" htmlFor="trim-end">End: {end}s</label>
                      <input id="trim-end" type="range" min="8" max="31" step="1" value={end} onChange={(event) => setEnd(Math.max(Number(event.target.value), start + 2))} className="w-full accent-[var(--ember)]" />
                    </div>

                    <div className="rounded-[var(--r)] border border-[var(--border)] bg-[var(--cream)] p-[var(--space-lg)]">
                      <div className="mb-[var(--space-md)] flex items-center gap-[var(--space-sm)] font-bold text-[var(--ink)]"><Wand2 className="h-4 w-4 text-[var(--ember)]" aria-hidden="true" /> Effect</div>
                      <div className="flex flex-col gap-[var(--space-sm)]">
                        {effects.map((effect) => (
                          <button key={effect.id} type="button" onClick={() => setSelectedEffect(effect.id)} className={classNames("rounded-[var(--r)] border p-[var(--space-md)] text-left transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ember)]", selectedEffect === effect.id ? "border-[var(--ink)] bg-[var(--white)]" : "border-[var(--border)] bg-[var(--cream)] hover:bg-[var(--warm)]")}>
                            <span className="block text-sm font-bold text-[var(--ink)]">{effect.label}</span>
                            <span className="text-xs leading-[1.5] text-[var(--steel)]">{effect.note}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-[var(--space-lg)] md:grid-cols-2">
                    <label className="flex flex-col gap-[var(--space-sm)] text-sm font-bold text-[var(--ink)]">
                      Overlay text
                      <input value={overlayText} onChange={(event) => setOverlayText(event.target.value)} className="min-h-11 rounded-[var(--r)] border border-[var(--border)] bg-[var(--cream)] px-[var(--space-md)] text-sm font-medium text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--ember)]" />
                    </label>
                    <label className="flex flex-col gap-[var(--space-sm)] text-sm font-bold text-[var(--ink)]">
                      Caption
                      <textarea value={caption} onChange={(event) => setCaption(event.target.value)} rows={3} className="rounded-[var(--r)] border border-[var(--border)] bg-[var(--cream)] px-[var(--space-md)] py-[var(--space-md)] text-sm font-medium text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--ember)]" />
                    </label>
                  </div>

                  <div className="rounded-[var(--r)] border border-[var(--border)] bg-[var(--cream)] p-[var(--space-lg)]">
                    <div className="mb-[var(--space-md)] flex items-center gap-[var(--space-sm)] font-bold text-[var(--ink)]"><Type className="h-4 w-4 text-[var(--ember)]" aria-hidden="true" /> Hashtags</div>
                    <div className="mb-[var(--space-md)] flex flex-wrap gap-[var(--space-sm)]">
                      {hashtags.map((tag) => (
                        <span key={tag} className="inline-flex items-center gap-[var(--space-sm)] rounded-[var(--r-pill)] border border-[var(--border)] bg-[var(--white)] px-[var(--space-md)] py-[var(--space-sm)] text-xs font-bold text-[var(--steel)]">
                          #{tag}
                          <button type="button" onClick={() => setHashtags((current) => current.filter((item) => item !== tag))} aria-label={`Remove hashtag ${tag}`} className="text-[var(--mauve)] hover:text-[var(--ink)]"><X className="h-3.5 w-3.5" aria-hidden="true" /></button>
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-col gap-[var(--space-sm)] sm:flex-row">
                      <input value={hashtagInput} onChange={(event) => setHashtagInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); addHashtag(); } }} placeholder="Add hashtag" className="min-h-11 flex-1 rounded-[var(--r)] border border-[var(--border)] bg-[var(--white)] px-[var(--space-md)] text-sm text-[var(--ink)] placeholder:text-[var(--blush)] focus:outline-none focus:ring-2 focus:ring-[var(--ember)]" />
                      <button type="button" onClick={addHashtag} className="inline-flex min-h-11 items-center justify-center gap-[var(--space-sm)] rounded-[var(--r-pill)] bg-[var(--ink)] px-[var(--space-lg)] text-sm font-bold text-[var(--white)] transition-all hover:-translate-y-0.5 hover:bg-[var(--navy)]"><Plus className="h-4 w-4" aria-hidden="true" /> Add</button>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="flex flex-col gap-[var(--space-xl)]">
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--mauve)]">Step 3</p>
                    <h2 className="mt-[var(--space-xs)] text-[clamp(28px,3.2vw,44px)] font-bold leading-none tracking-[-0.02em] text-[var(--ink)]">Choose distribution surfaces.</h2>
                    <p className="mt-[var(--space-md)] text-[15px] leading-[1.6] text-[var(--steel)]">SPRK stays locked as the native commerce layer. Add external platforms for a focused syndication package.</p>
                  </div>
                  <div className="grid grid-cols-1 gap-[var(--space-md)] sm:grid-cols-2 xl:grid-cols-3">
                    {displayedPlatforms.map((platform) => {
                      const selected = selectedPlatforms.includes(platform.id);
                      return (
                        <button key={platform.id} type="button" onClick={() => togglePlatform(platform.id)} className={classNames("min-h-[118px] rounded-[var(--r)] border p-[var(--space-lg)] text-left transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ember)]", selected ? "border-[var(--success)] bg-[var(--warm)]" : "border-[var(--border)] bg-[var(--cream)] hover:-translate-y-0.5 hover:bg-[var(--white)]")}>
                          <div className="flex items-start justify-between gap-[var(--space-sm)]">
                            <div>
                              <span className="block text-base font-bold text-[var(--ink)]">{platform.label}</span>
                              <span className="mt-[var(--space-xs)] block text-xs leading-[1.5] text-[var(--steel)]">{platform.audience}</span>
                            </div>
                            {platform.locked ? <Lock className="h-4 w-4 text-[var(--ember)]" aria-label="Locked selected" /> : selected ? <CheckCircle2 className="h-5 w-5 text-[var(--success)]" aria-hidden="true" /> : null}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <button type="button" onClick={() => setShowAllPlatforms((current) => !current)} className="inline-flex min-h-11 items-center justify-center gap-[var(--space-sm)] self-start rounded-[var(--r)] border border-[var(--border)] bg-[var(--white)] px-[var(--space-lg)] text-sm font-bold text-[var(--ink)] hover:bg-[var(--warm)]">
                    {showAllPlatforms ? "Show fewer platforms" : "Show more platforms"}
                    <ChevronDown className={classNames("h-4 w-4 transition-transform", showAllPlatforms && "rotate-180")} aria-hidden="true" />
                  </button>
                </div>
              )}

              {step === 4 && (
                <div className="flex flex-col gap-[var(--space-xl)]">
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--mauve)]">Step 4</p>
                    <h2 className="mt-[var(--space-xs)] text-[clamp(28px,3.2vw,44px)] font-bold leading-none tracking-[-0.02em] text-[var(--ink)]">Confirm rights and terms.</h2>
                    <p className="mt-[var(--space-md)] text-[15px] leading-[1.6] text-[var(--steel)]">This prototype models clear review language before any syndication package is prepared.</p>
                  </div>
                  {termsAlert && (
                    <div className="flex items-start justify-between gap-[var(--space-md)] rounded-[var(--r)] border border-[var(--warning)] bg-[var(--warm)] p-[var(--space-md)] text-sm font-semibold text-[var(--ink)]">
                      <span>{termsAlert}</span>
                      <button type="button" onClick={() => setTermsAlert("")} aria-label="Dismiss alert"><X className="h-4 w-4" aria-hidden="true" /></button>
                    </div>
                  )}
                  <div className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--cream)] p-[var(--space-xl)]">
                    <h3 className="text-xl font-bold text-[var(--ink)]">Syndication summary</h3>
                    <dl className="mt-[var(--space-lg)] grid gap-[var(--space-md)] sm:grid-cols-2">
                      <div><dt className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--mauve)]">Asset</dt><dd className="mt-[var(--space-xs)] font-semibold text-[var(--ink)]">{fileName}</dd></div>
                      <div><dt className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--mauve)]">Clip window</dt><dd className="mt-[var(--space-xs)] font-semibold text-[var(--ink)]">{start}s–{end}s</dd></div>
                      <div><dt className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--mauve)]">Platforms</dt><dd className="mt-[var(--space-xs)] font-semibold text-[var(--ink)]">{selectedPlatformObjects.map((platform) => platform.label).join(", ")}</dd></div>
                      <div><dt className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--mauve)]">Creator rights</dt><dd className="mt-[var(--space-xs)] font-semibold text-[var(--ink)]">Creator-owned, review-ready package</dd></div>
                    </dl>
                  </div>
                  <label className="flex items-start gap-[var(--space-md)] rounded-[var(--r)] border border-[var(--border)] bg-[var(--white)] p-[var(--space-lg)] text-sm leading-[1.6] text-[var(--steel)]">
                    <input type="checkbox" checked={termsAccepted} onChange={(event) => setTermsAccepted(event.target.checked)} className="mt-1 h-5 w-5 accent-[var(--success)]" />
                    <span><strong className="text-[var(--ink)]">I confirm this demo package can be prepared for review.</strong> This does not publish to production or trigger external posting.</span>
                  </label>
                </div>
              )}

              {step === 5 && (
                <div className="flex min-h-[520px] flex-col items-center justify-center gap-[var(--space-xl)] text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[var(--success)] bg-[var(--warm)] text-[var(--success)]">
                    <Loader2 className="h-10 w-10 animate-spin" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--mauve)]">Step 5</p>
                    <h2 className="mt-[var(--space-xs)] text-[clamp(28px,3.2vw,44px)] font-bold leading-none tracking-[-0.02em] text-[var(--ink)]">{loadingMessage}</h2>
                    <p className="mt-[var(--space-md)] text-[15px] leading-[1.6] text-[var(--steel)]">SPRK-OS is simulating export, metadata, and Pavilion registration in one review-safe flow.</p>
                  </div>
                  <div className="grid w-full max-w-2xl gap-[var(--space-md)]">
                    {selectedPlatformObjects.map((platform) => (
                      <div key={platform.id} className="rounded-[var(--r)] border border-[var(--success)] bg-[var(--warm)] p-[var(--space-md)] text-left">
                        <div className="mb-[var(--space-sm)] flex items-center justify-between text-sm font-bold text-[var(--ink)]"><span>{platform.label}</span><span className="text-[var(--success)]">{Math.round(loadingProgress[platform.id] ?? 0)}%</span></div>
                        <div className="h-2 overflow-hidden rounded-[var(--r-pill)] bg-[var(--white)]"><div className="h-full rounded-[var(--r-pill)] bg-[var(--success)] transition-all duration-700" style={{ width: `${loadingProgress[platform.id] ?? 0}%` }} /></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 6 && (
                <div className="flex flex-col gap-[var(--space-xl)]">
                  <div className="rounded-[var(--r-lg)] border border-[var(--success)] bg-[var(--warm)] p-[var(--space-xl)] text-center">
                    <CheckCircle2 className="mx-auto h-14 w-14 text-[var(--success)]" aria-hidden="true" />
                    <p className="mt-[var(--space-md)] text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--mauve)]">Step 6</p>
                    <h2 className="mt-[var(--space-xs)] text-[clamp(28px,3.2vw,44px)] font-bold leading-none tracking-[-0.02em] text-[var(--ink)]">Syndication package ready.</h2>
                    <p className="mx-auto mt-[var(--space-md)] max-w-2xl text-[15px] leading-[1.6] text-[var(--steel)]">Your “Bring in the Katz” clip is registered for the Pavilion review path and ready to appear as the newest creator asset.</p>
                  </div>
                  <div className="grid gap-[var(--space-lg)] md:grid-cols-3">
                    <div className="rounded-[var(--r)] border border-[var(--success)] bg-[var(--warm)] p-[var(--space-lg)]"><Clock3 className="mb-[var(--space-sm)] h-5 w-5 text-[var(--success)]" aria-hidden="true" /><h3 className="font-bold text-[var(--ink)]">{end - start}s package</h3><p className="mt-[var(--space-xs)] text-sm text-[var(--steel)]">Trimmed for the first review pass.</p></div>
                    <div className="rounded-[var(--r)] border border-[var(--success)] bg-[var(--warm)] p-[var(--space-lg)]"><Sparkles className="mb-[var(--space-sm)] h-5 w-5 text-[var(--success)]" aria-hidden="true" /><h3 className="font-bold text-[var(--ink)]">{selectedPlatformObjects.length} surfaces</h3><p className="mt-[var(--space-xs)] text-sm text-[var(--steel)]">SPRK plus selected external platforms.</p></div>
                    <div className="rounded-[var(--r)] border border-[var(--success)] bg-[var(--warm)] p-[var(--space-lg)]"><ShieldCheck className="mb-[var(--space-sm)] h-5 w-5 text-[var(--success)]" aria-hidden="true" /><h3 className="font-bold text-[var(--ink)]">Review-safe</h3><p className="mt-[var(--space-xs)] text-sm text-[var(--steel)]">No production deployment occurred.</p></div>
                  </div>
                  <div className="flex flex-col gap-[var(--space-md)] sm:flex-row">
                    <button type="button" onClick={() => setStep(2)} className="inline-flex min-h-11 flex-1 items-center justify-center gap-[var(--space-sm)] rounded-[var(--r)] border border-[var(--border)] bg-[var(--white)] px-[var(--space-lg)] text-sm font-bold text-[var(--ink)] hover:bg-[var(--warm)]"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Refine Again</button>
                    <button type="button" onClick={viewInPavilion} className="inline-flex min-h-11 flex-1 items-center justify-center gap-[var(--space-sm)] rounded-[var(--r-pill)] px-[var(--space-lg)] text-sm font-bold text-[var(--white)] transition-all hover:-translate-y-0.5" style={{ background: "var(--grad)" }}>View in SPRK Pavilion <ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
                  </div>
                </div>
              )}
            </main>

            <aside className="flex flex-col gap-[var(--space-lg)]">
              <NavigationControls placement="top" />

              <div className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--white)] p-[var(--space-xl)] shadow-sm">
                <div className="flex items-start justify-between gap-[var(--space-md)]">
                  <div>
                    <h2 className="text-xl font-bold text-[var(--ink)]">Live package preview</h2>
                    <p className="mt-[var(--space-xs)] text-sm text-[var(--steel)]">Preview appears after upload and improves through each step.</p>
                  </div>
                  {isUploaded && <span className="rounded-[var(--r-pill)] border border-[var(--success)] bg-[var(--warm)] px-[var(--space-md)] py-[var(--space-sm)] text-xs font-bold text-[var(--success)]">{previewTreatment.label}</span>}
                </div>
                {isUploaded ? (
                  <div className="mt-[var(--space-lg)] rounded-[var(--r)] border border-[var(--border)] bg-[var(--ink)] p-[var(--space-md)] text-[var(--white)]">
                    <div className="relative aspect-[9/16] overflow-hidden rounded-[var(--r-sm)] bg-[var(--navy)]">
                      <img src={previewAsset} alt="Generated Bring in the Katz line dance preview" className={classNames("h-full w-full object-cover transition-all duration-700", previewTreatment.opacity)} style={{ filter: previewTreatment.filter }} />
                      <div className="absolute inset-x-0 top-0 flex justify-between gap-[var(--space-sm)] p-[var(--space-md)]">
                        <span className="rounded-[var(--r-pill)] bg-[var(--ink)]/80 px-[var(--space-md)] py-[var(--space-sm)] text-[10px] font-black uppercase tracking-[0.14em] text-[var(--white)]">{previewTreatment.badge}</span>
                        <span className="rounded-[var(--r-pill)] bg-[var(--success)] px-[var(--space-md)] py-[var(--space-sm)] text-[10px] font-black uppercase tracking-[0.14em] text-[var(--white)]">Healthy</span>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-[var(--space-md)]">
                        <div className="rounded-[var(--r)] bg-[var(--ink)]/80 p-[var(--space-md)] shadow-lg backdrop-blur">
                          <p className="text-[clamp(20px,3vw,34px)] font-black uppercase leading-none tracking-[-0.03em]">{overlayText}</p>
                          <p className="mt-[var(--space-sm)] text-xs uppercase tracking-[0.16em] text-[var(--warm)]">{effects.find((effect) => effect.id === selectedEffect)?.label} • {start}s–{end}s</p>
                        </div>
                      </div>
                      <button type="button" className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--white)] text-[var(--ink)] shadow-lg" aria-label="Play preview">
                        <Play className="ml-1 h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-[var(--space-lg)] flex aspect-[9/16] items-center justify-center rounded-[var(--r)] border-2 border-dashed border-[var(--border)] bg-[var(--cream)] p-[var(--space-xl)] text-center">
                    <div>
                      <Upload className="mx-auto h-10 w-10 text-[var(--mauve)]" aria-hidden="true" />
                      <p className="mt-[var(--space-md)] text-sm font-bold text-[var(--ink)]">Upload required</p>
                      <p className="mt-[var(--space-xs)] text-sm leading-[1.5] text-[var(--steel)]">The live preview remains hidden until the user chooses a creator draft.</p>
                    </div>
                  </div>
                )}
                <dl className="mt-[var(--space-lg)] grid gap-[var(--space-md)] text-sm">
                  <div className="flex justify-between gap-[var(--space-md)]"><dt className="text-[var(--steel)]">File</dt><dd className="text-right font-bold text-[var(--ink)]">{fileName || "Awaiting upload"}</dd></div>
                  <div className="flex justify-between gap-[var(--space-md)]"><dt className="text-[var(--steel)]">Trim</dt><dd className="font-bold text-[var(--ink)]">{start}s–{end}s</dd></div>
                  <div className="flex justify-between gap-[var(--space-md)]"><dt className="text-[var(--steel)]">Effect</dt><dd className="text-right font-bold text-[var(--ink)]">{effects.find((effect) => effect.id === selectedEffect)?.label}</dd></div>
                  <div className="flex justify-between gap-[var(--space-md)]"><dt className="text-[var(--steel)]">Platforms</dt><dd className="font-bold text-[var(--ink)]">{selectedPlatformObjects.length}</dd></div>
                </dl>
              </div>

              <div className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--warm)] p-[var(--space-xl)]">
                <h2 className="text-xl font-bold text-[var(--ink)]">Path guarantee</h2>
                <p className="mt-[var(--space-sm)] text-sm leading-[1.6] text-[var(--steel)]">The success CTA routes into Pavilion with a handoff flag so the new clip appears at the top of the marketplace content library.</p>
              </div>
            </aside>
          </div>

          <NavigationControls placement="bottom" />
        </div>
      </section>
    </SharedLayout>
  );
}
