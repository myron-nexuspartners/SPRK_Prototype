import type { ReactNode } from "react";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import PrototypeFamilyRibbon, { prototypeFamilySites, type PrototypeFamilySiteId } from "@/components/PrototypeFamilyRibbon";

interface SharedLayoutProps {
  children: ReactNode;
  activeSite: PrototypeFamilySiteId;
}

export default function SharedLayout({ children, activeSite }: SharedLayoutProps) {
  const sites = prototypeFamilySites;

  return (
    <div className="flex min-h-screen flex-col bg-[var(--white)] text-[var(--ink)] antialiased selection:bg-[var(--warm)]">
      <PrototypeFamilyRibbon activeSite={activeSite} />

      <nav className="sticky left-0 right-0 top-0 z-30 border-b border-[var(--border)] bg-[var(--white)]/90 px-[var(--space-lg)] py-[var(--space-md)] backdrop-blur-md transition-all md:px-[var(--space-2xl)]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-[var(--space-lg)]">
          <Link href="/" className="group flex items-center gap-[var(--space-sm)]">
            <svg className="h-8 w-8 shrink-0 transition-transform group-hover:scale-105" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect width="32" height="32" rx="8" fill="url(#sprk-logo-grad)" />
              <path d="M16 8C16 12.4183 19.5817 16 24 16C19.5817 16 16 19.5817 16 24C16 19.5817 12.4183 16 8 16C12.4183 16 16 12.4183 16 8Z" fill="var(--white)" />
              <defs>
                <linearGradient id="sprk-logo-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="var(--ember)" />
                  <stop offset="60%" stopColor="var(--error)" />
                  <stop offset="100%" stopColor="var(--crimson)" />
                </linearGradient>
              </defs>
            </svg>
            <span className="font-display text-2xl font-extrabold tracking-tight text-[var(--ink)]">SPRK<span className="font-medium text-[var(--ember)]">*</span></span>
          </Link>

          <div className="hidden items-center gap-[var(--space-xl)] text-sm font-semibold text-[var(--steel)] md:flex">
            {sites.map((site) => (
              <Link key={site.id} href={site.path} className={`transition-colors hover:text-[var(--ink)] ${activeSite === site.id ? "text-[var(--ink)]" : ""}`}>
                {site.label}
              </Link>
            ))}
          </div>

          <Link href="/os" className="inline-flex items-center gap-[var(--space-xs)] rounded-[var(--r-pill)] bg-[var(--ink)] px-[var(--space-lg)] py-[var(--space-sm)] text-xs font-bold uppercase tracking-[0.12em] text-[var(--white)] transition-colors hover:bg-[var(--navy)]">
            <span>Launch Studio</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </nav>

      <main className="relative z-10 flex flex-1 flex-col">
        {children}
      </main>

      <footer className="relative z-20 border-t border-[var(--border)] bg-[var(--cream)] px-[var(--space-lg)] py-[var(--space-2xl)] text-center text-xs font-medium uppercase tracking-[0.12em] text-[var(--mauve)] md:px-[var(--space-2xl)]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-[var(--space-lg)] md:flex-row">
          <div className="flex items-center gap-[var(--space-sm)]">
            <span className="font-extrabold text-[var(--ink)]">SPRK*</span>
            <span className="text-[var(--blush)]">|</span>
            <span>© 2026 SPRK Unlimited LLC. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap justify-center gap-[var(--space-lg)]">
            {sites.map((site) => (
              <Link key={site.id} href={site.path} className="transition-colors hover:text-[var(--ink)]">{site.label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
