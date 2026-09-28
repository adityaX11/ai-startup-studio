import { useQuery } from '@tanstack/react-query';
import { BellRing, ExternalLink } from 'lucide-react';

import SectionHeader from '@/components/planning/SectionHeader.jsx';
import Pill from '@/components/planning/Pill.jsx';
import { getMonitoringData } from '@/services/executionService.js';

function MonitoringPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['monitoring'],
    queryFn: getMonitoringData
  });

  if (isLoading) {
    return <div className="h-96 animate-pulse rounded-2xl bg-slate-900" />;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <SectionHeader
        eyebrow="Monitor"
        title="Continuous monitoring"
        description="Track market signals, competitor changes, and important startup risks. This version uses frontend mock events."
        action={
          <Pill tone="warning">
            <BellRing size={13} className="mr-1 inline" />
            Monitoring preview
          </Pill>
        }
      />

      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Signal timeline</p>
            <h2 className="mt-1 text-xl font-semibold text-white">Recent changes</h2>
          </div>

          <span className="text-xs text-slate-500">Last checked: today</span>
        </div>

        <div className="mt-6 space-y-4">
          {data.alerts.map((alert) => (
            <article
              key={alert.id}
              className="rounded-xl border border-slate-800 bg-slate-950/50 p-5"
            >
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-white">{alert.title}</h3>
                    <Pill tone={alert.importance === 'High' ? 'danger' : 'warning'}>
                      {alert.importance}
                    </Pill>
                  </div>

                  <p className="mt-2 text-xs text-slate-500">
                    {alert.source} · {alert.date}
                  </p>
                </div>

                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-sm text-indigo-300 hover:text-indigo-200"
                >
                  Open insight
                  <ExternalLink size={14} />
                </button>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">Potential impact</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{alert.impact}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Recommended response
                  </p>
                  <p className="mt-2 text-sm leading-6 text-cyan-300">{alert.recommendation}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default MonitoringPage;