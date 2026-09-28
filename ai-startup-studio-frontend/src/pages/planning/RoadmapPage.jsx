import { useQuery } from '@tanstack/react-query';
import { CalendarRange, CheckCircle2, Clock3 } from 'lucide-react';

import SectionHeader from '@/components/planning/SectionHeader.jsx';
import Pill from '@/components/planning/Pill.jsx';
import { getRoadmapData } from '@/services/planningService.js';

function RoadmapPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['roadmap-data'],
    queryFn: getRoadmapData
  });

  if (isLoading) {
    return <div className="h-96 animate-pulse rounded-2xl bg-slate-900" />;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <SectionHeader
        eyebrow="Plan"
        title="Development roadmap"
        description="Track execution milestones, delivery phases, and time-sensitive dependencies across the founder journey."
        action={
          <Pill tone="success">
            <CalendarRange size={13} className="mr-1 inline" />
            Milestones
          </Pill>
        }
      />

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-500">Completed</p>
          <p className="text-2xl font-semibold text-white">
            {data.milestones.filter((item) => item.status === 'Completed').length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-500">In progress</p>
          <p className="text-2xl font-semibold text-white">
            {data.milestones.filter((item) => item.status === 'In Progress').length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-500">Planned</p>
          <p className="text-2xl font-semibold text-white">
            {data.milestones.filter((item) => item.status === 'Planned').length}
          </p>
        </div>
      </section>

      <section className="space-y-4">
        {data.milestones.map((milestone) => (
          <article key={milestone.id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                {milestone.status === 'Completed' ? (
                  <CheckCircle2 className="text-emerald-400" size={18} />
                ) : (
                  <Clock3 className="text-amber-300" size={18} />
                )}

                <div>
                  <h2 className="text-lg font-semibold text-white">{milestone.title}</h2>
                  <p className="text-sm text-slate-500">
                    {milestone.owner}
                  </p>
                </div>
              </div>

              <Pill
                tone={
                  milestone.status === 'Completed'
                    ? 'success'
                    : milestone.status === 'In Progress'
                      ? 'warning'
                      : 'default'
                }
              >
                {milestone.status}
              </Pill>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-slate-950/50 p-3">
                <p className="text-xs text-slate-500">Start date</p>
                <p className="mt-2 text-white">{milestone.startDate}</p>
              </div>

              <div className="rounded-xl bg-slate-950/50 p-3">
                <p className="text-xs text-slate-500">End date</p>
                <p className="mt-2 text-white">{milestone.endDate}</p>
              </div>

              <div className="rounded-xl bg-slate-950/50 p-3">
                <p className="text-xs text-slate-500">Owner</p>
                <p className="mt-2 text-white">{milestone.owner}</p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default RoadmapPage;