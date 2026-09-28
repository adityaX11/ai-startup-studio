import PropTypes from 'prop-types';

function Pill({ children, tone = 'default' }) {
  const toneMap = {
    default: 'bg-slate-800 text-slate-300',
    success: 'bg-emerald-500/10 text-emerald-300',
    warning: 'bg-amber-500/10 text-amber-300',
    info: 'bg-cyan-500/10 text-cyan-300',
    danger: 'bg-rose-500/10 text-rose-300'
  };

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${toneMap[tone] || toneMap.default}`}>
      {children}
    </span>
  );
}

Pill.propTypes = {
  children: PropTypes.node.isRequired,
  tone: PropTypes.oneOf(['default', 'success', 'warning', 'info', 'danger'])
};

export default Pill;