import PropTypes from 'prop-types';
import { cn } from '@/lib/cn.js';

function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        'w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500',
        className
      )}
      {...props}
    />
  );
}
Input.propTypes = { className: PropTypes.string };
export default Input;