import { Link, useParams } from 'react-router-dom';
function StartupWorkspacePage() {
  const { startupId } = useParams();
  return (
    <div>
      <h1 className="text-2xl font-semibold">Startup Workspace: {startupId}</h1>
      <Link className="mt-4 inline-block text-indigo-400" to={`/startups/${startupId}/idea`}>Go to Idea Analysis</Link>
    </div>
  );
}
export default StartupWorkspacePage;