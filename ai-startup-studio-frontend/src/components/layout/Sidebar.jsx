import { NavLink, useParams } from 'react-router-dom';
import { sidebarSections } from '@/constants/nav.js';

function Sidebar() {
  const { startupId } = useParams();
  const defaultStartupId = startupId || 'demo-startup';

  return (
    <aside className="hidden w-72 border-r border-slate-800 bg-slate-900/60 p-4 lg:block">
      <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">AI Startup Studio</p>
      <div className="space-y-6">
        {sidebarSections.map((section) => (
          <div key={section.label}>
            <p className="mb-2 text-xs uppercase tracking-wide text-slate-500">{section.label}</p>
            <nav className="space-y-1">
              {section.items.map((item) => {
                const to = item.to || `/startups/${defaultStartupId}/${item.slug}`;
                return (
                  <NavLink
                    key={item.label}
                    to={to}
                    className={({ isActive }) =>
                      `block rounded-lg px-3 py-2 text-sm ${
                        isActive ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}
export default Sidebar;