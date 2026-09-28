// import { Outlet } from 'react-router-dom';
// import Sidebar from '@/components/layout/Sidebar.jsx';
// import Topbar from '@/components/layout/Topbar.jsx';

// function AppLayout() {
//   return (
//     <div className="min-h-screen bg-slate-950 text-slate-100">
//       <div className="flex min-h-screen">
//         <Sidebar />

//         <div className="flex min-h-screen min-w-0 flex-1 flex-col">
//           <Topbar />

//           <main className="flex-1 overflow-x-hidden p-4 pb-24 md:p-6 md:pb-6">
//             <Outlet />
//           </main>

//           <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-slate-800 bg-slate-950/95 p-2 backdrop-blur lg:hidden">
//             <a
//               href="/dashboard"
//               className="rounded-lg px-2 py-2 text-center text-xs text-slate-300 hover:bg-slate-800"
//             >
//               Dashboard
//             </a>
//             <a
//               href="/startups"
//               className="rounded-lg px-2 py-2 text-center text-xs text-slate-300 hover:bg-slate-800"
//             >
//               Startups
//             </a>
//             <a
//               href="/settings"
//               className="rounded-lg px-2 py-2 text-center text-xs text-slate-300 hover:bg-slate-800"
//             >
//               Settings
//             </a>
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AppLayout;



import { Outlet } from 'react-router-dom';

import Sidebar from '@/components/layout/Sidebar.jsx';
import Topbar from '@/components/layout/Topbar.jsx';
import GlobalSearch from '@/components/search/GlobalSearch.jsx';

function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <GlobalSearch />

      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <Topbar />

          <main className="flex-1 overflow-x-hidden p-4 pb-24 md:p-6 md:pb-6">
            <Outlet />
          </main>

          <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-slate-800 bg-slate-950/95 p-2 backdrop-blur lg:hidden">
            <a
              href="/dashboard"
              className="rounded-lg px-2 py-2 text-center text-xs text-slate-300 hover:bg-slate-800"
            >
              Dashboard
            </a>
            <a
              href="/startups"
              className="rounded-lg px-2 py-2 text-center text-xs text-slate-300 hover:bg-slate-800"
            >
              Startups
            </a>
            <a
              href="/settings"
              className="rounded-lg px-2 py-2 text-center text-xs text-slate-300 hover:bg-slate-800"
            >
              Settings
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;