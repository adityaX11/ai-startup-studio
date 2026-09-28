import { useQuery } from '@tanstack/react-query';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import AnalysisHeader from '@/components/analysis/AnalysisHeader.jsx';
import TrustLabel from '@/components/analysis/TrustLabel.jsx';
import { getMarketData } from '@/services/analysisService.js';

function MarketResearchPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['market-research'],
    queryFn: getMarketData
  });

  if (isLoading) {
    return <div className="h-96 animate-pulse rounded-2xl bg-slate-900" />;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <AnalysisHeader
        eyebrow="Analyze"
        title="Market research"
        description="Explore market size, growth signals, customer segments, and research sources. Estimates are not guarantees."
        action={<TrustLabel tone="research">Research data</TrustLabel>}
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {[
          ['Industry', data.overview.industry],
          ['TAM', data.overview.tam],
          ['SAM', data.overview.sam],
          ['SOM', data.overview.som],
          ['Growth', data.overview.growth]
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-3 text-xl font-semibold text-white">{value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">Market signal</p>
              <h2 className="mt-1 text-xl font-semibold text-white">Interest and growth trend</h2>
            </div>
            <TrustLabel tone="calculated">Estimated</TrustLabel>
          </div>

          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.trends}>
                <defs>
                  <linearGradient id="interestGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    background: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: 12
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="interest"
                  stroke="#818cf8"
                  fill="url(#interestGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-500">Customer segments</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Potential audience mix</h2>

          <div className="mt-6 space-y-5">
            {data.segments.map((segment) => (
              <div key={segment.name}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-slate-300">{segment.name}</span>
                  <span className="text-slate-500">{segment.value}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500"
                    style={{ width: `${segment.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Source transparency</p>
            <h2 className="mt-1 text-xl font-semibold text-white">Research sources</h2>
          </div>
          <span className="text-xs text-slate-500">Last updated: {data.overview.updated}</span>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="border-b border-slate-800 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-3 py-3">Source</th>
                <th className="px-3 py-3">Type</th>
                <th className="px-3 py-3">Date</th>
                <th className="px-3 py-3">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {data.sources.map((source) => (
                <tr key={source.name} className="border-b border-slate-800/70">
                  <td className="px-3 py-4 text-slate-200">{source.name}</td>
                  <td className="px-3 py-4">
                    <TrustLabel tone={source.type === 'Research data' ? 'research' : 'ai'}>
                      {source.type}
                    </TrustLabel>
                  </td>
                  <td className="px-3 py-4 text-slate-400">{source.date}</td>
                  <td className="px-3 py-4 text-slate-400">{source.confidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default MarketResearchPage;