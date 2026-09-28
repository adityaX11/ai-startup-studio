import { useQuery } from '@tanstack/react-query';
import { ListTodo } from 'lucide-react';

import SectionHeader from '@/components/planning/SectionHeader.jsx';
import Pill from '@/components/planning/Pill.jsx';
import { getMvpData } from '@/services/planningService.js';

function MvpPlannerPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['mvp-data'],
    queryFn: getMvpData
  });

  if (isLoading) {
    return <div className="h-96 animate-pulse rounded-2xl bg-slate-900" />;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <SectionHeader
        eyebrow="Plan"
        title="MVP planner"
        description="Prioritize features by impact, effort, risk, and value to create a focused, launch-ready scope."
        action={
          <Pill tone="info">
            <ListTodo size={13} className="mr-1 inline" />
            Prioritization
          </Pill>
        }
      />

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-500">Must have</p>
          <p className="text-2xl font-semibold text-white">
            {data.features.filter((feature) => feature.priority === 'Must Have').length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-500">Should have</p>
          <p className="text-2xl font-semibold text-white">
            {data.features.filter((feature) => feature.priority === 'Should Have').length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-500">High impact</p>
          <p className="text-2xl font-semibold text-white">
            {data.features.filter((feature) => feature.impact >= 80).length}
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <div className="mb-5">
          <p className="text-sm text-slate-500">Feature backlog</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Prioritized roadmap scope</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b border-slate-800 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-3 py-3">Feature</th>
                <th className="px-3 py-3">Impact</th>
                <th className="px-3 py-3">Effort</th>
                <th className="px-3 py-3">Complexity</th>
                <th className="px-3 py-3">Risk</th>
                <th className="px-3 py-3">Priority</th>
                <th className="px-3 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {data.features.map((feature) => (
                <tr key={feature.id} className="border-b border-slate-800/70">
                  <td className="px-3 py-4">
                    <div>
                      <p className="font-medium text-white">{feature.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{feature.description}</p>
                    </div>
                  </td>

                  <td className="px-3 py-4 text-slate-300">{feature.impact}</td>
                  <td className="px-3 py-4 text-slate-300">{feature.effort}</td>
                  <td className="px-3 py-4 text-slate-300">{feature.complexity}</td>
                  <td className="px-3 py-4 text-slate-300">{feature.risk}</td>
                  <td className="px-3 py-4">
                    <Pill tone={feature.priority === 'Must Have' ? 'success' : 'info'}>
                      {feature.priority}
                    </Pill>
                  </td>
                  <td className="px-3 py-4">
                    <Pill tone={feature.status === 'Completed' ? 'success' : 'warning'}>
                      {feature.status}
                    </Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default MvpPlannerPage;