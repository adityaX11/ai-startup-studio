import { Navigate, Route, Routes } from 'react-router-dom';

import PublicLayout from '@/layouts/PublicLayout.jsx';
import AuthLayout from '@/layouts/AuthLayout.jsx';
import AppLayout from '@/layouts/AppLayout.jsx';
import ProtectedRoute from '@/routes/ProtectedRoute.jsx';

import {
  // Public and authentication pages
  LandingPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,

  // Core application pages
  OnboardingPage,
  DashboardPage,
  StartupsPage,
  StartupWorkspacePage,
  AnalyticsPage,
  SettingsPage,

  // System pages
  NotFoundPage,
  UnauthorizedPage,
  ForbiddenPage,

  // Phase 5: Analysis pages
  IdeaAnalysisPage,
  ValidationPage,
  MarketResearchPage,
  CompetitorAnalysisPage,
  CustomerAnalysisPage,
  SwotPage,

  // Phase 6: Planning pages
  BusinessModelPage,
  RevenueModelPage,
  FinancialPage,
  MvpPlannerPage,
  TechnologyPage,
  RoadmapPage,

  // Phase 7: Execution pages
  GtmPage,
  RisksPage,
  PitchDeckPage,
  AiCofounderPage,
  DocumentsPage,
  MonitoringPage
} from '@/pages';

function AppRouter() {
  return (
    <Routes>
      {/* =====================================================
          Public routes
      ====================================================== */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      {/* =====================================================
          Authentication routes
      ====================================================== */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* =====================================================
          Protected application routes
      ====================================================== */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        {/* ---------------------------------------------------
            Onboarding and startup creation
        ---------------------------------------------------- */}
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/startups/new" element={<OnboardingPage />} />

        {/* ---------------------------------------------------
            Global application pages
        ---------------------------------------------------- */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/startups" element={<StartupsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<SettingsPage />} />

        {/* ---------------------------------------------------
            Startup workspace overview
        ---------------------------------------------------- */}
        <Route
          path="/startups/:startupId"
          element={<StartupWorkspacePage />}
        />

        {/* ===================================================
            Phase 5: Analysis
        ==================================================== */}
        <Route
          path="/startups/:startupId/idea"
          element={<IdeaAnalysisPage />}
        />

        <Route
          path="/startups/:startupId/validation"
          element={<ValidationPage />}
        />

        <Route
          path="/startups/:startupId/market"
          element={<MarketResearchPage />}
        />

        <Route
          path="/startups/:startupId/competitors"
          element={<CompetitorAnalysisPage />}
        />

        <Route
          path="/startups/:startupId/customers"
          element={<CustomerAnalysisPage />}
        />

        <Route
          path="/startups/:startupId/swot"
          element={<SwotPage />}
        />

        {/* ===================================================
            Phase 6: Planning
        ==================================================== */}
        <Route
          path="/startups/:startupId/business-model"
          element={<BusinessModelPage />}
        />

        <Route
          path="/startups/:startupId/revenue"
          element={<RevenueModelPage />}
        />

        <Route
          path="/startups/:startupId/finance"
          element={<FinancialPage />}
        />

        <Route
          path="/startups/:startupId/mvp"
          element={<MvpPlannerPage />}
        />

        <Route
          path="/startups/:startupId/technology"
          element={<TechnologyPage />}
        />

        <Route
          path="/startups/:startupId/roadmap"
          element={<RoadmapPage />}
        />

        {/* ===================================================
            Phase 7: Launch and execution
        ==================================================== */}
        <Route
          path="/startups/:startupId/gtm"
          element={<GtmPage />}
        />

        <Route
          path="/startups/:startupId/risks"
          element={<RisksPage />}
        />

        <Route
          path="/startups/:startupId/pitch-deck"
          element={<PitchDeckPage />}
        />

        {/* ===================================================
            Phase 7: AI and supporting workspace modules
        ==================================================== */}
        <Route
          path="/startups/:startupId/ai-cofounder"
          element={<AiCofounderPage />}
        />

        <Route
          path="/startups/:startupId/documents"
          element={<DocumentsPage />}
        />

        <Route
          path="/startups/:startupId/monitoring"
          element={<MonitoringPage />}
        />

        <Route
          path="/startups/:startupId/analytics"
          element={<AnalyticsPage />}
        />
      </Route>

      {/* =====================================================
          System routes
      ====================================================== */}
      <Route
        path="/unauthorized"
        element={<UnauthorizedPage />}
      />

      <Route
        path="/forbidden"
        element={<ForbiddenPage />}
      />

      <Route
        path="/404"
        element={<NotFoundPage />}
      />

      {/* Catch-all route */}
      <Route
        path="*"
        element={<Navigate to="/404" replace />}
      />
    </Routes>
  );
}

export default AppRouter;