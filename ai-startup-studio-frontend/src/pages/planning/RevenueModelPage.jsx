import { useQuery } from '@tanstack/react-query';
import { ChartColumnBig, DollarSign } from 'lucide-react';
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import SectionHeader from '@/components/planning/SectionHeader.jsx';
import Pill from '@/components/planning/Pill.jsx';
import { getRevenueData } from '@/services/planningService.js';

function RevenueModelPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['revenue-model'],
    queryFn: getRevenueData
  });

  if (isLoading) {
    return <div className="h-96 animate-pulse rounded-2xl bg-slate-900" />;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <SectionHeader
        eyebrow="Plan"
        title="Revenue model"
        description="Explore the monetization plan, core assumptions, and expected revenue configuration for the startup."
        action={
          <Pill tone="success">
            <DollarSign size={13} className="mr-1 inline" />
            Pricing strategy
          </Pill>
        }
      />

      <section className="grid gap-4 md:grid-cols-3">
        {data.models.map((model) => (
          <article key={model.id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <h2 className="text-xl font-semibold text-white">{model.name}</h2>
            <p className="mt-2 text-sm text-slate-400">{model.description}</p>

            <div className="mt-4 space-y-2">
              <p className="text-sm text-slate-500">Pricing</p>
              <p className="text-xl font-semibold text-indigo-300">{model.pricing}</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-slate-950/50 p-3">
                <p className="text-xs text-slate-500">Customers</p>
                <p className="mt-1 text-slate-200">{model.customers}</p>
              </div>

              <div className="rounded-xl bg-slate-950/50 p-3">
                <p className="text-xs text-slate-500">Conversion</p>
                <p className="mt-1 text-slate-200">{model.conversion}%</p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/50 p-3">
              <p className="text-xs text-slate-500">Projected annual revenue</p>
              <p className="mt-2 text-lg font-semibold text-white">${model.revenue.toLocaleString()}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <div className="flex items-center gap-2">
            <ChartColumnBig size={18} className="text-cyan-300" />
            <h2 className="text-xl font-semibold text-white">Revenue comparison</h2>
          </div>

          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.models}>
                <CartesianGrid stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    background: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: 12
                  }}
                />
                <Bar dataKey="revenue" fill="#818cf8" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-xl font-semibold text-white">Key assumptions</h2>

          <div className="mt-5 space-y-4">
            {data.assumptions.map((assumption) => (
              <div key={assumption.label} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                <p className="text-sm text-slate-500">{assumption.label}</p>
                <p className="mt-2 text-lg font-semibold text-white">{assumption.value}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

export default RevenueModelPage;