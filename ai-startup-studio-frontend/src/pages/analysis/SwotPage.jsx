import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Trash2 } from 'lucide-react';
import { useParams } from 'react-router-dom';

import AnalysisHeader from '@/components/analysis/AnalysisHeader.jsx';
import TrustLabel from '@/components/analysis/TrustLabel.jsx';
import { getSwotData } from '@/services/analysisService.js';
import { useAnalysisStore } from '@/store/analysisStore.js';

const sections = [
  {
    key: 'strengths',
    title: 'Strengths',
    tone: 'border-emerald-500/20 bg-emerald-500/10'
  },
  {
    key: 'weaknesses',
    title: 'Weaknesses',
    tone: 'border-rose-500/20 bg-rose-500/10'
  },
  {
    key: 'opportunities',
    title: 'Opportunities',
    tone: 'border-cyan-500/20 bg-cyan-500/10'
  },
  {
    key: 'threats',
    title: 'Threats',
    tone: 'border-amber-500/20 bg-amber-500/10'
  }
];

function SwotPage() {
  const { startupId } = useParams();
  const [drafts, setDrafts] = useState({
    strengths: '',
    weaknesses: '',
    opportunities: '',
    threats: ''
  });

  const {
    data,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['swot', startupId],
    queryFn: () => getSwotData(startupId),
    enabled: Boolean(startupId),
    staleTime: 5 * 60 * 1000
  });

  const storedSwot = useAnalysisStore(
    (state) => state.swotByStartup[startupId]
  );

  const initializeSwot = useAnalysisStore(
    (state) => state.initializeSwot
  );

  const addSwotItem = useAnalysisStore(
    (state) => state.addSwotItem
  );

  const removeSwotItem = useAnalysisStore(
    (state) => state.removeSwotItem
  );

  const updateSwotItem = useAnalysisStore(
    (state) => state.updateSwotItem
  );

  useEffect(() => {
    if (data && !storedSwot) {
      initializeSwot(startupId, data);
    }
  }, [
    data,
    startupId,
    storedSwot,
    initializeSwot
  ]);

  const swot = storedSwot || data;

  function updateDraft(section, value) {
    setDrafts((current) => ({
      ...current,
      [section]: value
    }));
  }

  function addItem(section) {
    const value = drafts[section].trim();

    if (!value) {
      return;
    }

    addSwotItem(startupId, section, value);

    setDrafts((current) => ({
      ...current,
      [section]: ''
    }));
  }

  function handleDraftKeyDown(event, section) {
    if (event.key === 'Enter') {
      event.preventDefault();
      addItem(section);
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-32 animate-pulse rounded-2xl bg-slate-900" />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="h-64 animate-pulse rounded-2xl bg-slate-900" />
          <div className="h-64 animate-pulse rounded-2xl bg-slate-900" />
        </div>
      </div>
    );
  }

  if (isError || !swot) {
    return (
      <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-6">
        <h1 className="text-lg font-semibold text-rose-200">
          SWOT data unavailable
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
        title="SWOT analysis"
        description="Organize internal and external factors that influence startup strategy and execution."
        action={<TrustLabel tone="ai">AI suggestions available</TrustLabel>}
      />

      <section className="grid gap-5 md:grid-cols-2">
        {sections.map((section) => {
          const items = swot[section.key] || [];

          return (
            <article
              key={section.key}
              className={`rounded-2xl border p-5 ${section.tone}`}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {section.title}
                  </h2>
                  <p className="mt-1 text-xs text-slate-400">
                    {items.length} item{items.length === 1 ? '' : 's'}
                  </p>
                </div>

                <TrustLabel tone="ai">AI-assisted</TrustLabel>
              </div>

              <div className="mt-5 flex gap-2">
                <input
                  value={drafts[section.key]}
                  onChange={(event) =>
                    updateDraft(section.key, event.target.value)
                  }
                  onKeyDown={(event) =>
                    handleDraftKeyDown(event, section.key)
                  }
                  placeholder={`Add ${section.title.toLowerCase()} item`}
                  className="min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 focus:border-indigo-400"
                />

                <button
                  type="button"
                  onClick={() => addItem(section.key)}
                  className="rounded-xl bg-slate-950/70 px-3 text-slate-300 hover:bg-slate-950"
                  aria-label={`Add ${section.title} item`}
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="mt-5 space-y-3">
                {items.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-white/10 p-4 text-sm text-slate-500">
                    No items added yet.
                  </p>
                ) : (
                  items.map((item, index) => (
                    <div
                      key={`${section.key}-${index}-${item}`}
                      className="flex items-start gap-3 rounded-xl border border-white/5 bg-slate-950/40 p-3"
                    >
                      <input
                        value={item}
                        onChange={(event) =>
                          updateSwotItem(
                            startupId,
                            section.key,
                            index,
                            event.target.value
                          )
                        }
                        className="min-w-0 flex-1 bg-transparent text-sm leading-6 text-slate-300 outline-none"
                        aria-label={`${section.title} item ${index + 1}`}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeSwotItem(startupId, section.key, index)
                        }
                        className="shrink-0 text-slate-500 hover:text-rose-300"
                        aria-label={`Remove ${item}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </article>
          );
        })}
      </section>

      <section className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-5">
        <TrustLabel tone="ai">AI-generated summary</TrustLabel>

        <h2 className="mt-4 text-xl font-semibold text-white">
          Strategic interpretation
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
          LaunchMate has a strong opportunity to differentiate through
          structured execution workflows. However, the initial product should
          focus on a narrow founder segment and validate demand before adding
          continuous monitoring or advanced intelligence.
        </p>
      </section>
    </div>
  );
}

export default SwotPage;