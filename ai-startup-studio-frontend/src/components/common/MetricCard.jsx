import PropTypes from 'prop-types';

function MetricCard({ label, value, description, icon: Icon, accent = 'indigo' }) {
  const accentClasses = {
    indigo: 'bg-indigo-500/10 text-indigo-300',
    cyan: 'bg-cyan-500/10 text-cyan-300',
    emerald: 'bg-emerald-500/10 text-emerald-300',
    amber: 'bg-amber-500/10 text-amber-300'
  };

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-white">{value}</p>
          {description ? <p className="mt-2 text-xs text-slate-500">{description}</p> : null}
        </div>

        {Icon ? (
          <div className={`rounded-xl p-3 ${accentClasses[accent] || accentClasses.indigo}`}>
            <Icon size={20} />
          </div>
        ) : null}
      </div>
    </article>
  );
}

MetricCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  description: PropTypes.string,
  icon: PropTypes.elementType,
  accent: PropTypes.oneOf(['indigo', 'cyan', 'emerald', 'amber'])
};

export default MetricCard;