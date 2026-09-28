import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useParams } from 'react-router-dom';

import AnalysisHeader from '@/components/analysis/AnalysisHeader.jsx';
import CompetitorForm from '@/components/analysis/CompetitorForm.jsx';
import TrustLabel from '@/components/analysis/TrustLabel.jsx';
import { getCompetitors } from '@/services/analysisService.js';
import { useAnalysisStore } from '@/store/analysisStore.js';

function CompetitorAnalysisPage() {
  const { startupId } = useParams();
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const {
    data = [],
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['competitors', startupId],
    queryFn: () => getCompetitors(startupId),
    enabled: Boolean(startupId),
    staleTime: 5 * 60 * 1000
  });

  const storedCompetitors = useAnalysisStore(
    (state) => state.competitorsByStartup[startupId]
  );

  const initializeCompetitors = useAnalysisStore(
    (state) => state.initializeCompetitors
  );

  const addCompetitor = useAnalysisStore(
    (state) => state.addCompetitor
  );

  const updateCompetitor = useAnalysisStore(
    (state) => state.updateCompetitor
  );

  const removeCompetitor = useAnalysisStore(
    (state) => state.removeCompetitor
  );

  useEffect(() => {
    if (data.length && !storedCompetitors) {
      initializeCompetitors(startupId, data);
    }
  }, [
    data,
    startupId,
    storedCompetitors,
    initializeCompetitors
  ]);

  const displayedCompetitors = useMemo(
    () => storedCompetitors || data,
    [storedCompetitors, data]
  );

  const editingCompetitor = useMemo(
    () =>
      displayedCompetitors.find(
        (competitor) => competitor.id === editingId
      ) || null,
    [displayedCompetitors, editingId]
  );

  function openCreateForm() {
    setEditingId(null);
    setShowForm(true);
  }

  function openEditForm(competitorId) {
    setEditingId(competitorId);
    setShowForm(true);
  }

  function handleSave(values) {
    if (editingId) {
      updateCompetitor(startupId, editingId, values);
    } else {
      addCompetitor(startupId, {
        id: `competitor-${Date.now()}`,
        ...values,
        strengths: ['Add strength'],
        weaknesses: ['Add weakness'],
        score: 60
      });
    }

    setEditingId(null);
    setShowForm(false);
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-32 animate-pulse rounded-2xl bg-slate-900" />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-56 animate-pulse rounded-2xl bg-slate-900" />
          <div className="h-56 animate-pulse rounded-2xl bg-slate-900" />
          <div className="h-56 animate-pulse rounded-2xl bg-slate-900" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-6">
        <h1 className="text-lg font-semibold text-rose-200">
          Competitor data unavailable
        </h1>

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
        title="Competitor analysis"
        description="Compare competitors, identify market gaps, and document your differentiation strategy."
        action={
          <button
            type="button"
            onClick={openCreateForm}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-400"
          >
            <Plus size={16} />
            Add competitor
          </button>
        }
      />

      {showForm ? (
        <CompetitorForm
          key={editingId || 'new-competitor'}
          initialValues={editingCompetitor}
          onSubmit={handleSave}
          onCancel={() => {
            setEditingId(null);
            setShowForm(false);
          }}
        />
      ) : null}

      {displayedCompetitors.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 p-10 text-center">
          <h2 className="text-lg font-semibold text-white">
            No competitors added
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Add your first competitor to begin the comparison.
          </p>

          <button
            type="button"
            onClick={openCreateForm}
            className="mt-5 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white"
          >
            Add competitor
          </button>
        </div>
      ) : (
        <>
          <section className="grid gap-4 md:grid-cols-3">
            {displayedCompetitors.map((competitor) => (
              <article
                key={competitor.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition hover:border-indigo-500/30"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {competitor.name}
                    </h2>
                    <p className="mt-1 text-sm text-cyan-300">
                      {competitor.website}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => openEditForm(competitor.id)}
                      className="rounded-lg p-2 text-slate-500 hover:bg-slate-800 hover:text-white"
                      aria-label={`Edit ${competitor.name}`}
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        removeCompetitor(startupId, competitor.id)
                      }
                      className="rounded-lg p-2 text-slate-500 hover:bg-rose-500/10 hover:text-rose-300"
                      aria-label={`Remove ${competitor.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-500">Pricing</span>
                    <span className="text-slate-300">
                      {competitor.pricing}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-500">Target</span>
                    <span className="text-right text-slate-300">
                      {competitor.targetCustomer}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-500">Positioning</span>
                    <span className="text-right text-slate-300">
                      {competitor.positioning}
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4">
                  <TrustLabel tone="research">
                    Research profile
                  </TrustLabel>

                  <span className="text-sm font-semibold text-amber-300">
                    {competitor.score}/100
                  </span>
                </div>
              </article>
            ))}
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Comparison matrix
                </p>
                <h2 className="mt-1 text-xl font-semibold text-white">
                  Competitive landscape
                </h2>
              </div>

              <TrustLabel tone="calculated">
                Founder comparison
              </TrustLabel>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="border-b border-slate-800 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-3 py-3">Competitor</th>
                    <th className="px-3 py-3">Pricing</th>
                    <th className="px-3 py-3">Target customer</th>
                    <th className="px-3 py-3">Strengths</th>
                    <th className="px-3 py-3">Weaknesses</th>
                  </tr>
                </thead>

                <tbody>
                  {displayedCompetitors.map((competitor) => (
                    <tr
                      key={competitor.id}
                      className="border-b border-slate-800/70 align-top"
                    >
                      <td className="px-3 py-4 font-medium text-white">
                        {competitor.name}
                      </td>

                      <td className="px-3 py-4 text-slate-400">
                        {competitor.pricing}
                      </td>

                      <td className="px-3 py-4 text-slate-400">
                        {competitor.targetCustomer}
                      </td>

                      <td className="px-3 py-4 text-emerald-300">
                        {(competitor.strengths || []).join(', ')}
                      </td>

                      <td className="px-3 py-4 text-rose-300">
                        {(competitor.weaknesses || []).join(', ')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default CompetitorAnalysisPage;