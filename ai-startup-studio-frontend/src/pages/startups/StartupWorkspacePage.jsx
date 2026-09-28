import { useQuery } from '@tanstack/react-query';
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Circle,
  Clock3,
  FileText,
  LayoutDashboard,
  Sparkles
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import ProgressBar from '@/components/common/ProgressBar.jsx';
import StatusBadge from '@/components/common/StatusBadge.jsx';
import HealthScoreGrid from '@/components/startup/HealthScoreGrid.jsx';
import ActivityList from '@/components/startup/ActivityList.jsx';
import { getStartupById } from '@/services/startupService.js';

function StartupWorkspacePage() {
  const { startupId } = useParams();

  const { data: startup, isLoading, isError, refetch } = useQuery({
    queryKey: ['startup', startupId],
    queryFn: () => getStartupById(startupId),
    enabled: Boolean(startupId)
  });

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-40 rounded-3xl bg-slate-900" />
        <div className="h-32 rounded-2xl bg-slate-900" />
        <div className="h-64 rounded-2xl bg-slate-900" />
      </div>
    );
  }

  if (isError || !startup) {
    return (
      <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-6">
        <h1 className="text-lg font-semibold text-rose-200">Startup workspace unavailable</h1>
        <p className="mt-2 text-sm text-rose-300/80">
          We could not find this startup project.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 rounded-lg bg-rose-500 px-4 py-2 text-sm font-medium text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  const completedModules = startup.modules.filter((module) => module.status === 'completed').length;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-6 md:p-8">
        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${startup.color}`} />

        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          <div className="flex items-start gap-4">
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${startup.color} text-lg font-bold text-white`}
            >
              {startup.name.slice(0, 2).toUpperCase()}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-semibold tracking-tight text-white">{startup.name}</h1>
                <StatusBadge status={startup.status} />
              </div>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{startup.description}</p>

              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
                <span className="rounded-full bg-slate-800 px-3 py-1">{startup.industry}</span>
                <span className="rounded-full bg-slate-800 px-3 py-1">{startup.stage}</span>
                <span className="rounded-full bg-slate-800 px-3 py-1">
                  Updated {startup.lastUpdated}
                </span>
              </div>
            </div>
          </div>

          <Link
            to={`/startups/${startup.id}/ai-cofounder`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-400"
          >
            <Bot size={17} />
            Ask AI Co-Founder
          </Link>
        </div>

        <div className="mt-8 max-w-xl">
          <ProgressBar value={startup.progress} label="Overall workspace progress" size="lg" />
        </div>
      </section>

      <nav className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/70 p-2">
        <div className="flex min-w-max gap-1">
          <Link
            to={`/startups/${startup.id}`}
            className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-medium text-white"
          >
            <LayoutDashboard className="mr-2 inline-block" size={15} />
            Overview
          </Link>

          <Link
            to={`/startups/${startup.id}/idea`}
            className="rounded-xl px-4 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            Analysis
          </Link>

          <Link
            to={`/startups/${startup.id}/mvp`}
            className="rounded-xl px-4 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            Planning
          </Link>

          <Link
            to={`/startups/${startup.id}/roadmap`}
            className="rounded-xl px-4 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            Execution
          </Link>

          <Link
            to={`/startups/${startup.id}/documents`}
            className="rounded-xl px-4 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            Documents
          </Link>

          <Link
            to={`/startups/${startup.id}/monitoring`}
            className="rounded-xl px-4 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            Monitoring
          </Link>
        </div>
      </nav>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-emerald-400" size={20} />
            <div>
              <p className="text-xs text-slate-500">Completed modules</p>
              <p className="mt-1 text-2xl font-semibold text-white">
                {completedModules}/{startup.modules.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <div className="flex items-center gap-3">
            <Clock3 className="text-amber-300" size={20} />
            <div>
              <p className="text-xs text-slate-500">Current stage</p>
              <p className="mt-1 text-2xl font-semibold text-white">{startup.stage}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <div className="flex items-center gap-3">
            <Sparkles className="text-indigo-300" size={20} />
            <div>
              <p className="text-xs text-slate-500">Health score</p>
              <p className="mt-1 text-2xl font-semibold text-white">{startup.healthScore}/100</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <div className="mb-5">
            <p className="text-sm text-slate-500">Startup health</p>
            <h2 className="mt-1 text-xl font-semibold text-white">Readiness overview</h2>
          </div>

          <HealthScoreGrid scores={startup.healthScores} />
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <div className="mb-5 flex items-center gap-2">
            <FileText size={18} className="text-cyan-300" />
            <div>
              <p className="text-sm text-slate-500">Workspace summary</p>
              <h2 className="mt-1 text-xl font-semibold text-white">Module progress</h2>
            </div>
          </div>

          <div className="space-y-5">
            {startup.modules.slice(0, 7).map((module) => (
              <div key={module.id} className="flex items-center gap-3">
                {module.status === 'completed' ? (
                  <CheckCircle2 className="shrink-0 text-emerald-400" size={17} />
                ) : module.status === 'in-progress' ? (
                  <Clock3 className="shrink-0 text-amber-300" size={17} />
                ) : (
                  <Circle className="shrink-0 text-slate-600" size={17} />
                )}

                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex justify-between gap-3 text-xs">
                    <span className="truncate text-slate-300">{module.label}</span>
                    <span className="text-slate-500">{module.progress}%</span>
                  </div>
                  <ProgressBar value={module.progress} showValue={false} size="sm" />
                </div>
              </div>
            ))}
          </div>

          <Link
            to={`/startups/${startup.id}/idea`}
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-indigo-300 hover:text-indigo-200"
          >
            Continue workspace
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-500">Execution history</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Recent activity</h2>
          <div className="mt-5">
            <ActivityList activities={startup.recentActivity} />
          </div>
        </div>

        <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-300">
              <Sparkles size={19} />
            </div>
            <div>
              <p className="text-sm text-indigo-300">AI Co-Founder guidance</p>
              <h2 className="mt-1 text-xl font-semibold text-white">Your next decision matters</h2>
            </div>
          </div>

          <p className="mt-5 text-sm leading-6 text-slate-300">
            Before expanding your MVP, validate whether your target customers experience this problem
            frequently enough to pay for a solution.
          </p>

          <Link
            to={`/startups/${startup.id}/ai-cofounder`}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400"
          >
            Open AI Co-Founder
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default StartupWorkspacePage;