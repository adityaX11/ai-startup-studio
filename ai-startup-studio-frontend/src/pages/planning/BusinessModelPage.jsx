import { useQuery } from '@tanstack/react-query';
import { Building2, DollarSign } from 'lucide-react';

import SectionHeader from '@/components/planning/SectionHeader.jsx';
import Pill from '@/components/planning/Pill.jsx';
import { getBusinessModelData } from '@/services/planningService.js';

const sections = [
  { key: 'keyPartners', title: 'Key Partners' },
  { key: 'keyActivities', title: 'Key Activities' },
  { key: 'keyResources', title: 'Key Resources' },
  { key: 'valuePropositions', title: 'Value Propositions' },
  { key: 'customerRelationships', title: 'Customer Relationships' },
  { key: 'channels', title: 'Channels' },
  { key: 'customerSegments', title: 'Customer Segments' },
  { key: 'costStructure', title: 'Cost Structure' },
  { key: 'revenueStreams', title: 'Revenue Streams' }
];

function BusinessModelPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['business-model'],
    queryFn: getBusinessModelData
  });

  if (isLoading) {
    return <div className="h-96 animate-pulse rounded-2xl bg-slate-900" />;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <SectionHeader
        eyebrow="Plan"
        title="Business model canvas"
        description="Map your strategy across the value chain and define how the business creates, delivers, and captures value."
        action={
          <Pill tone="info">
            <Building2 size={13} className="mr-1 inline" />
            Founder strategy
          </Pill>
        }
      />

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-500">Customer value</p>
          <p className="mt-2 text-2xl font-semibold text-white">High</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-500">Revenue model</p>
          <p className="mt-2 text-2xl font-semibold text-white">Hybrid</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-500">Cost focus</p>
          <p className="mt-2 text-2xl font-semibold text-white">Lean</p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {sections.map((section) => (
          <article key={section.key} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <h2 className="text-lg font-semibold text-white">{section.title}</h2>

            <ul className="mt-4 space-y-3">
              {(data[section.key] || []).map((item) => (
                <li key={item} className="rounded-xl border border-slate-800 bg-slate-950/50 px-3 py-2 text-sm text-slate-300">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </div>
  );
}

export default BusinessModelPage;