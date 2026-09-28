import { ArrowUpRight, Layers3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProgressBar from '@/components/common/ProgressBar.jsx';
import StatusBadge from '@/components/common/StatusBadge.jsx';

function StartupCard({ startup }) {
  return (
    <article className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition hover:-translate-y-0.5 hover:border-indigo-500/40 hover:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${startup.color} text-sm font-bold text-white`}
          >
            {startup.name.slice(0, 2).toUpperCase()}
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-white">{startup.name}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-slate-400">{startup.tagline}</p>
          </div>
        </div>

        <StatusBadge status={startup.status} />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-950/60 p-3">
          <p className="text-xs text-slate-500">Stage</p>
          <p className="mt-1 text-sm font-medium text-slate-200">{startup.stage}</p>
        </div>

        <div className="rounded-xl bg-slate-950/60 p-3">
          <p className="text-xs text-slate-500">Health score</p>
          <p className="mt-1 text-sm font-medium text-slate-200">{startup.healthScore}/100</p>
        </div>
      </div>

      <div className="mt-5">
        <ProgressBar value={startup.progress} label="Workspace progress" />
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4">
        <span className="flex items-center gap-2 text-xs text-slate-500">
          <Layers3 size={14} />
          Updated {startup.lastUpdated}
        </span>

        <Link
          to={`/startups/${startup.id}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-indigo-300 transition hover:text-indigo-200"
        >
          Open workspace
          <ArrowUpRight size={15} />
        </Link>
      </div>
    </article>
  );
}

StartupCard.propTypes = {
  startup: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    tagline: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    stage: PropTypes.string.isRequired,
    healthScore: PropTypes.number.isRequired,
    progress: PropTypes.number.isRequired,
    lastUpdated: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }).isRequired
};

export default StartupCard;