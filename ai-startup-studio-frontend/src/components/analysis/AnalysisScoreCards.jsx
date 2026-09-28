import PropTypes from 'prop-types';

function getScoreColor(tone) {
  if (tone === 'good') return 'text-emerald-300';
  if (tone === 'low') return 'text-rose-300';
  return 'text-amber-300';
}

function AnalysisScoreCards({ scores }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {scores.map((score) => (
        <article key={score.label} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <p className="text-sm text-slate-400">{score.label}</p>
          <p className={`mt-3 text-3xl font-semibold ${getScoreColor(score.tone)}`}>
            {score.value}
          </p>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-current opacity-80"
              style={{ width: `${score.value}%` }}
            />
          </div>
        </article>
      ))}
    </div>
  );
}

AnalysisScoreCards.propTypes = {
  scores: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      tone: PropTypes.string.isRequired
    })
  ).isRequired
};

export default AnalysisScoreCards;