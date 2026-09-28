import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button.jsx';

function Section({ title, text }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-slate-300">{text}</p>
    </div>
  );
}

function LandingPage() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold leading-tight"
        >
          Turn startup ideas into validated execution plans.
        </motion.h1>
        <p className="mt-5 max-w-2xl text-slate-300">
          AI Startup Studio combines structured startup workflows, AI co-founder guidance, and
          data-backed planning.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/register"><Button>Start Building</Button></Link>
          <Link to="/login"><Button variant="secondary">View Workspace</Button></Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-6 pb-20 md:grid-cols-2 lg:grid-cols-3">
        <Section title="Idea → Validation" text="Clarify problem, solution, assumptions, and proof points." />
        <Section title="Market Intelligence" text="TAM/SAM/SOM, trend signals, and source-linked insights." />
        <Section title="Competitor Strategy" text="Compare pricing, features, positioning, and whitespace." />
        <Section title="Business & Revenue" text="Model, scenarios, assumptions, and risk-aware projections." />
        <Section title="MVP + Roadmap" text="Prioritize features and build phased execution plans." />
        <Section title="AI Co-Founder" text="Context-aware recommendations, not a generic chatbot." />
      </section>
    </div>
  );
}
export default LandingPage;