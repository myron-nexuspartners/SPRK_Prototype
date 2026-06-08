import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import Os from "./pages/Os";
import Pavilion from "./pages/Pavilion";
import Yoursprk from "./pages/Yoursprk";
import HomeFeed from "./pages/HomeFeed";
import ArticleDetail from "./pages/ArticleDetail";
import { hasPrototypeAccess } from "./lib/accessGate";

function RequireAccess({ children }: { children: ReactNode }) {
  const [, setLocation] = useLocation();

  if (!hasPrototypeAccess()) {
    setTimeout(() => setLocation("/"), 0);
    return (
      <div className="min-h-screen bg-[var(--cream)] px-[var(--space-md)] py-[var(--space-3xl)] text-center text-[var(--ink)]">
        <div className="mx-auto max-w-xl rounded-[var(--r-xl)] border border-[var(--border)] bg-[var(--white)] p-[var(--space-xl)] shadow-[0_24px_70px_var(--shadow)]">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ember)]">Access required</p>
          <h1 className="mt-3 font-display text-4xl font-black tracking-[-0.04em]">Please start at the SPRK entry gate.</h1>
          <p className="mt-4 text-sm leading-6 text-[var(--steel)]">You are being redirected to the access form so this prototype visit can be recorded.</p>
        </div>
      </div>
    );
  }

  return children;
}

function ProtectedDiscover() {
  return <RequireAccess><Discover /></RequireAccess>;
}

function ProtectedHomeFeed() {
  return <RequireAccess><HomeFeed /></RequireAccess>;
}

function ProtectedArticleDetail() {
  return <RequireAccess><ArticleDetail /></RequireAccess>;
}

function ProtectedOs() {
  return <RequireAccess><Os /></RequireAccess>;
}

function ProtectedPavilion() {
  return <RequireAccess><Pavilion /></RequireAccess>;
}

function ProtectedYoursprk() {
  return <RequireAccess><Yoursprk /></RequireAccess>;
}

function Router() {
  const base = import.meta.env.BASE_URL === "/" ? "" : import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <WouterRouter base={base}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/landing" component={Home} />
        <Route path="/discover" component={ProtectedDiscover} />
        <Route path="/home" component={ProtectedHomeFeed} />
        <Route path="/article/:id" component={ProtectedArticleDetail} />
        <Route path="/os" component={ProtectedOs} />
        <Route path="/pavilion" component={ProtectedPavilion} />
        <Route path="/yoursprk" component={ProtectedYoursprk} />
        <Route path="/404" component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
