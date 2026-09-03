import { Link } from 'react-router-dom';
function LandingPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="text-5xl font-bold">AI Startup Studio</h1>
      <p className="mt-4 max-w-2xl text-slate-300">Turn your startup idea into a validated execution plan.</p>
      <div className="mt-8 flex gap-3">
        <Link to="/register" className="rounded-lg bg-indigo-600 px-5 py-3 font-medium">Get Started</Link>
        <Link to="/login" className="rounded-lg border border-slate-700 px-5 py-3 font-medium">Login</Link>
      </div>
    </section>
  );
}
export default LandingPage;