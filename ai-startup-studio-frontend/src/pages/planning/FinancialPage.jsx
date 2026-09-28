import { useQuery } from '@tanstack/react-query';
import { BarChart3, TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import SectionHeader from '@/components/planning/SectionHeader.jsx';
import Pill from '@/components/planning/Pill.jsx';
import { getFinancialData } from '@/services/planningService.js';

function FinancialPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['financial-data'],
    queryFn: getFinancialData
  });

  if (isLoading) {
    return <div className="h-96 animate-pulse rounded-2xl bg-slate-900" />;
  }

  const scenarioData = [
    { name: 'Conservative', revenue: data.scenarios.conservative.revenue, profit: data.scenarios.conservative.profit },
    { name: 'Expected', revenue: data.scenarios.expected.revenue, profit: data.scenarios.expected.profit },
    { name: 'Optimistic', revenue: data.scenarios.optimistic.revenue, profit: data.scenarios.optimistic.profit }
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <SectionHeader
        eyebrow="Plan"
        title="Financial estimation"
        description="Model your revenue, costs, burn, runway, and break-even numbers under different startup scenarios."
        action={
          <Pill tone="warning">
            <TrendingUp size={13} className="mr-1 inline" />
            Scenario planning
          </Pill>
        }
      />

      <section className="grid gap-4 md:grid-cols-4">
        {data.metrics.map((metric) => (
          <div key={metric.label} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-500">{metric.label}</p>
            <p className="mt-2 text-xl font-semibold text-white">{metric.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <div className="flex items-center gap-2">
            <BarChart3 size={18} className="text-indigo-300" />
            <h2 className="text-xl font-semibold text-white">Scenario revenue</h2>
          </div>

          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scenarioData}>
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
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-emerald-300" />
            <h2 className="text-xl font-semibold text-white">Profit comparison</h2>
          </div>

          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scenarioData}>
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
                <Line type="monotone" dataKey="profit" stroke="#34d399" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {Object.entries(data.scenarios).map(([key, scenario]) => (
          <article key={key} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <h2 className="text-lg font-semibold capitalize text-white">{key}</h2>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Customers</span>
                <span className="text-slate-300">{scenario.customers}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Price</span>
                <span className="text-slate-300">${scenario.price}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Revenue</span>
                <span className="text-slate-300">${scenario.revenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Profit</span>
                <span className="text-slate-300">${scenario.profit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Runway</span>
                <span className="text-slate-300">{scenario.runway} months</span>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default FinancialPage;