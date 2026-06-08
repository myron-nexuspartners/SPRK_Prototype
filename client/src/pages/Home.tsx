import React, { useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, Check, CheckCircle2, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import SharedLayout from "@/components/SharedLayout";

type FormStep = 1 | 2 | 3 | 4;

type AccessForm = {
  name: string;
  email: string;
  creatorTier: string;
  bio: string;
  contentTypes: string[];
  cultureFocus: string[];
  platforms: string[];
  primaryPlatform: string;
  uploadFrequency: string;
  interestLevel: string;
  updatesOptIn: boolean;
  termsAccepted: boolean;
};

const base = import.meta.env.BASE_URL === "/" ? "/" : import.meta.env.BASE_URL;
const accessEndpoint = (import.meta.env.VITE_ACCESS_FORM_ENDPOINT as string | undefined)?.trim();

const initialForm: AccessForm = {
  name: "",
  email: "",
  creatorTier: "",
  bio: "",
  contentTypes: [],
  cultureFocus: [],
  platforms: [],
  primaryPlatform: "",
  uploadFrequency: "",
  interestLevel: "",
  updatesOptIn: true,
  termsAccepted: false,
};

const creatorTiers = ["Emerging Creator", "Growing Creator", "Established Creator", "Elite Creator"];
const contentTypes = ["Short-form video", "Long-form video", "Articles & written content", "Photography & visual art", "Podcasts & audio", "Live streams", "Community posts"];
const cultureOptions = ["Gaming & Esports", "Fashion & Streetwear", "Music Scene", "Tech & Innovation", "Entertainment & Pop Culture", "Sports & Fitness", "Beauty & Wellness", "Arts & Design"];
const platformOptions = ["SPRK", "TikTok", "Instagram", "YouTube", "Snapchat", "Pinterest", "Threads", "Twitch", "X/Twitter", "LinkedIn", "Discord", "Reddit"];
const uploadOptions = ["Daily or more", "Several times a week", "Weekly", "A few times a month", "Monthly", "Less frequently"];
const interestOptions = ["Very interested in SPRK tools", "Somewhat interested, want to learn more", "Just exploring", "Not sure yet"];

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function toggleLimitedValue(values: string[], value: string, limit?: number) {
  if (values.includes(value)) return values.filter((item) => item !== value);
  const next = [...values, value];
  return limit && next.length > limit ? next.slice(next.length - limit) : next;
}

function PillChoice({ selected, label, onClick }: { selected: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${selected ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--white)]" : "border-[var(--border)] bg-[var(--white)] text-[var(--ink)] hover:border-[var(--ember)] hover:bg-[var(--cream)]"}`}
    >
      <span className="flex items-center gap-2">
        {selected && <Check className="h-4 w-4" />}
        {label}
      </span>
    </button>
  );
}

export default function Home() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<FormStep>(1);
  const [form, setForm] = useState<AccessForm>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const progress = useMemo(() => `${Math.round((step / 4) * 100)}%`, [step]);
  const selectedPlatforms = form.platforms.length ? form.platforms : ["SPRK"];

  const update = <K extends keyof AccessForm>(key: K, value: AccessForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  };

  const validateStep = () => {
    const nextErrors: Record<string, string> = {};
    if (step === 1) {
      if (form.name.trim().length < 2) nextErrors.name = "Please enter your name.";
      if (!isValidEmail(form.email)) nextErrors.email = "Please enter a valid email address.";
      if (!form.creatorTier) nextErrors.creatorTier = "Please select a creator tier.";
    }
    if (step === 2 && form.contentTypes.length === 0) nextErrors.contentTypes = "Select at least one content type.";
    if (step === 3) {
      if (form.platforms.length === 0) nextErrors.platforms = "Select at least one platform.";
      if (!form.primaryPlatform) nextErrors.primaryPlatform = "Choose a primary platform.";
      if (!form.uploadFrequency) nextErrors.uploadFrequency = "Select an upload frequency.";
    }
    if (step === 4) {
      if (!form.interestLevel) nextErrors.interestLevel = "Select an interest level.";
      if (!form.termsAccepted) nextErrors.termsAccepted = "Please agree before entering the prototype.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goNext = () => {
    if (!validateStep()) return;
    setStep((current) => Math.min(4, current + 1) as FormStep);
  };

  const submitAccess = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateStep()) return;

    const payload = {
      ...form,
      submittedAt: new Date().toISOString(),
      entryPath: window.location.href,
      referrer: document.referrer || "direct",
      userAgent: navigator.userAgent,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      source: "SPRK Prototype Entry Form",
    };

    setSubmitting(true);
    try {
      localStorage.setItem("sprk-prototype-access", JSON.stringify(payload));
      localStorage.setItem("sprk-prototype-access-email", form.email);

      const apiResponse = await fetch(`${base.replace(/\/$/, "")}/api/access-log`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => null);

      if (accessEndpoint) {
        await fetch(accessEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      setSubmitted(true);
      toast.success(apiResponse?.ok || accessEndpoint ? "Access request captured. Entering prototype…" : "Access form complete. Entering static prototype…");
      window.setTimeout(() => setLocation("/home"), 900);
    } catch (error) {
      console.error(error);
      toast.error("The form could not send to the configured endpoint, but your entry state was saved locally.");
      setSubmitted(true);
      window.setTimeout(() => setLocation("/home"), 1200);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SharedLayout activeSite="lead-gen">
      <section className="relative overflow-hidden bg-[var(--cream)] px-[var(--space-md)] py-[var(--space-3xl)] md:px-[var(--space-xl)]">
        <div className="absolute inset-0 grid grid-rows-3 gap-2 opacity-[0.18] pointer-events-none">
          {["0", "1", "2"].map((row) => (
            <div key={row} className="flex gap-2 whitespace-nowrap">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={`${row}-${index}`} className="h-32 w-72 shrink-0 overflow-hidden rounded-[var(--r-lg)] bg-[var(--ink)] md:h-44 md:w-96">
                  <img src={`${base}assets/wireframe/ProtoSPRK0025.png`} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--cream)]/95 via-[var(--cream)]/88 to-[var(--cream)]" />

        <div className="relative z-10 mx-auto grid max-w-6xl gap-[var(--space-2xl)] lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="space-y-[var(--space-xl)]">
            <div className="inline-flex items-center gap-2 rounded-[var(--r-pill)] border border-[var(--border)] bg-[var(--white)] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--ember)] shadow-sm">
              <Sparkles className="h-4 w-4" /> Beta Access · Entry Point
            </div>
            <div>
              <h1 className="font-display text-5xl font-black leading-[0.88] tracking-[-0.06em] text-[var(--ink)] md:text-7xl">
                Enter the SPRK prototype with a live access signal.
              </h1>
              <p className="mt-[var(--space-lg)] max-w-xl text-lg leading-8 text-[var(--steel)]">
                This front door captures who is entering, when they arrived, what creator lane they represent, and then routes them directly into the connected SPRK experience.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {["Front-door capture", "Prototype handoff", "Creator signal"].map((item) => (
                <div key={item} className="rounded-[var(--r)] border border-[var(--border)] bg-[var(--white)]/88 p-4 text-xs font-black uppercase tracking-[0.12em] text-[var(--ink)] shadow-sm">
                  <CheckCircle2 className="mb-2 h-4 w-4 text-[var(--ember)]" /> {item}
                </div>
              ))}
            </div>
            <div className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--white)]/90 p-[var(--space-lg)] text-sm leading-6 text-[var(--steel)] shadow-sm">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[var(--success)]" />
                <p><strong className="text-[var(--ink)]">Tracking note:</strong> source deployments can receive this form at <code>/api/access-log</code>. GitHub Pages is static, so a notification endpoint can also be attached with <code>VITE_ACCESS_FORM_ENDPOINT</code>.</p>
              </div>
            </div>
          </div>

          <form onSubmit={submitAccess} className="rounded-[var(--r-xl)] border border-[var(--border)] bg-[var(--white)] p-[var(--space-lg)] shadow-[0_30px_90px_var(--shadow)] md:p-[var(--space-2xl)]">
            <div className="mb-[var(--space-xl)]">
              <div className="mb-3 flex items-center justify-between text-xs font-black uppercase tracking-[0.16em] text-[var(--mauve)]">
                <span>Step {step} of 4</span>
                <span>{progress}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[var(--cream)]">
                <div className="h-full rounded-full bg-[var(--grad)] transition-all duration-300" style={{ width: progress }} />
              </div>
            </div>

            {step === 1 && (
              <div className="space-y-[var(--space-lg)]">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ember)]">Creator basics</p>
                  <h2 className="mt-2 font-display text-3xl font-black text-[var(--ink)]">Who is entering?</h2>
                </div>
                <label className="grid gap-2 text-sm font-bold text-[var(--ink)]">Creator name
                  <input value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Your name" className="rounded-[var(--r)] border border-[var(--border)] bg-[var(--white)] px-4 py-3 outline-none focus:border-[var(--ember)] focus:ring-2 focus:ring-[var(--warm)]" />
                  {errors.name && <span className="text-xs font-bold text-[var(--error)]">{errors.name}</span>}
                </label>
                <label className="grid gap-2 text-sm font-bold text-[var(--ink)]">Email address
                  <input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="your@email.com" className="rounded-[var(--r)] border border-[var(--border)] bg-[var(--white)] px-4 py-3 outline-none focus:border-[var(--ember)] focus:ring-2 focus:ring-[var(--warm)]" />
                  {errors.email && <span className="text-xs font-bold text-[var(--error)]">{errors.email}</span>}
                </label>
                <label className="grid gap-2 text-sm font-bold text-[var(--ink)]">Brief bio <span className="font-normal text-[var(--steel)]">{form.bio.length}/100</span>
                  <textarea value={form.bio} maxLength={100} onChange={(event) => update("bio", event.target.value)} placeholder="Tell us about your creative practice" className="min-h-24 rounded-[var(--r)] border border-[var(--border)] bg-[var(--white)] px-4 py-3 outline-none focus:border-[var(--ember)] focus:ring-2 focus:ring-[var(--warm)]" />
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {creatorTiers.map((tier) => <PillChoice key={tier} label={tier} selected={form.creatorTier === tier} onClick={() => update("creatorTier", tier)} />)}
                </div>
                {errors.creatorTier && <span className="text-xs font-bold text-[var(--error)]">{errors.creatorTier}</span>}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-[var(--space-lg)]">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ember)]">Content signal</p>
                  <h2 className="mt-2 font-display text-3xl font-black text-[var(--ink)]">What do you create?</h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {contentTypes.map((type) => <PillChoice key={type} label={type} selected={form.contentTypes.includes(type)} onClick={() => update("contentTypes", toggleLimitedValue(form.contentTypes, type, 3))} />)}
                </div>
                {errors.contentTypes && <span className="text-xs font-bold text-[var(--error)]">{errors.contentTypes}</span>}
                <div>
                  <p className="mb-3 text-sm font-bold text-[var(--ink)]">Culture focus <span className="font-normal text-[var(--steel)]">Choose up to 3</span></p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {cultureOptions.map((focus) => <PillChoice key={focus} label={focus} selected={form.cultureFocus.includes(focus)} onClick={() => update("cultureFocus", toggleLimitedValue(form.cultureFocus, focus, 3))} />)}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-[var(--space-lg)]">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ember)]">Platform presence</p>
                  <h2 className="mt-2 font-display text-3xl font-black text-[var(--ink)]">Where do you create?</h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {platformOptions.map((platform) => <PillChoice key={platform} label={platform} selected={form.platforms.includes(platform)} onClick={() => {
                    const next = toggleLimitedValue(form.platforms, platform);
                    update("platforms", next);
                    if (!next.includes(form.primaryPlatform)) update("primaryPlatform", next[0] ?? "");
                  }} />)}
                </div>
                {errors.platforms && <span className="text-xs font-bold text-[var(--error)]">{errors.platforms}</span>}
                <label className="grid gap-2 text-sm font-bold text-[var(--ink)]">Primary platform
                  <select value={form.primaryPlatform} onChange={(event) => update("primaryPlatform", event.target.value)} className="rounded-[var(--r)] border border-[var(--border)] bg-[var(--white)] px-4 py-3 outline-none focus:border-[var(--ember)] focus:ring-2 focus:ring-[var(--warm)]">
                    <option value="">Select primary platform</option>
                    {selectedPlatforms.map((platform) => <option key={platform} value={platform}>{platform}</option>)}
                  </select>
                  {errors.primaryPlatform && <span className="text-xs font-bold text-[var(--error)]">{errors.primaryPlatform}</span>}
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {uploadOptions.map((option) => <PillChoice key={option} label={option} selected={form.uploadFrequency === option} onClick={() => update("uploadFrequency", option)} />)}
                </div>
                {errors.uploadFrequency && <span className="text-xs font-bold text-[var(--error)]">{errors.uploadFrequency}</span>}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-[var(--space-lg)]">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ember)]">Access handoff</p>
                  <h2 className="mt-2 font-display text-3xl font-black text-[var(--ink)]">Ready to enter?</h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--steel)]">Submitting records the prototype entry signal and opens the connected feed experience.</p>
                </div>
                <div className="grid gap-3">
                  {interestOptions.map((option) => <PillChoice key={option} label={option} selected={form.interestLevel === option} onClick={() => update("interestLevel", option)} />)}
                </div>
                {errors.interestLevel && <span className="text-xs font-bold text-[var(--error)]">{errors.interestLevel}</span>}
                <label className="flex items-start gap-3 rounded-[var(--r)] border border-[var(--border)] bg-[var(--cream)] p-4 text-sm font-bold text-[var(--ink)]">
                  <input type="checkbox" checked={form.updatesOptIn} onChange={(event) => update("updatesOptIn", event.target.checked)} className="mt-1" />
                  Send me updates about SPRK features, partnerships, and creator opportunities.
                </label>
                <label className="flex items-start gap-3 rounded-[var(--r)] border border-[var(--border)] bg-[var(--white)] p-4 text-sm font-bold text-[var(--ink)]">
                  <input type="checkbox" checked={form.termsAccepted} onChange={(event) => update("termsAccepted", event.target.checked)} className="mt-1" />
                  I understand SPRK will use my information to contact me and provide early access to beta features.
                </label>
                {errors.termsAccepted && <span className="text-xs font-bold text-[var(--error)]">{errors.termsAccepted}</span>}
                {submitted && <p className="rounded-[var(--r)] border border-[var(--success)] bg-[var(--cream)] p-4 text-sm font-bold text-[var(--success)]">Welcome to SPRK. Redirecting into the prototype feed…</p>}
              </div>
            )}

            <div className="mt-[var(--space-xl)] flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button type="button" onClick={() => step === 1 ? setLocation("/home") : setStep((current) => Math.max(1, current - 1) as FormStep)} className="rounded-[var(--r-pill)] border border-[var(--border)] px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-[var(--steel)] hover:bg-[var(--cream)]">
                {step === 1 ? "Preview without form" : "Back"}
              </button>
              {step < 4 ? (
                <button type="button" onClick={goNext} className="inline-flex items-center justify-center gap-2 rounded-[var(--r-pill)] bg-[var(--grad)] px-6 py-3 text-xs font-black uppercase tracking-[0.12em] text-[var(--white)] shadow-[0_12px_30px_var(--shadow)]">
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button type="submit" disabled={submitting || submitted} className="inline-flex items-center justify-center gap-2 rounded-[var(--r-pill)] bg-[var(--grad)] px-6 py-3 text-xs font-black uppercase tracking-[0.12em] text-[var(--white)] shadow-[0_12px_30px_var(--shadow)] disabled:cursor-not-allowed disabled:opacity-60">
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                  {submitting ? "Submitting…" : "Enter Prototype"}
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      <section className="bg-[var(--white)] px-[var(--space-md)] py-[var(--space-2xl)] md:px-[var(--space-xl)]">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-4">
          {[
            { title: "Home Feed", desc: "Culture-first content stream", href: "/home" },
            { title: "SPRK*OS", desc: "Creator operating studio", href: "/os" },
            { title: "Pavilion", desc: "Brand marketplace", href: "/pavilion" },
            { title: "yourSPRK", desc: "Creator dashboard", href: "/yoursprk" },
          ].map((item) => (
            <Link key={item.title} href={item.href} className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--cream)] p-5 transition hover:-translate-y-1 hover:shadow-[0_18px_45px_var(--shadow)]">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ember)]">Connected module</p>
              <h3 className="mt-2 font-display text-2xl font-black text-[var(--ink)]">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--steel)]">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </SharedLayout>
  );
}
