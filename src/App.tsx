
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import PublicLayout from "@/layouts/PublicLayout";
import AdminLayout from "@/layouts/AdminLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Sports from "./pages/Sports";
import SportDetail from "./pages/SportDetail";
import ResultsPage from "./pages/ResultsPage";
import NoticesPage from "./pages/NoticesPage";
import CommitteePage from "./pages/CommitteePage";
import GalleryPage from "./pages/GalleryPage";
import RegistrationPage from "./pages/RegistrationPage";
import ContactPage from "./pages/ContactPage";
import AdminLogin from "./pages/AdminLogin";
import ResetPassword from "./pages/ResetPassword";
import AdminDashboard from "./pages/admin/Dashboard";
import ManageSports from "./pages/admin/ManageSports";
import ManageColleges from "./pages/admin/ManageColleges";
import ManagePlayers from "./pages/admin/ManagePlayers";
import ManageSchedule from "./pages/admin/ManageSchedule";
import ManageResults from "./pages/admin/ManageResults";
import ManageNotices from "./pages/admin/ManageNotices";
import ManageCommittee from "./pages/admin/ManageCommittee";
import ManageGallery from "./pages/admin/ManageGallery";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/sports" element={<Sports />} />
                <Route path="/sports/:slug" element={<SportDetail />} />
                <Route path="/results" element={<ResultsPage />} />
                <Route path="/notices" element={<NoticesPage />} />
                <Route path="/committee" element={<CommitteePage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/reset-password" element={<ResetPassword />} />
              </Route>

              {/* Admin */}
              <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/sports" element={<ManageSports />} />
                <Route path="/admin/colleges" element={<ManageColleges />} />
                <Route path="/admin/players" element={<ManagePlayers />} />
                <Route path="/admin/schedule" element={<ManageSchedule />} />
                <Route path="/admin/results" element={<ManageResults />} />
                <Route path="/admin/notices" element={<ManageNotices />} />
                <Route path="/admin/committee" element={<ManageCommittee />} />
                <Route path="/admin/gallery" element={<ManageGallery />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
