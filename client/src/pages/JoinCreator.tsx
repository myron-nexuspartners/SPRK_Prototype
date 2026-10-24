import { useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import SharedLayout from "@/components/SharedLayout";
import { isValidEmail } from "@/lib/accessGate";

const TOTAL_STEPS = 5;

const CREATOR_TIERS = ["Emerging Creator", "Growing Creator", "Established Creator", "Elite Creator"];

const CONTENT_TYPES = [
  "Short-form video (TikTok, Reels, Shorts, etc.)",
  "Long-form video (YouTube, Twitch, etc.)",
  "Articles & written content",
  "Photography & visual art",
  "Podcasts & audio",
  "Live streams",
  "Community posts & discussions",
  "Other",
];

const CULTURE_FOCUS = [
  "Gaming & Esports",
  "Fashion & Streetwear",
  "Music Scene",
  "Tech & Innovation",
  "Entertainment & Pop Culture",
  "Sports & Fitness",
  "Beauty & Wellness",
  "Travel & Adventure",
  "Food & Cooking",
  "Education & Learning",
  "Arts & Design",
  "Comedy & Humor",
  "Social Justice & Activism",
  "Business & Entrepreneurship",
  "Lifestyle & Wellness",
  "Other",
];

const AUDIENCE_SIZES = ["Under 10K followers", "10K–50K followers", "50K–250K followers", "250K–1M followers", "1M+ followers", "Just starting out"];

const PLATFORMS = ["SPRK", "TikTok", "Instagram", "YouTube", "Snapchat", "Pinterest", "Threads", "Bluesky", "BeReal", "Kick", "Twitch", "X/Twitter", "LinkedIn", "Mastodon", "Discord", "Reddit"];

const UPLOAD_FREQUENCIES = ["Daily (or more)", "Several times a week", "Weekly", "A few times a month", "Monthly", "Less frequently"];

const INTEREST_LEVELS = ["Very interested in SPRK tools", "Somewhat interested, want to learn more", "Just exploring", "Not sure yet"];

type FormState = {
  name: string;
  email: string;
  bio: string;
  tier: string;
  contentTypes: string[];
  cultureFocus: string[];
  audienceSize: string;
  platforms: string[];
  primaryPlatform: string;
  uploadFrequency: string;
  interestLevel: string;
  optIn: boolean;
  termsAccepted: boolean;
};

const initialForm: FormState = {
  name: "",
  email: "",
  bio: "",
  tier: "",
  contentTypes: [],
  cultureFocus: [],
  audienceSize: "",
  platforms: [],
  primaryPlatform: "",
  uploadFrequency: "",
  interestLevel: "",
  optIn: true,
  termsAccepted: false,
};

function encodeNetlifyForm(data: Record<string, string>) {
  return new URLSearchParams(data).toString();
}

function toggleInList(list: string[], value: string, max?: number) {
  if (list.includes(value)) return list.filter((item) => item !== value);
  if (max && list.length >= max) return [...list.slice(1), value];
  return [...list, value];
}

function CheckboxOption({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-2 rounded-[var(--r-sm)] border px-3 py-2 text-sm font-semibold transition-colors ${
        checked ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--white)]" : "border-[var(--border)] bg-[var(--white)] text-[var(--ink)] hover:border-[var(--ink)]"
      }`}
    >
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      {label}
    </label>
  );
}

function RadioOption({ name, label, checked, onChange }: { name: string; label: string; checked: boolean; onChange: () => void }) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-2 rounded-[var(--r-sm)] border px-3 py-2 text-sm font-semibold transition-colors ${
        checked ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--white)]" : "border-[var(--border)] bg-[var(--white)] text-[var(--ink)] hover:border-[var(--ink)]"
      }`}
    >
      <input type="radio" name={name} checked={checked} onChange={onChange} className="sr-only" />
      {label}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-2 text-xs font-bold text-[var(--error)]">{message}</p>;
}

export default function JoinCreator() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  };

  const primaryPlatformOptions = useMemo(() => form.platforms, [form.platforms]);

  const validateStep = (currentStep: number) => {
    const nextErrors: Record<string, string> = {};

    if (currentStep === 2) {
      if (form.name.trim().length < 2 || form.name.trim().length > 50) nextErrors.name = "Please enter your name (2–50 characters).";
      if (!isValidEmail(form.email)) nextErrors.email = "Please enter a valid email address.";
      if (!form.tier) nextErrors.tier = "Please select a creator tier.";
    }

    if (currentStep === 3) {
      if (form.contentTypes.length === 0) nextErrors.contentTypes = "Select at least one content type.";
      if (!form.audienceSize) nextErrors.audienceSize = "Please select an audience size.";
    }

    if (currentStep === 4) {
      if (form.platforms.length === 0) nextErrors.platforms = "Select at least one platform.";
      if (!form.primaryPlatform) nextErrors.primaryPlatform = "Please select your primary platform.";
      if (!form.uploadFrequency) nextErrors.uploadFrequency = "Please select an upload frequency.";
    }

    if (currentStep === 5) {
      if (!form.interestLevel) nextErrors.interestLevel = "Please select an interest level.";
      if (!form.termsAccepted) nextErrors.termsAccepted = "Please agree to continue.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    if (step === TOTAL_STEPS) {
      void submitForm();
      return;
    }
    setStep((current) => Math.min(TOTAL_STEPS, current + 1));
  };

  const goBack = () => setStep((current) => Math.max(1, current - 1));

  const submitForm = async () => {
    setSubmitting(true);
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeNetlifyForm({
          "form-name": "sprk-join-creator",
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          bio: form.bio.trim(),
          tier: form.tier,
          contentTypes: form.contentTypes.join(", "),
          cultureFocus: form.cultureFocus.join(", "),
          audienceSize: form.audienceSize,
          platforms: form.platforms.join(", "),
          primaryPlatform: form.primaryPlatform,
          uploadFrequency: form.uploadFrequency,
          interestLevel: form.interestLevel,
          optIn: String(form.optIn),
          submittedAt: new Date().toISOString(),
        }),
      }).catch(() => null);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const stepLabels = ["Introduction", "Creator basics", "Content & audience", "Platform presence", "Interest & next steps"];

  return (
    <SharedLayout activeSite="lead-gen">
      <section className="bg-[var(--cream)] px-[var(--space-md)] py-[var(--space-3xl)] md:px-[var(--space-xl)]">
        <div className="mx-auto max-w-2xl">
          <div className="mb-[var(--space-xl)] text-center">
            <div className="inline-flex items-center gap-2 rounded-[var(--r-pill)] border border-[var(--border)] bg-[var(--white)] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--ember)] shadow-sm">
              <Sparkles className="h-4 w-4" /> yourSPRK · Creator Recruitment
            </div>
            <h1 className="mt-[var(--space-lg)] font-display text-4xl font-black tracking-[-0.04em] text-[var(--ink)] md:text-5xl">Join SPRK</h1>
            <p className="mt-3 text-sm leading-6 text-[var(--steel)]">Tell us about your creative practice.</p>
          </div>

          <div className="rounded-[var(--r-xl)] border border-[var(--border)] bg-[var(--white)] p-[var(--space-lg)] shadow-[0_30px_90px_var(--shadow)] md:p-[var(--space-2xl)]">
            {!submitted ? (
              <>
                <div className="mb-[var(--space-lg)]">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.1em] text-[var(--mauve)]">
                    <span>
                      Step {step} of {TOTAL_STEPS}
                    </span>
                    <span>{stepLabels[step - 1]}</span>
                  </div>
                  <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-[var(--border)]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[var(--ember)] to-[var(--crimson)] transition-all duration-300"
                      style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                    />
                  </div>
                </div>

                {step === 1 && (
                  <div className="space-y-4">
                    <p className="text-sm leading-6 text-[var(--steel)]">
                      We're building tools for creators who want to own their work and earnings. Let's learn about you.
                    </p>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-[var(--space-lg)]">
                    <label className="grid gap-2 text-sm font-bold text-[var(--ink)]" htmlFor="join-name">
                      Creator name
                      <input
                        id="join-name"
                        value={form.name}
                        onChange={(event) => update("name", event.target.value)}
                        placeholder="Your name"
                        className="rounded-[var(--r)] border border-[var(--border)] bg-[var(--white)] px-4 py-3 outline-none focus:border-[var(--ember)] focus:ring-2 focus:ring-[var(--warm)]"
                      />
                      <FieldError message={errors.name} />
                    </label>

                    <label className="grid gap-2 text-sm font-bold text-[var(--ink)]" htmlFor="join-email">
                      Email address
                      <input
                        id="join-email"
                        type="email"
                        value={form.email}
                        onChange={(event) => update("email", event.target.value)}
                        placeholder="your@email.com"
                        className="rounded-[var(--r)] border border-[var(--border)] bg-[var(--white)] px-4 py-3 outline-none focus:border-[var(--ember)] focus:ring-2 focus:ring-[var(--warm)]"
                      />
                      <FieldError message={errors.email} />
                    </label>

                    <label className="grid gap-2 text-sm font-bold text-[var(--ink)]" htmlFor="join-bio">
                      Brief bio <span className="font-normal text-[var(--mauve)]">(optional)</span>
                      <textarea
                        id="join-bio"
                        value={form.bio}
                        maxLength={100}
                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => update("bio", event.target.value)}
                        placeholder="Tell us about your creative practice"
                        rows={3}
                        className="resize-none rounded-[var(--r)] border border-[var(--border)] bg-[var(--white)] px-4 py-3 outline-none focus:border-[var(--ember)] focus:ring-2 focus:ring-[var(--warm)]"
                      />
                      <span className="text-right text-xs font-semibold text-[var(--mauve)]">{form.bio.length} / 100</span>
                    </label>

                    <div>
                      <p className="text-sm font-bold text-[var(--ink)]">Creator tier</p>
                      <div className="mt-2 grid gap-2 sm:grid-cols-2">
                        {CREATOR_TIERS.map((tier) => (
                          <RadioOption key={tier} name="tier" label={tier} checked={form.tier === tier} onChange={() => update("tier", tier)} />
                        ))}
                      </div>
                      <FieldError message={errors.tier} />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-[var(--space-lg)]">
                    <div>
                      <p className="text-sm font-bold text-[var(--ink)]">What do you create? <span className="font-normal text-[var(--mauve)]">(select 1–3)</span></p>
                      <div className="mt-2 grid gap-2">
                        {CONTENT_TYPES.map((type) => (
                          <CheckboxOption
                            key={type}
                            label={type}
                            checked={form.contentTypes.includes(type)}
                            onChange={() => update("contentTypes", toggleInList(form.contentTypes, type, 3))}
                          />
                        ))}
                      </div>
                      <FieldError message={errors.contentTypes} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-[var(--ink)]">Content culture focus <span className="font-normal text-[var(--mauve)]">(select up to 3, optional)</span></p>
                      <div className="mt-2 grid gap-2 sm:grid-cols-2">
                        {CULTURE_FOCUS.map((focus) => (
                          <CheckboxOption
                            key={focus}
                            label={focus}
                            checked={form.cultureFocus.includes(focus)}
                            onChange={() => update("cultureFocus", toggleInList(form.cultureFocus, focus, 3))}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-bold text-[var(--ink)]">Audience size</p>
                      <div className="mt-2 grid gap-2 sm:grid-cols-2">
                        {AUDIENCE_SIZES.map((size) => (
                          <RadioOption key={size} name="audienceSize" label={size} checked={form.audienceSize === size} onChange={() => update("audienceSize", size)} />
                        ))}
                      </div>
                      <FieldError message={errors.audienceSize} />
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-[var(--space-lg)]">
                    <div>
                      <p className="text-sm font-bold text-[var(--ink)]">Where do you create? <span className="font-normal text-[var(--mauve)]">(select all that apply)</span></p>
                      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {PLATFORMS.map((platform) => (
                          <CheckboxOption
                            key={platform}
                            label={platform}
                            checked={form.platforms.includes(platform)}
                            onChange={() => {
                              const next = toggleInList(form.platforms, platform);
                              update("platforms", next);
                              if (!next.includes(form.primaryPlatform)) update("primaryPlatform", next[0] ?? "");
                            }}
                          />
                        ))}
                      </div>
                      <FieldError message={errors.platforms} />
                    </div>

                    <label className="grid gap-2 text-sm font-bold text-[var(--ink)]" htmlFor="join-primary-platform">
                      Primary platform
                      <select
                        id="join-primary-platform"
                        value={form.primaryPlatform}
                        onChange={(event) => update("primaryPlatform", event.target.value)}
                        disabled={primaryPlatformOptions.length === 0}
                        className="rounded-[var(--r)] border border-[var(--border)] bg-[var(--white)] px-4 py-3 outline-none focus:border-[var(--ember)] focus:ring-2 focus:ring-[var(--warm)] disabled:opacity-50"
                      >
                        <option value="" disabled>
                          {primaryPlatformOptions.length === 0 ? "Select platforms above first" : "Choose primary platform"}
                        </option>
                        {primaryPlatformOptions.map((platform) => (
                          <option key={platform} value={platform}>
                            {platform}
                          </option>
                        ))}
                      </select>
                      <FieldError message={errors.primaryPlatform} />
                    </label>

                    <div>
                      <p className="text-sm font-bold text-[var(--ink)]">Monthly upload frequency</p>
                      <div className="mt-2 grid gap-2 sm:grid-cols-2">
                        {UPLOAD_FREQUENCIES.map((frequency) => (
                          <RadioOption
                            key={frequency}
                            name="uploadFrequency"
                            label={frequency}
                            checked={form.uploadFrequency === frequency}
                            onChange={() => update("uploadFrequency", frequency)}
                          />
                        ))}
                      </div>
                      <FieldError message={errors.uploadFrequency} />
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-[var(--space-lg)]">
                    <div>
                      <p className="text-sm font-bold text-[var(--ink)]">Ready to build?</p>
                      <div className="mt-2 grid gap-2">
                        {INTEREST_LEVELS.map((level) => (
                          <RadioOption key={level} name="interestLevel" label={level} checked={form.interestLevel === level} onChange={() => update("interestLevel", level)} />
                        ))}
                      </div>
                      <FieldError message={errors.interestLevel} />
                    </div>

                    <label className="flex items-start gap-3 rounded-[var(--r-sm)] border border-[var(--border)] px-3 py-3 text-sm leading-6 text-[var(--steel)]">
                      <input type="checkbox" checked={form.optIn} onChange={(event) => update("optIn", event.target.checked)} className="mt-1" />
                      Send me updates about SPRK features, partnerships, and creator opportunities.
                    </label>

                    <label className="flex items-start gap-3 rounded-[var(--r-sm)] border border-[var(--border)] px-3 py-3 text-sm leading-6 text-[var(--steel)]">
                      <input type="checkbox" checked={form.termsAccepted} onChange={(event) => update("termsAccepted", event.target.checked)} className="mt-1" />
                      I understand SPRK will use my information to contact me and provide early access to beta features. <span className="font-bold text-[var(--ink)] underline">Terms of Service</span>
                    </label>
                    <FieldError message={errors.termsAccepted} />
                  </div>
                )}

                <div className="mt-[var(--space-xl)] flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={step === 1}
                    className="inline-flex items-center gap-2 rounded-[var(--r-pill)] border border-[var(--border)] bg-[var(--white)] px-5 py-3 text-sm font-bold text-[var(--ink)] transition disabled:cursor-not-allowed disabled:opacity-40 hover:not(:disabled):bg-[var(--warm)]"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={submitting}
                    className="inline-flex items-center gap-2 rounded-[var(--r-pill)] bg-[var(--ink)] px-6 py-3 text-sm font-black uppercase tracking-[0.1em] text-[var(--white)] transition hover:-translate-y-0.5 hover:bg-[var(--ember)] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    {step === TOTAL_STEPS ? (submitting ? "Submitting…" : "Submit") : "Next"}
                    {step < TOTAL_STEPS && <ArrowRight className="h-4 w-4" />}
                  </button>
                </div>
              </>
            ) : (
              <div className="py-[var(--space-lg)] text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-[var(--success)]" />
                <h2 className="mt-4 font-display text-3xl font-black tracking-[-0.03em] text-[var(--ink)]">Welcome to SPRK</h2>
                <p className="mt-2 text-sm font-bold text-[var(--steel)]">Your early access is on the way</p>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--steel)]">
                  Thanks for joining us. We're excited to have you in the SPRK community. Check your email for exclusive early access to the prototype and creator resources.
                </p>
                <button
                  onClick={() => setLocation("/coming-soon")}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-[var(--r-pill)] bg-[var(--ink)] px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-[var(--white)] transition hover:-translate-y-0.5 hover:bg-[var(--ember)]"
                >
                  Enter Prototype <ArrowRight className="h-4 w-4" />
                </button>
                <p className="mt-4 text-xs font-semibold text-[var(--mauve)]">
                  Already have access?{" "}
                  <button onClick={() => setLocation("/")} className="underline hover:text-[var(--ink)]">
                    Return to prototype
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </SharedLayout>
  );
}
