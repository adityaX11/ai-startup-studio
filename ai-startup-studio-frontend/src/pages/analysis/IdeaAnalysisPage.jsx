import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CheckCircle2, LoaderCircle, Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { analyzeIdea, getIdeaAnalysis } from '@/services/analysisService.js';
import AnalysisHeader from '@/components/analysis/AnalysisHeader.jsx';
import AnalysisScoreCards from '@/components/analysis/AnalysisScoreCards.jsx';
import TrustLabel from '@/components/analysis/TrustLabel.jsx';

function IdeaAnalysisPage() {
  const [result, setResult] = useState(null);

  const { data: initialAnalysis, isLoading } = useQuery({
    queryKey: ['idea-analysis'],
    queryFn: getIdeaAnalysis
  });

  const mutation = useMutation({
    mutationFn: analyzeIdea,
    onSuccess: setResult
  });

  const { register, handleSubmit } = useForm({
    defaultValues: {
      startupIdea: 'An AI-powered workspace that helps founders validate and plan startups.',
      problem: 'Founders struggle to turn vague ideas into validated execution plans.',
      solution: 'A guided platform that combines AI analysis, market research, and startup planning.',
      targetCustomer: 'Students, solo developers, and first-time founders.',
      industry: 'SaaS',
      location: 'Global'
    }
  });

  const analysis = result || initialAnalysis;

  if (isLoading) {
    return <div className="h-96 animate-pulse rounded-2xl bg-slate-900" />;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <AnalysisHeader
        eyebrow="Analyze"
        title="Idea analysis"
        description="Turn your raw idea into a structured hypothesis. AI output is advisory and should be validated with users and research."
        action={
          <TrustLabel tone="ai">
            <span className="inline-flex items-center gap-1">
              <Sparkles size={13} />
              AI-assisted analysis
            </span>
          </TrustLabel>
        }
      />

      <form
        onSubmit={handleSubmit((values) => mutation.mutate(values))}
        className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
      >
        <div className="grid gap-5 md:grid-cols-2">
          {[
            ['startupIdea', 'Startup idea'],
            ['problem', 'Problem'],
            ['solution', 'Solution'],
            ['targetCustomer', 'Target customer'],
            ['industry', 'Industry'],
            ['location', 'Location']
          ].map(([name, label]) => (
            <label key={name} className={name === 'startupIdea' ? 'md:col-span-2' : ''}>
              <span className="mb-2 block text-sm font-medium text-slate-200">{label}</span>
              {name === 'startupIdea' || name === 'problem' || name === 'solution' ? (
                <textarea
                  {...register(name)}
                  rows={name === 'startupIdea' ? 4 : 3}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white outline-none transition focus:border-indigo-400"
                />
              ) : (
                <input
                  {...register(name)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white outline-none transition focus:border-indigo-400"
                />
              )}
            </label>
          ))}
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {mutation.isPending ? <LoaderCircle className="animate-spin" size={16} /> : <Sparkles size={16} />}
          {mutation.isPending ? 'Analyzing idea...' : 'Analyze idea'}
        </button>
      </form>

      {mutation.isError ? (
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-300">
          Analysis failed. Please try again.
        </div>
      ) : null}

      {analysis ? (
        <>
          <section>
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500">Analysis result</p>
                <h2 className="mt-1 text-xl font-semibold text-white">Startup health signals</h2>
              </div>
              <TrustLabel tone="ai">Mock AI output</TrustLabel>
            </div>

            <AnalysisScoreCards scores={analysis.scores} />
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <TrustLabel tone="ai">AI-generated summary</TrustLabel>
              <h2 className="mt-4 text-xl font-semibold text-white">Idea summary</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{analysis.summary}</p>

              <h3 className="mt-6 text-sm font-semibold text-white">Problem statement</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{analysis.problemStatement}</p>

              <h3 className="mt-6 text-sm font-semibold text-white">Value proposition</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{analysis.valueProposition}</p>
            </article>

            <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <TrustLabel tone="warning">Needs validation</TrustLabel>
              <h2 className="mt-4 text-xl font-semibold text-white">Validation questions</h2>

              <ul className="mt-4 space-y-3">
                {analysis.validationQuestions.map((question) => (
                  <li key={question} className="flex gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-amber-300" size={16} />
                    {question}
                  </li>
                ))}
              </ul>
            </article>
          </section>

          <section className="grid gap-6 lg:grid-cols-3">
            {[
              ['Strengths', analysis.strengths, 'research'],
              ['Weaknesses', analysis.weaknesses, 'warning'],
              ['Assumptions', analysis.assumptions, 'calculated']
            ].map(([title, items, tone]) => (
              <article key={title} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                <TrustLabel tone={tone}>{tone === 'research' ? 'AI-generated' : 'Needs validation'}</TrustLabel>
                <h2 className="mt-4 text-lg font-semibold text-white">{title}</h2>
                <ul className="mt-4 space-y-3">
                  {items.map((item) => (
                    <li key={item} className="text-sm leading-6 text-slate-400">
                      • {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </section>
        </>
      ) : null}
    </div>
  );
}

export default IdeaAnalysisPage;