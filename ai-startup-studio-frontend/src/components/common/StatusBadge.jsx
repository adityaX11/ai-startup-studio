import PropTypes from 'prop-types';

function StatusBadge({ status }) {
  const styles = {
    Active: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
    Draft: 'border-amber-500/20 bg-amber-500/10 text-amber-300',
    Completed: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-300',
    'In progress': 'border-indigo-500/20 bg-indigo-500/10 text-indigo-300',
    'Not started': 'border-slate-700 bg-slate-800 text-slate-400'
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${
        styles[status] || styles['Not started']
      }`}
    >
      {status}
    </span>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired
};

export default StatusBadge;