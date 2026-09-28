import PropTypes from 'prop-types';

function StatCard({ label, value, accent = 'indigo' }) {
  const accentMap = {
    indigo: 'border-indigo-500/20 bg-indigo-500/10 text-indigo-300',
    cyan: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-300',
    emerald: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
    amber: 'border-amber-500/20 bg-amber-500/10 text-amber-300'
  };

  return (
    <div className={`rounded-2xl border p-5 ${accentMap[accent] || accentMap.indigo}`}>
      <p className="text-sm text-slate-300">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  accent: PropTypes.oneOf(['indigo', 'cyan', 'emerald', 'amber'])
};

export default StatCard;