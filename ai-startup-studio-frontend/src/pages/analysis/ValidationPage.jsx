// import { useQuery } from '@tanstack/react-query';
// import { AlertTriangle, CheckCircle2, CircleDashed } from 'lucide-react';
// import AnalysisHeader from '@/components/analysis/AnalysisHeader.jsx';
// import TrustLabel from '@/components/analysis/TrustLabel.jsx';
// import { getValidationData } from '@/services/analysisService.js';

// function ValidationPage() {
//   const { data, isLoading } = useQuery({
//     queryKey: ['validation'],
//     queryFn: getValidationData
//   });

//   if (isLoading) {
//     return <div className="h-96 animate-pulse rounded-2xl bg-slate-900" />;
//   }

//   return (
//     <div className="mx-auto max-w-7xl space-y-8">
//       <AnalysisHeader
//         eyebrow="Analyze"
//         title="Problem validation"
//         description="Track the assumptions behind your problem statement and identify which claims still need evidence."
//         action={<TrustLabel tone="warning">Needs validation</TrustLabel>}
//       />

//       <section className="grid gap-4 md:grid-cols-3">
//         <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
//           <p className="text-sm text-slate-500">Validation score</p>
//           <p className="mt-2 text-4xl font-semibold text-amber-300">{data.score}/100</p>
//           <p className="mt-2 text-sm text-slate-400">Evidence is still incomplete.</p>
//         </div>

//         <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
//           <p className="text-sm text-slate-500">Hypotheses</p>
//           <p className="mt-2 text-4xl font-semibold text-white">{data.hypotheses.length}</p>
//           <p className="mt-2 text-sm text-slate-400">Claims currently being evaluated.</p>
//         </div>

//         <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
//           <p className="text-sm text-slate-500">Evidence items</p>
//           <p className="mt-2 text-4xl font-semibold text-white">{data.evidence.length}</p>
//           <p className="mt-2 text-sm text-slate-400">User and research evidence.</p>
//         </div>
//       </section>

//       <section className="grid gap-6 lg:grid-cols-2">
//         <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
//           <h2 className="text-xl font-semibold text-white">Validation hypotheses</h2>

//           <div className="mt-5 space-y-3">
//             {data.hypotheses.map((hypothesis) => (
//               <div key={hypothesis.id} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
//                 <div className="flex items-start justify-between gap-3">
//                   <h3 className="font-medium text-white">{hypothesis.title}</h3>
//                   <TrustLabel tone={hypothesis.confidence === 'Low' ? 'warning' : 'calculated'}>
//                     {hypothesis.status}
//                   </TrustLabel>
//                 </div>
//                 <p className="mt-2 text-sm leading-6 text-slate-400">{hypothesis.description}</p>
//                 <p className="mt-3 text-xs text-slate-500">Confidence: {hypothesis.confidence}</p>
//               </div>
//             ))}
//           </div>
//         </article>

//         <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
//           <h2 className="text-xl font-semibold text-white">Validation checklist</h2>

//           <div className="mt-5 space-y-4">
//             {data.checklist.map((item) => (
//               <div key={item.label} className="flex items-center gap-3 text-sm">
//                 {item.completed ? (
//                   <CheckCircle2 className="text-emerald-400" size={18} />
//                 ) : (
//                   <CircleDashed className="text-amber-300" size={18} />
//                 )}
//                 <span className={item.completed ? 'text-slate-300' : 'text-slate-400'}>
//                   {item.label}
//                 </span>
//               </div>
//             ))}
//           </div>

//           <h2 className="mt-8 text-xl font-semibold text-white">Evidence</h2>

//           <div className="mt-4 space-y-3">
//             {data.evidence.map((item) => (
//               <div key={item.id} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
//                 <div className="flex items-center gap-2">
//                   <AlertTriangle className="text-cyan-300" size={16} />
//                   <p className="text-sm font-medium text-white">{item.source}</p>
//                 </div>
//                 <p className="mt-2 text-sm leading-6 text-slate-400">{item.detail}</p>
//                 <p className="mt-2 text-xs text-slate-500">{item.status}</p>
//               </div>
//             ))}
//           </div>
//         </article>
//       </section>
//     </div>
//   );
// }

// export default ValidationPage;


import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  AlertTriangle,
  CheckCircle2,
  CircleDashed
} from 'lucide-react';
import { useParams } from 'react-router-dom';

import AnalysisHeader from '@/components/analysis/AnalysisHeader.jsx';
import TrustLabel from '@/components/analysis/TrustLabel.jsx';
import { getValidationData } from '@/services/analysisService.js';
import { useAnalysisStore } from '@/store/analysisStore.js';

function ValidationPage() {
  const { startupId } = useParams();

  const {
    data,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['validation', startupId],
    queryFn: () => getValidationData(startupId),
    enabled: Boolean(startupId),
    staleTime: 5 * 60 * 1000
  });

  const storedChecklist = useAnalysisStore(
    (state) => state.validationByStartup[startupId]
  );

  const initializeValidation = useAnalysisStore(
    (state) => state.initializeValidation
  );

  const toggleValidationItem = useAnalysisStore(
    (state) => state.toggleValidationItem
  );

  useEffect(() => {
    if (data?.checklist && !storedChecklist) {
      initializeValidation(startupId, data.checklist);
    }
  }, [
    data,
    startupId,
    storedChecklist,
    initializeValidation
  ]);

  const checklist = storedChecklist || data?.checklist || [];

  const completedCount = useMemo(
    () => checklist.filter((item) => item.completed).length,
    [checklist]
  );

  const completionPercentage = useMemo(() => {
    if (!checklist.length) {
      return 0;
    }

    return Math.round((completedCount / checklist.length) * 100);
  }, [checklist.length, completedCount]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-32 animate-pulse rounded-2xl bg-slate-900" />
        <div className="h-96 animate-pulse rounded-2xl bg-slate-900" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-6">
        <h1 className="text-lg font-semibold text-rose-200">
          Validation data unavailable
        </h1>
        <p className="mt-2 text-sm text-rose-300/80">
          We could not load the validation workspace.
        </p>

        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 rounded-lg bg-rose-500 px-4 py-2 text-sm font-medium text-white hover:bg-rose-400"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <AnalysisHeader
        eyebrow="Analyze"
        title="Problem validation"
        description="Track the assumptions behind your problem statement and identify which claims still need evidence."
        action={<TrustLabel tone="warning">Needs validation</TrustLabel>}
      />

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-500">Validation score</p>
          <p className="mt-2 text-4xl font-semibold text-amber-300">
            {data.score}/100
          </p>
          <p className="mt-2 text-sm text-slate-400">
            This is an estimate, not a prediction.
          </p>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-500">Checklist progress</p>
          <p className="mt-2 text-4xl font-semibold text-white">
            {completionPercentage}%
          </p>
          <p className="mt-2 text-sm text-slate-400">
            {completedCount} of {checklist.length} actions completed.
          </p>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-500">Evidence items</p>
          <p className="mt-2 text-4xl font-semibold text-white">
            {data.evidence.length}
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Evidence connected to this hypothesis.
          </p>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-xl font-semibold text-white">
            Validation hypotheses
          </h2>

          <div className="mt-5 space-y-3">
            {data.hypotheses.map((hypothesis) => (
              <div
                key={hypothesis.id}
                className="rounded-xl border border-slate-800 bg-slate-950/50 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-medium text-white">
                    {hypothesis.title}
                  </h3>

                  <TrustLabel
                    tone={
                      hypothesis.confidence === 'Low'
                        ? 'warning'
                        : 'calculated'
                    }
                  >
                    {hypothesis.status}
                  </TrustLabel>
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {hypothesis.description}
                </p>

                <p className="mt-3 text-xs text-slate-500">
                  Confidence: {hypothesis.confidence}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-xl font-semibold text-white">
            Validation checklist
          </h2>

          <div className="mt-5 space-y-3">
            {checklist.map((item, index) => (
              <button
                key={`${item.label}-${index}`}
                type="button"
                onClick={() => toggleValidationItem(startupId, index)}
                className="flex w-full items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-left transition hover:border-indigo-500/40"
              >
                {item.completed ? (
                  <CheckCircle2
                    className="shrink-0 text-emerald-400"
                    size={18}
                  />
                ) : (
                  <CircleDashed
                    className="shrink-0 text-amber-300"
                    size={18}
                  />
                )}

                <span
                  className={
                    item.completed ? 'text-slate-300' : 'text-slate-400'
                  }
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          <h2 className="mt-8 text-xl font-semibold text-white">
            Evidence
          </h2>

          <div className="mt-4 space-y-3">
            {data.evidence.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-800 bg-slate-950/50 p-4"
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle className="text-cyan-300" size={16} />
                  <p className="text-sm font-medium text-white">
                    {item.source}
                  </p>
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {item.detail}
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  {item.status}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

export default ValidationPage;