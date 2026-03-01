import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { I18nProvider } from "@/lib/i18n";
import { AuthProvider } from "@/lib/auth";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BadgesList from "./pages/BadgesList";
import BadgeDetail from "./pages/BadgeDetail";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import Passport from "./pages/Passport";
import CertPage from "./pages/CertPage";
import CouponsPage from "./pages/CouponsPage";
import SettingsPage from "./pages/SettingsPage";
import Ranking from "./pages/Ranking";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminBadges from "./pages/admin/AdminBadges";
import AdminCompanies from "./pages/admin/AdminCompanies";
import AdminAgents from "./pages/admin/AdminAgents";
import AdminPosts from "./pages/admin/AdminPosts";
import AdminRoles from "./pages/admin/AdminRoles";
import AdminMedia from "./pages/admin/AdminMedia";
import AdminSiteContent from "./pages/admin/AdminSiteContent";
import AdminMobileContent from "./pages/admin/AdminMobileContent";
import SiteLayout from "./pages/site/SiteLayout";
import SiteHome from "./pages/site/SiteHome";
import SiteHowItWorks from "./pages/site/SiteHowItWorks";
import SiteEvents from "./pages/site/SiteEvents";
import SiteBlog from "./pages/site/SiteBlog";
import SiteContact from "./pages/site/SiteContact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Admin routes */}
              <Route path="/admin" element={<AdminDashboard />}>
                <Route index element={<AdminOverview />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="badges" element={<AdminBadges />} />
                <Route path="posts" element={<AdminPosts />} />
                <Route path="media" element={<AdminMedia />} />
                <Route path="companies" element={<AdminCompanies />} />
                <Route path="agents" element={<AdminAgents />} />
                <Route path="roles" element={<AdminRoles />} />
                <Route path="content" element={<AdminSiteContent />} />
                <Route path="mobile-content" element={<AdminMobileContent />} />
              </Route>

              {/* Website / intro site */}
              <Route path="/site" element={<SiteLayout />}>
                <Route index element={<SiteHome />} />
                <Route path="how-it-works" element={<SiteHowItWorks />} />
                <Route path="events" element={<SiteEvents />} />
                <Route path="blog" element={<SiteBlog />} />
                <Route path="contact" element={<SiteContact />} />
              </Route>
              <Route path="/" element={<Navigate to="/site" replace />} />
              <Route path="/mobile" element={<Layout><Index /></Layout>} />
              <Route path="/mobile/login" element={<Layout><Login /></Layout>} />
              <Route path="/mobile/signup" element={<Layout><Signup /></Layout>} />
              <Route path="/mobile/badges" element={<Layout><BadgesList /></Layout>} />
              <Route path="/mobile/badge/:id" element={<Layout><BadgeDetail /></Layout>} />
              <Route path="/mobile/cert/:id" element={<Layout><CertPage /></Layout>} />
              <Route path="/mobile/payment/:badgeId" element={<Layout><Payment /></Layout>} />
              <Route path="/mobile/payment-success" element={<Layout><PaymentSuccess /></Layout>} />
              <Route path="/mobile/passport" element={<Layout><Passport /></Layout>} />
              <Route path="/mobile/coupons" element={<Layout><CouponsPage /></Layout>} />
              <Route path="/mobile/settings" element={<Layout><SettingsPage /></Layout>} />
              <Route path="/mobile/ranking" element={<Layout><Ranking /></Layout>} />
              <Route path="/mobile/contact" element={<Layout><Contact /></Layout>} />
              <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </I18nProvider>
  </QueryClientProvider>
);

export default App;
