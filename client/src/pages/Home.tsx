import React, { useState } from "react";
import { useLocation } from "wouter";
import { ArrowRight, CheckCircle2, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import SharedLayout from "@/components/SharedLayout";
import { isValidEmail, savePrototypeAccess } from "@/lib/accessGate";

type GateForm = {
  firstName: string;
  lastName: string;
  email: string;
  botField: string;
};

const base = import.meta.env.BASE_URL === "/" ? "/" : import.meta.env.BASE_URL;
const webhookEndpoint = ((import.meta.env.VITE_ACCESS_WEBHOOK_ENDPOINT as string | undefined) || (import.meta.env.VITE_ACCESS_FORM_ENDPOINT as string | undefined) || "").trim();
const initialForm: GateForm = { firstName: "", lastName: "", email: "", botField: "" };

function encodeNetlifyForm(data: Record<string, string>) {
  return new URLSearchParams(data).toString();
}

export default function Home() {
  const [, setLocation] = useLocation();
  const [form, setForm] = useState<GateForm>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof GateForm, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof GateForm>(key: K, value: GateForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof GateForm, string>> = {};
    if (form.firstName.trim().length < 2) nextErrors.firstName = "Please enter your first name.";
    if (form.lastName.trim().length < 2) nextErrors.lastName = "Please enter your last name.";
    if (!isValidEmail(form.email)) nextErrors.email = "Please enter a valid email address.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submitAccess = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.botField) return;
    if (!validate()) return;

    const submittedAt = new Date().toISOString();
    const payload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim().toLowerCase(),
      submittedAt,
      visitId: crypto.randomUUID(),
      entryPath: window.location.href,
      referrer: document.referrer || "direct",
      userAgent: navigator.userAgent,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      source: "SPRK Prototype Netlify Gate",
    };

    setSubmitting(true);
    try {
      const netlifyBody = encodeNetlifyForm({
        "form-name": "sprk-prototype-access",
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        submittedAt: payload.submittedAt,
        visitId: payload.visitId,
        entryPath: payload.entryPath,
        referrer: payload.referrer,
        userAgent: payload.userAgent,
        timezone: payload.timezone,
        source: payload.source,
      });

      const netlifyCapture = fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: netlifyBody,
      });

      const serverCapture = fetch(`${base.replace(/\/$/, "")}/api/access-log`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => null);

      const webhookCapture = webhookEndpoint
        ? fetch(webhookEndpoint, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify(payload),
          }).catch(() => null)
        : Promise.resolve(null);

      const [netlifyResult] = await Promise.allSettled([netlifyCapture, serverCapture, webhookCapture]);

      if (netlifyResult.status === "rejected") {
        throw netlifyResult.reason;
      }

      if (!netlifyResult.value.ok) {
        throw new Error(`Netlify form capture failed with status ${netlifyResult.value.status}`);
      }

      savePrototypeAccess(payload);
      toast.success("Access captured. Entering the SPRK prototype…");
      window.setTimeout(() => setLocation("/home"), 650);
    } catch (error) {
      console.error(error);
      toast.error("Access could not be recorded. Please try again before entering the prototype.");
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
              <Sparkles className="h-4 w-4" /> Private Prototype · Access Gate
            </div>
            <div>
              <h1 className="font-display text-5xl font-black leading-[0.88] tracking-[-0.06em] text-[var(--ink)] md:text-7xl">
                Welcome to [SPRK]. Introduce yourself and come on in.
              </h1>
              <p className="mt-[var(--space-lg)] max-w-xl text-lg leading-8 text-[var(--steel)]">
                Please enter your name and email before viewing the prototype. This helps us ensure that the SPRK signal is transmitted through the noise and finding the select few we’ve identified to share early access with.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {["Name captured", "Email captured", "Session unlocked"].map((item) => (
                <div key={item} className="rounded-[var(--r)] border border-[var(--border)] bg-[var(--white)]/88 p-4 text-xs font-black uppercase tracking-[0.12em] text-[var(--ink)] shadow-sm">
                  <CheckCircle2 className="mb-2 h-4 w-4 text-[var(--ember)]" /> {item}
                </div>
              ))}
            </div>
            <div className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--white)]/90 p-[var(--space-lg)] text-sm leading-6 text-[var(--steel)] shadow-sm">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[var(--success)]" />
                <p><strong className="text-[var(--ink)]">Simple gate:</strong> internal prototype routes redirect here until this form is submitted in the visitor browser.</p>
              </div>
            </div>
          </div>

          <form
            name="sprk-prototype-access"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={submitAccess}
            className="rounded-[var(--r-xl)] border border-[var(--border)] bg-[var(--white)] p-[var(--space-lg)] shadow-[0_30px_90px_var(--shadow)] md:p-[var(--space-2xl)]"
          >
            <input type="hidden" name="form-name" value="sprk-prototype-access" />
            <label className="hidden">Do not fill this out<input name="bot-field" value={form.botField} onChange={(event) => update("botField", event.target.value)} /></label>

            <div className="mb-[var(--space-xl)]">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ember)]">Audience access</p>
              <h2 className="mt-2 font-display text-3xl font-black tracking-[-0.04em] text-[var(--ink)]">Who is entering?</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--steel)]">Submit once to unlock the prototype in this browser session.</p>
            </div>

            <div className="grid gap-[var(--space-lg)]">
              <label className="grid gap-2 text-sm font-bold text-[var(--ink)]">First name
                <input name="firstName" autoComplete="given-name" value={form.firstName} onChange={(event) => update("firstName", event.target.value)} placeholder="First name" className="rounded-[var(--r)] border border-[var(--border)] bg-[var(--white)] px-4 py-3 outline-none focus:border-[var(--ember)] focus:ring-2 focus:ring-[var(--warm)]" />
                {errors.firstName && <span className="text-xs font-bold text-[var(--error)]">{errors.firstName}</span>}
              </label>

              <label className="grid gap-2 text-sm font-bold text-[var(--ink)]">Last name
                <input name="lastName" autoComplete="family-name" value={form.lastName} onChange={(event) => update("lastName", event.target.value)} placeholder="Last name" className="rounded-[var(--r)] border border-[var(--border)] bg-[var(--white)] px-4 py-3 outline-none focus:border-[var(--ember)] focus:ring-2 focus:ring-[var(--warm)]" />
                {errors.lastName && <span className="text-xs font-bold text-[var(--error)]">{errors.lastName}</span>}
              </label>

              <label className="grid gap-2 text-sm font-bold text-[var(--ink)]">Email address
                <input name="email" type="email" autoComplete="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="name@example.com" className="rounded-[var(--r)] border border-[var(--border)] bg-[var(--white)] px-4 py-3 outline-none focus:border-[var(--ember)] focus:ring-2 focus:ring-[var(--warm)]" />
                {errors.email && <span className="text-xs font-bold text-[var(--error)]">{errors.email}</span>}
              </label>
            </div>

            <button type="submit" disabled={submitting} className="mt-[var(--space-xl)] flex w-full items-center justify-center gap-2 rounded-[var(--r-pill)] bg-[var(--ink)] px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-[var(--white)] transition hover:-translate-y-0.5 hover:bg-[var(--ember)] disabled:cursor-not-allowed disabled:opacity-70">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
              {submitting ? "Recording access…" : "Submit and enter prototype"}
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-[var(--steel)]">By entering, visitors acknowledge this is a private prototype preview and their access submission has been received and noted.</p>
          </form>
        </div>
      </section>
    </SharedLayout>
  );
}
