import { useState } from "react";
import type { FormEvent } from "react";
import { useLocation } from "wouter";
import { ArrowRight, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import SharedLayout from "@/components/SharedLayout";
import { isValidEmail } from "@/lib/accessGate";

const stats = [
  { value: "2,500+", label: "Creators already building" },
  { value: "500K+", label: "Pieces of content syndicated" },
  { value: "75%", label: "Revenue share, industry-leading" },
];

function encodeNetlifyForm(data: Record<string, string>) {
  return new URLSearchParams(data).toString();
}

export default function ComingSoon() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setSubmitting(true);
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeNetlifyForm({
          "form-name": "sprk-coming-soon",
          email: email.trim().toLowerCase(),
          submittedAt: new Date().toISOString(),
        }),
      }).catch(() => null);
      setSubmitted(true);
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
                  <img src={`${import.meta.env.BASE_URL}assets/wireframe/ProtoSPRK0025.png`} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--cream)]/95 via-[var(--cream)]/88 to-[var(--cream)]" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-[var(--r-pill)] border border-[var(--border)] bg-[var(--white)] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--ember)] shadow-sm">
            <Sparkles className="h-4 w-4" /> Coming Soon
          </div>

          <h1 className="mt-[var(--space-lg)] font-display text-5xl font-black leading-[0.9] tracking-[-0.06em] text-[var(--ink)] md:text-7xl">
            The Creator-First <span className="bg-gradient-to-r from-[#FF6B35] via-[#E8003D] to-[#CC0055] bg-clip-text text-transparent">Operating System</span>
          </h1>
          <p className="mt-4 text-lg font-bold text-[var(--steel)]">Culture + Commerce = Independence</p>

          <div className="mx-auto mt-6 max-w-xl space-y-1 text-base leading-7 text-[var(--steel)]">
            <p>SPRK is where creators own their work, their earnings, and their destiny.</p>
            <p>Syndicate once. Earn everywhere. Keep 75%.</p>
            <p>Instant partnerships. Smart contracts. No middlemen.</p>
          </div>

          <div className="mx-auto mt-[var(--space-2xl)] max-w-md rounded-[var(--r-xl)] border border-[var(--border)] bg-[var(--white)] p-[var(--space-xl)] text-left shadow-[0_30px_90px_var(--shadow)]">
            {!submitted ? (
              <form
                name="sprk-coming-soon"
                method="POST"
                data-netlify="true"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="form-name" value="sprk-coming-soon" />
                <h2 className="font-display text-2xl font-black tracking-[-0.03em] text-[var(--ink)]">Be First to Create, Earn, Own</h2>
                <label className="mt-4 grid gap-2 text-sm font-bold text-[var(--ink)]" htmlFor="coming-soon-email">
                  Your email
                  <input
                    id="coming-soon-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setError("");
                    }}
                    placeholder="Your email"
                    aria-invalid={Boolean(error)}
                    className="rounded-[var(--r)] border border-[var(--border)] bg-[var(--white)] px-4 py-3 outline-none focus:border-[var(--ember)] focus:ring-2 focus:ring-[var(--warm)]"
                  />
                  {error && <span className="text-xs font-bold text-[var(--error)]">{error}</span>}
                </label>
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-[var(--r-pill)] bg-[var(--ember)] px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-[var(--white)] transition hover:-translate-y-0.5 hover:bg-[#E55A2B] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                  {submitting ? "Sending…" : "Get Early Access"}
                </button>
                <p className="mt-3 text-center text-xs leading-5 text-[var(--steel)]">We'll send you exclusive access when it's your turn. Unsubscribe anytime.</p>
              </form>
            ) : (
              <div className="text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-[var(--success)]" />
                <h2 className="mt-3 font-display text-2xl font-black tracking-[-0.03em] text-[var(--ink)]">Check Your Email</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--steel)]">We've sent you exclusive early access. You can now explore the SPRK prototype.</p>
                <button
                  onClick={() => setLocation("/")}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[var(--r-pill)] bg-[var(--ink)] px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-[var(--white)] transition hover:-translate-y-0.5 hover:bg-[var(--ember)]"
                >
                  Enter Prototype <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          <div className="mt-[var(--space-2xl)] grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--white)]/80 p-5 text-center">
                <div className="font-display text-3xl font-black text-[var(--ink)]">{stat.value}</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-[0.1em] text-[var(--steel)]">{stat.label}</div>
              </div>
            ))}
          </div>

          <blockquote className="mt-[var(--space-xl)] text-sm italic leading-6 text-[var(--steel)]">"SPRK changed how I think about earnings." — Early Access Creator</blockquote>
        </div>
      </section>
    </SharedLayout>
  );
}
