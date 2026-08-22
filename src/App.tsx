import { lazy, Suspense } from "react";
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

// Public pages
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Sports = lazy(() => import("./pages/Sports"));
const SportDetail = lazy(() => import("./pages/SportDetail"));
const ResultsPage = lazy(() => import("./pages/ResultsPage"));
const NoticesPage = lazy(() => import("./pages/NoticesPage"));
const SchedulePage = lazy(() => import("./pages/SchedulePage"));
const CommitteePage = lazy(() => import("./pages/CommitteePage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const RegistrationPage = lazy(() => import("./pages/RegistrationPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

// Authentication pages
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminSignup = lazy(() => import("./pages/AdminSignup"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

// Admin pages
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const ManageSports = lazy(() => import("./pages/admin/ManageSports"));
const ManageColleges = lazy(() => import("./pages/admin/ManageColleges"));
const ManagePlayers = lazy(() => import("./pages/admin/ManagePlayers"));
const ManageSchedule = lazy(() => import("./pages/admin/ManageSchedule"));
const ManageResults = lazy(() => import("./pages/admin/ManageResults"));
const ManageNotices = lazy(() => import("./pages/admin/ManageNotices"));
const ManageCommittee = lazy(() => import("./pages/admin/ManageCommittee"));
const ManageGallery = lazy(() => import("./pages/admin/ManageGallery"));
const Registrations = lazy(() => import("./pages/admin/Registrations"));

const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      retry: 1,
    },
  },
});

const LoadingScreen = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <Suspense fallback={<LoadingScreen />}>
              <Routes>

                {/* PUBLIC */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/sports" element={<Sports />} />
                  <Route path="/sports/:slug" element={<SportDetail />} />
                  <Route path="/results" element={<ResultsPage />} />
                  <Route path="/notices" element={<NoticesPage />} />
                  <Route path="/schedule" element={<SchedulePage />} />
                  <Route path="/committee" element={<CommitteePage />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/registration" element={<RegistrationPage />} />
                  <Route path="/contact" element={<ContactPage />} />

                  {/* AUTH */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin/signup" element={<AdminSignup />} />
                  <Route
                    path="/admin/reset-password"
                    element={<ResetPassword />}
                  />
                </Route>

                {/* ADMIN */}
                <Route
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route
                    path="/admin/registrations"
                    element={<Registrations />}
                  />
                  <Route
                    path="/admin/sports"
                    element={<ManageSports />}
                  />
                  <Route
                    path="/admin/colleges"
                    element={<ManageColleges />}
                  />
                  <Route
                    path="/admin/players"
                    element={<ManagePlayers />}
                  />
                  <Route
                    path="/admin/schedule"
                    element={<ManageSchedule />}
                  />
                  <Route
                    path="/admin/results"
                    element={<ManageResults />}
                  />
                  <Route
                    path="/admin/notices"
                    element={<ManageNotices />}
                  />
                  <Route
                    path="/admin/committee"
                    element={<ManageCommittee />}
                  />
                  <Route
                    path="/admin/gallery"
                    element={<ManageGallery />}
                  />
                </Route>

                <Route path="*" element={<NotFound />} />

              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;