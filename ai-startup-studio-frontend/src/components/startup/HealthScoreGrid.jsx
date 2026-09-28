import PropTypes from 'prop-types';

function getScoreClasses(tone) {
  if (tone === 'good') {
    return {
      ring: 'border-emerald-500/30 bg-emerald-500/10',
      value: 'text-emerald-300',
      bar: 'bg-emerald-400'
    };
  }

  if (tone === 'low') {
    return {
      ring: 'border-rose-500/30 bg-rose-500/10',
      value: 'text-rose-300',
      bar: 'bg-rose-400'
    };
  }

  if (tone === 'high') {
    return {
      ring: 'border-amber-500/30 bg-amber-500/10',
      value: 'text-amber-300',
      bar: 'bg-amber-400'
    };
  }

  return {
    ring: 'border-amber-500/30 bg-amber-500/10',
    value: 'text-amber-300',
    bar: 'bg-amber-400'
  };
}

function HealthScoreGrid({ scores }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {scores.map((score) => {
        const classes = getScoreClasses(score.tone);

        return (
          <div key={score.label} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-slate-400">{score.label}</span>
              <span className={`rounded-lg border px-2 py-1 text-xs font-semibold ${classes.ring} ${classes.value}`}>
                {score.value}
              </span>
            </div>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-800">
              <div
                className={`h-full rounded-full ${classes.bar}`}
                style={{ width: `${score.value}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

HealthScoreGrid.propTypes = {
  scores: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      tone: PropTypes.string.isRequired
    })
  ).isRequired
};

export default HealthScoreGrid;