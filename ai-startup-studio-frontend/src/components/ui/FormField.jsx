import PropTypes from 'prop-types';

function FormField({ label, htmlFor, error, children, hint }) {
  return (
    <div>
      {label ? (
        <label htmlFor={htmlFor} className="mb-1 block text-sm font-medium text-slate-200">
          {label}
        </label>
      ) : null}
      {children}
      {hint && !error ? <p className="mt-1 text-xs text-slate-400">{hint}</p> : null}
      {error ? <p className="mt-1 text-xs text-rose-400">{error}</p> : null}
    </div>
  );
}
FormField.propTypes = {
  label: PropTypes.string,
  htmlFor: PropTypes.string,
  error: PropTypes.string,
  children: PropTypes.node.isRequired,
  hint: PropTypes.string
};
export default FormField;