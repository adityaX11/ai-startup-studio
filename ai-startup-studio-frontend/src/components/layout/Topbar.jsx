// import { Bell, Search, User } from 'lucide-react';
// import { useAuthStore } from '@/store/authStore.js';

// function Topbar() {
//   const { user, logout } = useAuthStore();

//   return (
//     <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
//       <div className="flex h-16 items-center justify-between gap-3 px-4 md:px-6">
//         <div className="flex items-center gap-2 rounded-lg border border-slate-800 px-3 py-2 text-sm text-slate-400">
//           <Search size={16} />
//           Search (⌘K)
//         </div>
//         <div className="flex items-center gap-3">
//           <button className="rounded-lg border border-slate-800 p-2 hover:bg-slate-800" aria-label="Notifications">
//             <Bell size={18} />
//           </button>
//           <div className="flex items-center gap-2 rounded-lg border border-slate-800 px-3 py-2 text-sm">
//             <User size={16} />
//             <span>{user?.name || 'Founder'}</span>
//           </div>
//           <button onClick={logout} className="rounded-lg bg-slate-800 px-3 py-2 text-sm hover:bg-slate-700">
//             Logout
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }
// export default Topbar;

import { Search, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/store/authStore.js';
import NotificationCenter from '@/components/notifications/NotificationCenter.jsx';

function Topbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/85 backdrop-blur">
      <div className="flex min-h-16 items-center justify-between gap-3 px-4 md:px-6">
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event('search:open'))}
          className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-800 px-3 py-2 text-sm text-slate-500 hover:bg-slate-900"
          aria-label="Open global search"
        >
          <Search size={16} />
          <span className="hidden sm:inline">Search startups, documents...</span>
          <kbd className="hidden rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400 md:inline">
            Ctrl K
          </kbd>
        </button>

        <div className="flex items-center gap-2">
          <NotificationCenter />

          <button
            type="button"
            onClick={() => navigate('/settings')}
            className="hidden items-center gap-2 rounded-xl border border-slate-800 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 sm:flex"
          >
            <User size={16} />
            <span>{user?.name || 'Founder'}</span>
          </button>

          <button
            type="button"
            onClick={logout}
            className="rounded-xl bg-slate-800 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Topbar;