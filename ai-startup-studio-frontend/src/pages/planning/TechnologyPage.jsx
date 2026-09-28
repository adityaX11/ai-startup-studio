import { useQuery } from '@tanstack/react-query';
import { Cpu, Layers3 } from 'lucide-react';

import SectionHeader from '@/components/planning/SectionHeader.jsx';
import Pill from '@/components/planning/Pill.jsx';
import { getTechnologyData } from '@/services/planningService.js';

function TechnologyPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['technology-data'],
    queryFn: getTechnologyData
  });

  if (isLoading) {
    return <div className="h-96 animate-pulse rounded-2xl bg-slate-900" />;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <SectionHeader
        eyebrow="Plan"
        title="Technology recommendation"
        description="Choose the right stack for the current startup phase while balancing speed, complexity, and operational risk."
        action={
          <Pill tone="info">
            <Cpu size={13} className="mr-1 inline" />
            Recommended stack
          </Pill>
        }
      />

      <section className="grid gap-5 lg:grid-cols-2">
        {data.stack.map((item) => (
          <article key={item.category} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500">{item.category}</p>
                <h2 className="text-xl font-semibold text-white">{item.technology}</h2>
              </div>

              <Layers3 size={18} className="text-indigo-300" />
            </div>

            <div className="mt-5 space-y-4 text-sm text-slate-300">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Why recommended</p>
                <p className="mt-2 leading-6">{item.why}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Trade-offs</p>
                <p className="mt-2 leading-6">{item.tradeOffs}</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-slate-950/50 p-3">
                  <p className="text-xs text-slate-500">Complexity</p>
                  <p className="mt-2 font-medium text-white">{item.complexity}</p>
                </div>

                <div className="rounded-xl bg-slate-950/50 p-3">
                  <p className="text-xs text-slate-500">Cost</p>
                  <p className="mt-2 font-medium text-white">{item.cost}</p>
                </div>

                <div className="rounded-xl bg-slate-950/50 p-3">
                  <p className="text-xs text-slate-500">Fit</p>
                  <p className="mt-2 font-medium text-white">Strong</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default TechnologyPage;