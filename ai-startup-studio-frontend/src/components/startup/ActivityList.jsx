import { CheckCircle2 } from 'lucide-react';
import PropTypes from 'prop-types';

function ActivityList({ activities }) {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex gap-3">
          <div className="mt-0.5 text-emerald-400">
            <CheckCircle2 size={17} />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-200">{activity.title}</p>
            <p className="mt-1 text-xs text-slate-500">{activity.detail}</p>
          </div>

          <span className="ml-auto shrink-0 text-xs text-slate-600">{activity.time}</span>
        </div>
      ))}
    </div>
  );
}

ActivityList.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      detail: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired
    })
  ).isRequired
};

export default ActivityList;