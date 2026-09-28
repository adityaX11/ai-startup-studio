import PropTypes from 'prop-types';

function Label({ children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="mb-1 block text-sm font-medium text-slate-200">
      {children}
    </label>
  );
}
Label.propTypes = { children: PropTypes.node.isRequired, htmlFor: PropTypes.string };
export default Label;