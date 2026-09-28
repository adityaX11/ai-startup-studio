import { useQuery } from '@tanstack/react-query';
import AnalysisHeader from '@/components/analysis/AnalysisHeader.jsx';
import TrustLabel from '@/components/analysis/TrustLabel.jsx';
import { getPersonas } from '@/services/analysisService.js';

function CustomerAnalysisPage() {
  const { data = [], isLoading } = useQuery({
    queryKey: ['personas'],
    queryFn: getPersonas
  });

  if (isLoading) {
    return <div className="h-96 animate-pulse rounded-2xl bg-slate-900" />;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <AnalysisHeader
        eyebrow="Analyze"
        title="Customer analysis"
        description="Understand the people most likely to experience the problem, adopt the solution, and pay for it."
        action={<TrustLabel tone="ai">AI-assisted personas</TrustLabel>}
      />

      <section className="grid gap-5 xl:grid-cols-3">
        {data.map((persona) => (
          <article key={persona.id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-white">{persona.name}</h2>
                <p className="mt-1 text-sm text-cyan-300">{persona.segment}</p>
              </div>
              <TrustLabel tone="ai">AI-generated</TrustLabel>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Goals</p>
                <ul className="mt-2 space-y-1 text-sm text-slate-300">
                  {persona.goals.map((item) => <li key={item}>• {item}</li>)}
                </ul>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Pain points</p>
                <ul className="mt-2 space-y-1 text-sm text-rose-300">
                  {persona.painPoints.map((item) => <li key={item}>• {item}</li>)}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-slate-950/60 p-3">
                  <p className="text-xs text-slate-500">Budget</p>
                  <p className="mt-1 text-slate-200">{persona.budget}</p>
                </div>
                <div className="rounded-xl bg-slate-950/60 p-3">
                  <p className="text-xs text-slate-500">Motivation</p>
                  <p className="mt-1 text-slate-200">{persona.motivation}</p>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Objections</p>
                <ul className="mt-2 space-y-1 text-sm text-amber-300">
                  {persona.objections.map((item) => <li key={item}>• {item}</li>)}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default CustomerAnalysisPage;