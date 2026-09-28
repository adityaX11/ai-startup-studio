import { useQuery } from '@tanstack/react-query';
import { Megaphone, Target } from 'lucide-react';

import SectionHeader from '@/components/planning/SectionHeader.jsx';
import Pill from '@/components/planning/Pill.jsx';
import { getGtmData } from '@/services/executionService.js';

function GtmPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['gtm-strategy'],
    queryFn: getGtmData,
    staleTime: 5 * 60 * 1000
  });

  if (isLoading) {
    return <div className="h-96 animate-pulse rounded-2xl bg-slate-900" />;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <SectionHeader
        eyebrow="Launch"
        title="Go-to-market strategy"
        description="Define your target market, positioning, acquisition channels, launch plan, and measurable growth signals."
        action={
          <Pill tone="info">
            <Megaphone size={13} className="mr-1 inline" />
            Launch planning
          </Pill>
        }
      />

      <section className="grid gap-4 md:grid-cols-4">
        {data.kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
          >
            <p className="text-sm text-slate-500">{kpi.label}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{kpi.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <div className="flex items-center gap-2">
            <Target size={18} className="text-cyan-300" />
            <h2 className="text-xl font-semibold text-white">Target market</h2>
          </div>

          <p className="mt-4 text-sm leading-7 text-slate-300">
            {data.targetMarket}
          </p>

          <h3 className="mt-6 text-sm font-semibold text-white">Positioning</h3>
          <p className="mt-2 text-sm leading-7 text-slate-400">
            {data.positioning}
          </p>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-xl font-semibold text-white">Core messaging</h2>

          <div className="mt-4 space-y-3">
            {data.messaging.map((message) => (
              <div
                key={message}
                className="rounded-xl border border-slate-800 bg-slate-950/50 p-3 text-sm text-slate-300"
              >
                {message}
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <p className="text-sm text-slate-500">Acquisition planning</p>
        <h2 className="mt-1 text-xl font-semibold text-white">Recommended channels</h2>

        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {data.channels.map((channel) => (
            <article
              key={channel.id}
              className="rounded-xl border border-slate-800 bg-slate-950/50 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-medium text-white">{channel.name}</h3>
                <Pill tone={channel.status === 'Recommended' ? 'success' : 'default'}>
                  {channel.status}
                </Pill>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                {channel.purpose}
              </p>

              <div className="mt-4 flex justify-between text-xs">
                <span className="text-slate-500">Effort: {channel.effort}</span>
                <span className="text-cyan-300">Impact: {channel.expectedImpact}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-5">
        <Pill tone="info">Launch sequence</Pill>
        <h2 className="mt-4 text-xl font-semibold text-white">Initial launch plan</h2>

        <ol className="mt-4 space-y-3">
          {data.launchStrategy.map((step, index) => (
            <li key={step} className="flex gap-3 text-sm text-slate-300">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-xs text-indigo-300">
                {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

export default GtmPage;