import { useQuery } from '@tanstack/react-query';
import { ArrowUpRight, FolderKanban, Plus, Rocket, Sparkles, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import MetricCard from '@/components/common/MetricCard.jsx';
import ProgressBar from '@/components/common/ProgressBar.jsx';
import EmptyState from '@/components/common/EmptyState.jsx';
import HealthScoreGrid from '@/components/startup/HealthScoreGrid.jsx';
import RecommendedActions from '@/components/startup/RecommendedActions.jsx';
import ActivityList from '@/components/startup/ActivityList.jsx';
import StartupCard from '@/components/startup/StartupCard.jsx';
import { getDashboardData } from '@/services/startupService.js';

function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-32 rounded-2xl bg-slate-900" />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="h-28 rounded-2xl bg-slate-900" />
        <div className="h-28 rounded-2xl bg-slate-900" />
        <div className="h-28 rounded-2xl bg-slate-900" />
      </div>
      <div className="h-72 rounded-2xl bg-slate-900" />
    </div>
  );
}

function DashboardPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboardData
  });

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-6">
        <h1 className="text-lg font-semibold text-rose-200">Unable to load dashboard</h1>
        <p className="mt-2 text-sm text-rose-300/80">
          The dashboard data could not be loaded. Please try again.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 rounded-lg bg-rose-500 px-4 py-2 text-sm font-medium text-white hover:bg-rose-400"
        >
          Retry
        </button>
      </div>
    );
  }

  const projects = data?.projects || [];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950 via-slate-900 to-cyan-950 p-6 md:p-8">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-medium text-cyan-300">Founder command center</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Welcome back, Aditya.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
              Continue turning your startup ideas into validated, structured, and execution-ready plans.
            </p>
          </div>

          <Link
            to="/onboarding"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-50"
          >
            <Plus size={17} />
            Create startup
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <MetricCard
          label="Startup projects"
          value={projects.length}
          description="Total workspaces created"
          icon={FolderKanban}
          accent="indigo"
        />
        <MetricCard
          label="Active projects"
          value={projects.filter((project) => project.status === 'Active').length}
          description="Projects currently in motion"
          icon={Rocket}
          accent="cyan"
        />
        <MetricCard
          label="Average health"
          value={`${Math.round(projects.reduce((sum, project) => sum + project.healthScore, 0) / Math.max(projects.length, 1))}/100`}
          description="Across your startup portfolio"
          icon={Target}
          accent="emerald"
        />
      </section>

      {projects.length === 0 ? (
        <EmptyState
          title="Your startup portfolio is empty"
          description="Create your first startup workspace to begin analysis, validation, and planning."
          action={
            <Link
              to="/onboarding"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400"
            >
              <Plus size={16} />
              Create your first startup
            </Link>
          }
        />
      ) : (
        <>
          <section>
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">Your portfolio</p>
                <h2 className="mt-1 text-xl font-semibold text-white">Startup projects</h2>
              </div>

              <Link
                to="/startups"
                className="inline-flex items-center gap-1 text-sm text-indigo-300 hover:text-indigo-200"
              >
                View all
                <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              {projects.slice(0, 4).map((startup) => (
                <StartupCard key={startup.id} startup={startup} />
              ))}
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="mb-5">
                <p className="text-sm text-slate-500">Portfolio signal</p>
                <h2 className="mt-1 text-xl font-semibold text-white">LaunchMate health overview</h2>
              </div>

              <HealthScoreGrid scores={projects[0].healthScores} />
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="mb-5 flex items-center gap-2">
                <Sparkles size={18} className="text-indigo-300" />
                <div>
                  <p className="text-sm text-slate-500">AI guidance</p>
                  <h2 className="mt-1 text-xl font-semibold text-white">Recommended next actions</h2>
                </div>
              </div>

              <RecommendedActions actions={data.recommendedActions} />
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="mb-5">
                <p className="text-sm text-slate-500">Execution progress</p>
                <h2 className="mt-1 text-xl font-semibold text-white">LaunchMate workspace</h2>
              </div>

              <div className="space-y-5">
                {projects[0].modules.slice(0, 6).map((module) => (
                  <ProgressBar key={module.id} value={module.progress} label={module.label} />
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="mb-5">
                <p className="text-sm text-slate-500">Workspace history</p>
                <h2 className="mt-1 text-xl font-semibold text-white">Recent activity</h2>
              </div>

              <ActivityList activities={projects[0].recentActivity} />
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default DashboardPage;