// import PropTypes from 'prop-types';

// function TrustLabel({ children, tone = 'ai' }) {
//   const styles = {
//     ai: 'bg-violet-500/10 text-violet-300',
//     user: 'bg-cyan-500/10 text-cyan-300',
//     research: 'bg-emerald-500/10 text-emerald-300',
//     calculated: 'bg-amber-500/10 text-amber-300',
//     warning: 'bg-rose-500/10 text-rose-300'
//   };

//   return (
//     <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${styles[tone]}`}>
//       {children}
//     </span>
//   );
// }

// TrustLabel.propTypes = {
//   children: PropTypes.node.isRequired,
//   tone: PropTypes.oneOf(['ai', 'user', 'research', 'calculated', 'warning'])
// };

// export default TrustLabel;

import PropTypes from 'prop-types';

const toneClasses = {
  ai: 'bg-violet-500/10 text-violet-300',
  user: 'bg-cyan-500/10 text-cyan-300',
  research: 'bg-emerald-500/10 text-emerald-300',
  calculated: 'bg-amber-500/10 text-amber-300',
  warning: 'bg-rose-500/10 text-rose-300'
};

function TrustLabel({ children, tone = 'ai' }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${
        toneClasses[tone] || toneClasses.ai
      }`}
    >
      {children}
    </span>
  );
}

TrustLabel.propTypes = {
  children: PropTypes.node.isRequired,
  tone: PropTypes.oneOf([
    'ai',
    'user',
    'research',
    'calculated',
    'warning'
  ])
};

export default TrustLabel;