import "./global.css";
import "./styles/minimal.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Index from "./pages/Index";
import Products from "./pages/Products";
import WeaverSchemes from "./pages/WeaverSchemes";
import WeaverProduction from "./pages/WeaverProduction";
import WeaverWorkTracking from "./pages/WeaverWorkTracking";
import WeaverEarnings from "./pages/WeaverEarnings";
import BuyerOrders from "./pages/BuyerOrders";
import BuyerWeavers from "./pages/BuyerWeavers";
import SocietyWeavers from "./pages/SocietyWeavers";
import SocietyHierarchy from "./pages/SocietyHierarchy";
import SocietySchemes from "./pages/SocietySchemes";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />

            {/* Weaver routes */}
            <Route path="/weaver/production" element={<WeaverProduction />} />
            <Route path="/weaver/work-tracking" element={<WeaverWorkTracking />} />
            <Route path="/weaver/earnings" element={<WeaverEarnings />} />
            <Route path="/weaver/schemes" element={<WeaverSchemes />} />

            {/* Buyer routes */}
            <Route path="/buyer/orders" element={<BuyerOrders />} />
            <Route path="/buyer/weavers" element={<BuyerWeavers />} />

            {/* Society routes */}
            <Route path="/society/weavers" element={<SocietyWeavers />} />
            <Route path="/society/hierarchy" element={<SocietyHierarchy />} />
            <Route path="/society/schemes" element={<SocietySchemes />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
