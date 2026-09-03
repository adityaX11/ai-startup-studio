import PropTypes from 'prop-types';
function ModulePage({ title }) {
  return <h1 className="text-2xl font-semibold">{title}</h1>;
}
ModulePage.propTypes = { title: PropTypes.string.isRequired };
export default ModulePage;