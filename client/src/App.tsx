import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import Os from "./pages/Os";
import Pavilion from "./pages/Pavilion";
import HomeFeed from "./pages/HomeFeed";
import ArticleDetail from "./pages/ArticleDetail";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomeFeed} />
      <Route path="/landing" component={Home} />
      <Route path="/discover" component={Discover} />
      <Route path="/home" component={HomeFeed} />
      <Route path="/article/:id" component={ArticleDetail} />
      <Route path="/os" component={Os} />
      <Route path="/pavilion" component={Pavilion} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
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
