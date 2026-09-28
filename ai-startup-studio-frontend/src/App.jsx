// function App() {
//   return (
//     <main className="min-h-screen bg-slate-950 text-slate-100">
//       <div className="mx-auto max-w-6xl px-6 py-20">
//         <h1 className="text-4xl font-bold tracking-tight">AI Startup Studio</h1>
//         <p className="mt-4 text-slate-300">
//           JavaScript frontend foundation is ready. Next: routing + app shell.
//         </p>
//       </div>
//     </main>
//   );
// }

// export default App;

import AppRouter from '@/routes/AppRouter.jsx';
import AppErrorBoundary from '@/components/common/AppErrorBoundary.jsx';

function App() {
  return (
    <AppErrorBoundary>
      <AppRouter />
    </AppErrorBoundary>
  );
}

export default App;