import { useState } from 'react';
import { Bot, LoaderCircle, Send, Sparkles } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';

import SectionHeader from '@/components/planning/SectionHeader.jsx';
import Pill from '@/components/planning/Pill.jsx';
import { sendMockFounderMessage } from '@/services/executionService.js';

const suggestedActions = [
  'Analyze my current startup idea',
  'Challenge my customer assumptions',
  'Improve my revenue model',
  'Create a focused MVP',
  'Review my roadmap'
];

function AiCofounderPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'I am your AI Co-Founder workspace. Ask me about your idea, market, MVP, revenue model, risks, or roadmap.',
      sourceLabel: 'Mock AI Co-Founder response',
      confidence: 'Medium'
    }
  ]);

  const mutation = useMutation({
    mutationFn: sendMockFounderMessage,
    onSuccess: (response) => {
      setMessages((current) => [...current, response]);
    }
  });

  function submitMessage(message = input) {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || mutation.isPending) {
      return;
    }

    setMessages((current) => [
      ...current,
      {
        id: `user-${Date.now()}`,
        role: 'user',
        content: trimmedMessage
      }
    ]);

    setInput('');
    mutation.mutate(trimmedMessage);
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <SectionHeader
        eyebrow="AI Workspace"
        title="AI Co-Founder"
        description="Use contextual startup guidance to challenge assumptions, create actions, and improve your plan. Responses are advisory."
        action={
          <Pill tone="ai">
            <Sparkles size={13} className="mr-1 inline" />
            Context-aware assistant
          </Pill>
        }
      />

      <section className="grid min-h-[620px] gap-6 lg:grid-cols-[220px_1fr_260px]">
        <aside className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Suggested actions</p>

          <div className="mt-4 space-y-2">
            {suggestedActions.map((action) => (
              <button
                key={action}
                type="button"
                onClick={() => submitMessage(action)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950/50 p-3 text-left text-sm text-slate-300 hover:border-indigo-500/40 hover:text-white"
              >
                {action}
              </button>
            ))}
          </div>
        </aside>

        <main className="flex min-h-[620px] flex-col rounded-2xl border border-slate-800 bg-slate-900/70">
          <div className="flex items-center gap-3 border-b border-slate-800 p-4">
            <div className="rounded-xl bg-indigo-500/10 p-2 text-indigo-300">
              <Bot size={20} />
            </div>
            <div>
              <h2 className="font-semibold text-white">Startup strategy assistant</h2>
              <p className="text-xs text-slate-500">Mock service · backend integration later</p>
            </div>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role !== 'user' ? (
                  <div className="mt-1 rounded-lg bg-indigo-500/10 p-2 text-indigo-300">
                    <Bot size={15} />
                  </div>
                ) : null}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-sm leading-6 ${
                    message.role === 'user'
                      ? 'bg-indigo-500 text-white'
                      : 'border border-slate-800 bg-slate-950/60 text-slate-300'
                  }`}
                >
                  <p>{message.content}</p>

                  {message.sourceLabel ? (
                    <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                      <Pill tone="ai">{message.sourceLabel}</Pill>
                      <Pill tone="calculated">
                        Confidence: {message.confidence}
                      </Pill>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}

            {mutation.isPending ? (
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <LoaderCircle className="animate-spin" size={16} />
                AI Co-Founder is thinking...
              </div>
            ) : null}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              submitMessage();
            }}
            className="border-t border-slate-800 p-4"
          >
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about your startup..."
                className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-indigo-400"
              />

              <button
                type="submit"
                disabled={!input.trim() || mutation.isPending}
                className="rounded-xl bg-indigo-500 px-4 text-white hover:bg-indigo-400 disabled:opacity-50"
                aria-label="Send message"
              >
                <Send size={17} />
              </button>
            </div>
          </form>
        </main>

        <aside className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Startup context</p>

          <div className="mt-4 space-y-3">
            {[
              ['Startup', 'LaunchMate'],
              ['Stage', 'Validation'],
              ['Health', '78/100'],
              ['Next focus', 'Customer interviews']
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-slate-950/50 p-3">
                <p className="text-xs text-slate-500">{label}</p>
                <p className="mt-1 text-sm text-slate-200">{value}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}

export default AiCofounderPage;