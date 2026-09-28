import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  AlertTriangle,
  Pencil,
  Plus,
  Search,
  Trash2,
  X
} from 'lucide-react';
import { useParams } from 'react-router-dom';

import SectionHeader from '@/components/planning/SectionHeader.jsx';
import Pill from '@/components/planning/Pill.jsx';
import { getRisksData } from '@/services/executionService.js';

const emptyRisk = {
  title: '',
  category: 'Product',
  probability: 'Medium',
  impact: 'Medium',
  severity: 'Medium',
  mitigation: '',
  status: 'Open'
};

const categories = [
  'Market',
  'Product',
  'Technology',
  'Financial',
  'Legal',
  'Competition',
  'Operational',
  'AI / Data'
];

const statuses = ['Open', 'Monitoring', 'Mitigated', 'Accepted'];
const severities = ['Low', 'Medium', 'High', 'Critical'];

function getSeverityTone(severity) {
  if (severity === 'Critical') return 'danger';
  if (severity === 'High') return 'warning';
  if (severity === 'Medium') return 'info';
  return 'success';
}

function getStorageKey(startupId) {
  return `ai-startup-studio-risks-${startupId}`;
}

function RiskForm({ initialValues, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialValues || emptyRisk);


  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim() || !form.mitigation.trim()) {
      return;
    }

    onSubmit({
      ...form,
      title: form.title.trim(),
      mitigation: form.mitigation.trim()
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-indigo-500/30 bg-indigo-500/5 p-5"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-indigo-300">Risk editor</p>
          <h2 className="mt-1 text-xl font-semibold text-white">
            {initialValues ? 'Edit risk' : 'Add risk'}
          </h2>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
          aria-label="Close risk form"
        >
          <X size={18} />
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="md:col-span-2">
          <span className="mb-2 block text-sm font-medium text-slate-300">
            Risk title
          </span>
          <input
            value={form.title}
            onChange={(event) => updateField('title', event.target.value)}
            placeholder="Example: AI research may contain incorrect claims"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-indigo-400"
            required
          />
        </label>

        <label>
          <span className="mb-2 block text-sm font-medium text-slate-300">
            Category
          </span>
          <select
            value={form.category}
            onChange={(event) => updateField('category', event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white outline-none focus:border-indigo-400"
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>

        <label>
          <span className="mb-2 block text-sm font-medium text-slate-300">
            Status
          </span>
          <select
            value={form.status}
            onChange={(event) => updateField('status', event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white outline-none focus:border-indigo-400"
          >
            {statuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </label>

        <label>
          <span className="mb-2 block text-sm font-medium text-slate-300">
            Probability
          </span>
          <select
            value={form.probability}
            onChange={(event) => updateField('probability', event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white outline-none focus:border-indigo-400"
          >
            {['Low', 'Medium', 'High'].map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>

        <label>
          <span className="mb-2 block text-sm font-medium text-slate-300">
            Impact
          </span>
          <select
            value={form.impact}
            onChange={(event) => updateField('impact', event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white outline-none focus:border-indigo-400"
          >
            {['Low', 'Medium', 'High'].map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>

        <label>
          <span className="mb-2 block text-sm font-medium text-slate-300">
            Severity
          </span>
          <select
            value={form.severity}
            onChange={(event) => updateField('severity', event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white outline-none focus:border-indigo-400"
          >
            {severities.map((severity) => (
              <option key={severity}>{severity}</option>
            ))}
          </select>
        </label>

        <label className="md:col-span-2">
          <span className="mb-2 block text-sm font-medium text-slate-300">
            Mitigation plan
          </span>
          <textarea
            value={form.mitigation}
            onChange={(event) => updateField('mitigation', event.target.value)}
            rows={4}
            placeholder="Explain how this risk will be reduced or monitored."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm leading-6 text-white outline-none placeholder:text-slate-500 focus:border-indigo-400"
            required
          />
        </label>
      </div>

      <div className="mt-5 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400"
        >
          Save risk
        </button>
      </div>
    </form>
  );
}

function RisksPage() {
  const { startupId = 'default-startup' } = useParams();

  const { data = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['startup-risks', startupId],
    queryFn: getRisksData,
    staleTime: 5 * 60 * 1000
  });

  const [risks, setRisks] = useState([]);
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingRisk, setEditingRisk] = useState(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const storedRisks = window.localStorage.getItem(getStorageKey(startupId));

        if (storedRisks) {
            try {
            // External-storage hydration is intentionally performed here.
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setRisks(JSON.parse(storedRisks));
            } catch {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setRisks(data);
            }
        } else if (data.length) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setRisks(data);
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHasLoadedStorage(true);
    }, [startupId, data]);

  useEffect(() => {
    if (!hasLoadedStorage || typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(
      getStorageKey(startupId),
      JSON.stringify(risks)
    );
  }, [startupId, risks, hasLoadedStorage]);

  const filteredRisks = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    return risks.filter((risk) => {
      const matchesSearch =
        !normalizedSearch ||
        `${risk.title} ${risk.category} ${risk.mitigation}`
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesCategory =
        categoryFilter === 'All' || risk.category === categoryFilter;

      const matchesSeverity =
        severityFilter === 'All' || risk.severity === severityFilter;

      const matchesStatus =
        statusFilter === 'All' || risk.status === statusFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSeverity &&
        matchesStatus
      );
    });
  }, [risks, search, categoryFilter, severityFilter, statusFilter]);

  const summary = useMemo(
    () => ({
      critical: risks.filter((risk) => risk.severity === 'Critical').length,
      high: risks.filter((risk) => risk.severity === 'High').length,
      open: risks.filter((risk) => risk.status === 'Open').length,
      mitigated: risks.filter((risk) => risk.status === 'Mitigated').length
    }),
    [risks]
  );

  if (isLoading && !risks.length) {
    return (
      <div className="space-y-4">
        <div className="h-32 animate-pulse rounded-2xl bg-slate-900" />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-28 animate-pulse rounded-2xl bg-slate-900" />
          <div className="h-28 animate-pulse rounded-2xl bg-slate-900" />
          <div className="h-28 animate-pulse rounded-2xl bg-slate-900" />
        </div>
      </div>
    );
  }

  if (isError && !risks.length) {
    return (
      <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-6">
        <h1 className="text-lg font-semibold text-rose-200">
          Risk data unavailable
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

  function saveRisk(values) {
    if (editingRisk) {
      setRisks((current) =>
        current.map((risk) =>
          risk.id === editingRisk.id
            ? { ...risk, ...values }
            : risk
        )
      );
    } else {
      setRisks((current) => [
        ...current,
        {
          id: `risk-${Date.now()}`,
          ...values
        }
      ]);
    }

    setEditingRisk(null);
    setShowForm(false);
  }

  function deleteRisk(riskId) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this risk?'
    );

    if (!confirmed) {
      return;
    }

    setRisks((current) => current.filter((risk) => risk.id !== riskId));
  }

  function updateRiskStatus(riskId, status) {
    setRisks((current) =>
      current.map((risk) =>
        risk.id === riskId ? { ...risk, status } : risk
      )
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <SectionHeader
        eyebrow="Launch"
        title="Risk analysis"
        description="Track uncertainty across product, market, technology, financial, legal, and operational areas."
        action={
          <button
            type="button"
            onClick={() => {
              setEditingRisk(null);
              setShowForm(true);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-400"
          >
            <Plus size={16} />
            Add risk
          </button>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-5">
          <p className="text-sm text-rose-300">Critical</p>
          <p className="mt-2 text-3xl font-semibold text-white">
            {summary.critical}
          </p>
        </div>

        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5">
          <p className="text-sm text-amber-300">High severity</p>
          <p className="mt-2 text-3xl font-semibold text-white">
            {summary.high}
          </p>
        </div>

        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
          <p className="text-sm text-cyan-300">Open risks</p>
          <p className="mt-2 text-3xl font-semibold text-white">
            {summary.open}
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
          <p className="text-sm text-emerald-300">Mitigated</p>
          <p className="mt-2 text-3xl font-semibold text-white">
            {summary.mitigated}
          </p>
        </div>
      </section>

      {showForm ? (
        <RiskForm
            key={editingRisk?.id || 'new-risk'}
            initialValues={editingRisk}
            onSubmit={saveRisk}
            onCancel={() => {
                setEditingRisk(null);
                setShowForm(false);
            }}
        />
      ) : null}

      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <label className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <span className="sr-only">Search risks</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search risks..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 pl-9 pr-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-indigo-400"
            />
          </label>

          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-400"
          >
            <option>All</option>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>

          <select
            value={severityFilter}
            onChange={(event) => setSeverityFilter(event.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-400"
          >
            <option>All</option>
            {severities.map((severity) => (
              <option key={severity}>{severity}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-400"
          >
            <option>All</option>
            {statuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </div>
      </section>

      {filteredRisks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 p-10 text-center">
          <AlertTriangle className="mx-auto text-slate-500" size={28} />
          <h2 className="mt-4 text-lg font-semibold text-white">
            No risks match your filters
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Adjust the filters or add a new risk.
          </p>
        </div>
      ) : (
        <section className="grid gap-4">
          {filteredRisks.map((risk) => (
            <article
              key={risk.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
            >
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                <div className="flex gap-3">
                  <div className="mt-1 text-amber-300">
                    <AlertTriangle size={19} />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-semibold text-white">
                        {risk.title}
                      </h2>
                      <Pill tone={getSeverityTone(risk.severity)}>
                        {risk.severity}
                      </Pill>
                    </div>

                    <p className="mt-1 text-sm text-slate-500">
                      {risk.category}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={risk.status}
                    onChange={(event) =>
                      updateRiskStatus(risk.id, event.target.value)
                    }
                    className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-300 outline-none focus:border-indigo-400"
                    aria-label={`Update status for ${risk.title}`}
                  >
                    {statuses.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingRisk(risk);
                      setShowForm(true);
                    }}
                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-800 hover:text-white"
                    aria-label={`Edit ${risk.title}`}
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteRisk(risk.id)}
                    className="rounded-lg p-2 text-slate-500 hover:bg-rose-500/10 hover:text-rose-300"
                    aria-label={`Delete ${risk.title}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-slate-950/50 p-3">
                  <p className="text-xs text-slate-500">Probability</p>
                  <p className="mt-2 text-sm text-slate-200">
                    {risk.probability}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-950/50 p-3">
                  <p className="text-xs text-slate-500">Impact</p>
                  <p className="mt-2 text-sm text-slate-200">
                    {risk.impact}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-950/50 p-3">
                  <p className="text-xs text-slate-500">Status</p>
                  <p className="mt-2 text-sm text-slate-200">
                    {risk.status}
                  </p>
                </div>
              </div>

              <div className="mt-4 border-t border-slate-800 pt-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Mitigation plan
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {risk.mitigation}
                </p>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}

export default RisksPage;