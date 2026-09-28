import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function RecommendedActions({ actions }) {
  return (
    <div className="space-y-3">
      {actions.map((action) => (
        <div
          key={action.id}
          className="flex items-start justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/50 p-4"
        >
          <div className="flex min-w-0 gap-3">
            <div className="mt-0.5 rounded-lg bg-indigo-500/10 p-2 text-indigo-300">
              <Sparkles size={16} />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-medium text-white">{action.title}</h3>
                <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] text-amber-300">
                  {action.priority}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-400">{action.description}</p>
            </div>
          </div>

          <Link
            to={action.href}
            className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            aria-label={`Open ${action.title}`}
          >
            <ArrowRight size={17} />
          </Link>
        </div>
      ))}
    </div>
  );
}

RecommendedActions.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired
    })
  ).isRequired
};

export default RecommendedActions;