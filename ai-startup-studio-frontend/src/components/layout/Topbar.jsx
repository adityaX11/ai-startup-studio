import { Bell, Search, User } from 'lucide-react';
import { useAuthStore } from '@/store/authStore.js';

function Topbar() {
  const { user, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-3 px-4 md:px-6">
        <div className="flex items-center gap-2 rounded-lg border border-slate-800 px-3 py-2 text-sm text-slate-400">
          <Search size={16} />
          Search (⌘K)
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-lg border border-slate-800 p-2 hover:bg-slate-800" aria-label="Notifications">
            <Bell size={18} />
          </button>
          <div className="flex items-center gap-2 rounded-lg border border-slate-800 px-3 py-2 text-sm">
            <User size={16} />
            <span>{user?.name || 'Founder'}</span>
          </div>
          <button onClick={logout} className="rounded-lg bg-slate-800 px-3 py-2 text-sm hover:bg-slate-700">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
export default Topbar;