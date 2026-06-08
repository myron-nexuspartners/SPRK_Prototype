import { Link } from "wouter";
import { Check, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type PrototypeFamilySiteId = "lead-gen" | "discover" | "os" | "pavilion" | "yoursprk";

type PrototypeFamilySite = {
  id: PrototypeFamilySiteId;
  label: string;
  path: string;
  desc: string;
};

export const prototypeFamilySites: PrototypeFamilySite[] = [
  { id: "lead-gen", label: "yourSPRK.com", path: "/", desc: "Official Beta Access Portal" },
  { id: "discover", label: "the-sprk.com", path: "/home", desc: "Open-norm creator content platform" },
  { id: "os", label: "SPRK-OS", path: "/os", desc: "AI creator studio workspace" },
  { id: "pavilion", label: "SPRK Pavilion", path: "/pavilion", desc: "Brand and creator marketplace" },
  { id: "yoursprk", label: "yourSPRK Hub", path: "/yoursprk", desc: "Authenticated creator dashboard" },
];

interface PrototypeFamilyRibbonProps {
  activeSite: PrototypeFamilySiteId;
  className?: string;
}

export default function PrototypeFamilyRibbon({ activeSite, className = "" }: PrototypeFamilyRibbonProps) {
  const activeSiteObj = prototypeFamilySites.find((site) => site.id === activeSite) || prototypeFamilySites[0];

  return (
    <div className={`border-b border-[var(--border)] bg-[var(--cream)] px-[var(--space-lg)] py-[var(--space-sm)] text-xs font-medium md:px-[var(--space-2xl)] ${className}`}>
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-[var(--space-md)]">
        <div className="flex min-w-0 items-center gap-[var(--space-sm)]">
          <span className="inline-block h-2 w-2 shrink-0 animate-pulse rounded-full bg-[var(--ember)]" aria-hidden="true" />
          <span className="truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--steel)]">SPRK proto-family demo</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-[var(--space-xs)] text-[var(--ink)] font-bold transition-opacity hover:opacity-80 outline-none cursor-pointer">
            <span className="truncate">Viewing: {activeSiteObj.label}</span>
            <ChevronDown className="h-3.5 w-3.5 text-[var(--steel)]" aria-hidden="true" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="z-[100] w-72 rounded-[var(--r)] border border-[var(--border)] bg-[var(--white)] p-[var(--space-sm)] shadow-xl">
            <div className="mb-[var(--space-xs)] border-b border-[var(--border)] px-[var(--space-md)] py-[var(--space-sm)]">
              <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--mauve)]">Navigate family platforms</span>
            </div>
            {prototypeFamilySites.map((site) => (
              <DropdownMenuItem key={site.id} asChild className="rounded-[var(--r-sm)] focus:bg-[var(--cream)]">
                <Link href={site.path} className="flex w-full cursor-pointer items-start justify-between p-[var(--space-md)]">
                  <div>
                    <span className="block text-sm font-bold text-[var(--ink)]">{site.label}</span>
                    <span className="mt-[var(--space-xs)] block text-xs text-[var(--steel)]">{site.desc}</span>
                  </div>
                  {activeSite === site.id && <Check className="mt-1 h-4 w-4 shrink-0 text-[var(--ember)]" aria-hidden="true" />}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
