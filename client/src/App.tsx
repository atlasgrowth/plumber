import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import ResidentialServices from "@/pages/ResidentialServices";
import CommercialServices from "@/pages/CommercialServices";
import NotFound from "@/pages/not-found";
import { Analytics } from "./pages/Analytics";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/residential" component={ResidentialServices} />
      <Route path="/commercial" component={CommercialServices} />
      <Route path="/analytics" element={<Analytics />} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;