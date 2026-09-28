import PropTypes from 'prop-types';

function ProgressBar({ value, label, showValue = true, size = 'md' }) {
  const safeValue = Math.min(Math.max(Number(value) || 0, 0), 100);

  const heights = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  return (
    <div>
      {label || showValue ? (
        <div className="mb-2 flex items-center justify-between gap-3 text-xs">
          {label ? <span className="text-slate-400">{label}</span> : <span />}
          {showValue ? <span className="font-medium text-slate-300">{safeValue}%</span> : null}
        </div>
      ) : null}

      <div className={`overflow-hidden rounded-full bg-slate-800 ${heights[size]}`}>
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-500"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string,
  showValue: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

export default ProgressBar;