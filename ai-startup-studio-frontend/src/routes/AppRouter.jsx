import { Navigate, Route, Routes } from 'react-router-dom';
import PublicLayout from '@/layouts/PublicLayout.jsx';
import AppLayout from '@/layouts/AppLayout.jsx';
import AuthLayout from '@/layouts/AuthLayout.jsx';
import ProtectedRoute from '@/routes/ProtectedRoute.jsx';
import {
  LandingPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  OnboardingPage,
  DashboardPage,
  StartupsPage,
  StartupWorkspacePage,
  ModulePage,
  AnalyticsPage,
  SettingsPage,
  NotFoundPage,
  UnauthorizedPage,
  ForbiddenPage
} from '@/pages';

function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/startups" element={<StartupsPage />} />
        <Route path="/startups/:startupId" element={<StartupWorkspacePage />} />

        <Route path="/startups/:startupId/idea" element={<ModulePage title="Idea Analysis" />} />
        <Route path="/startups/:startupId/validation" element={<ModulePage title="Problem Validation" />} />
        <Route path="/startups/:startupId/market" element={<ModulePage title="Market Research" />} />
        <Route path="/startups/:startupId/competitors" element={<ModulePage title="Competitor Analysis" />} />
        <Route path="/startups/:startupId/customers" element={<ModulePage title="Customer Analysis" />} />
        <Route path="/startups/:startupId/swot" element={<ModulePage title="SWOT Analysis" />} />
        <Route path="/startups/:startupId/business-model" element={<ModulePage title="Business Model" />} />
        <Route path="/startups/:startupId/revenue" element={<ModulePage title="Revenue Model" />} />
        <Route path="/startups/:startupId/finance" element={<ModulePage title="Financial Estimation" />} />
        <Route path="/startups/:startupId/mvp" element={<ModulePage title="MVP Planner" />} />
        <Route path="/startups/:startupId/technology" element={<ModulePage title="Technology Recommendation" />} />
        <Route path="/startups/:startupId/roadmap" element={<ModulePage title="Development Roadmap" />} />
        <Route path="/startups/:startupId/gtm" element={<ModulePage title="Go-To-Market Strategy" />} />
        <Route path="/startups/:startupId/risks" element={<ModulePage title="Risk Analysis" />} />
        <Route path="/startups/:startupId/pitch-deck" element={<ModulePage title="Pitch Deck" />} />
        <Route path="/startups/:startupId/ai-cofounder" element={<ModulePage title="AI Co-Founder" />} />
        <Route path="/startups/:startupId/documents" element={<ModulePage title="Documents" />} />
        <Route path="/startups/:startupId/monitoring" element={<ModulePage title="Monitoring" />} />
        <Route path="/startups/:startupId/analytics" element={<AnalyticsPage />} />

        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="/forbidden" element={<ForbiddenPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default AppRouter;