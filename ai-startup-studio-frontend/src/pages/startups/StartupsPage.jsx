import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import StartupCard from '@/components/startup/StartupCard.jsx';
import EmptyState from '@/components/common/EmptyState.jsx';
import { getStartupProjects } from '@/services/startupService.js';

function StartupsPage() {
  const [search, setSearch] = useState('');
  const { data: startups = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['startup-projects'],
    queryFn: getStartupProjects
  });

  const filteredStartups = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) {
      return startups;
    }

    return startups.filter((startup) =>
      `${startup.name} ${startup.tagline} ${startup.industry} ${startup.stage}`
        .toLowerCase()
        .includes(value)
    );
  }, [search, startups]);

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 w-64 rounded-lg bg-slate-900" />
        <div className="h-28 rounded-2xl bg-slate-900" />
        <div className="h-28 rounded-2xl bg-slate-900" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-6">
        <h1 className="text-lg font-semibold text-rose-200">Unable to load startup projects</h1>
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

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm text-slate-500">Portfolio</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white">Startup projects</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Manage every startup idea, validation hypothesis, and execution plan from one place.
          </p>
        </div>

        <Link
          to="/onboarding"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-400"
        >
          <Plus size={17} />
          Create startup
        </Link>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        <label className="flex items-center gap-3">
          <Search size={18} className="text-slate-500" />
          <span className="sr-only">Search startup projects</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by startup name, industry, or stage..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />
        </label>
      </section>

      {filteredStartups.length === 0 ? (
        <EmptyState
          title={search ? 'No matching startups' : 'No startup projects yet'}
          description={
            search
              ? 'Try a different search term.'
              : 'Create your first startup workspace to begin your validation journey.'
          }
          action={
            !search ? (
              <Link
                to="/onboarding"
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white"
              >
                <Plus size={16} />
                Create startup
              </Link>
            ) : null
          }
        />
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {filteredStartups.map((startup) => (
            <StartupCard key={startup.id} startup={startup} />
          ))}
        </div>
      )}
    </div>
  );
}

export default StartupsPage;