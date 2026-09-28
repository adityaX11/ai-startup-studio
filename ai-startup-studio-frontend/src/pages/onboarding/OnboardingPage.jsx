import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { onboardingSchema } from '@/schemas/onboardingSchema.js';
import Input from '@/components/ui/Input.jsx';
import FormField from '@/components/ui/FormField.jsx';
import Button from '@/components/ui/Button.jsx';

const steps = [
  { key: 'founderName', label: 'Founder Name' },
  { key: 'role', label: 'Role' },
  { key: 'experience', label: 'Experience' },
  { key: 'startupIdea', label: 'Startup Idea' },
  { key: 'problem', label: 'Problem' },
  { key: 'targetCustomer', label: 'Target Customer' },
  { key: 'stage', label: 'Current Stage' },
  { key: 'industry', label: 'Industry' },
  { key: 'marketLocation', label: 'Market Location' },
  { key: 'primaryGoal', label: 'Primary Goal' }
];

function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const form = useForm({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      founderName: '', role: '', experience: '', startupIdea: '', problem: '',
      targetCustomer: '', stage: '', industry: '', marketLocation: '', primaryGoal: ''
    }
  });

  const current = steps[step];
  const progress = useMemo(() => Math.round(((step + 1) / steps.length) * 100), [step]);

  const next = async () => {
    const valid = await form.trigger(current.key);
    if (valid) setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = form.handleSubmit(() => setCompleted(true));

  if (completed) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-2xl font-semibold">Workspace Generated</h1>
        <p className="mt-2 text-slate-300">Your startup setup is complete. Next: dashboard and modules.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <p className="text-sm text-slate-400">Step {step + 1} of {steps.length}</p>
      <div className="mt-2 h-2 w-full rounded bg-slate-800">
        <div className="h-2 rounded bg-indigo-600" style={{ width: `${progress}%` }} />
      </div>
      <form className="mt-6 space-y-4" onSubmit={submit}>
        <FormField label={current.label} error={form.formState.errors[current.key]?.message}>
          <Input {...form.register(current.key)} />
        </FormField>
        <div className="flex justify-between">
          <Button type="button" variant="secondary" onClick={back} disabled={step === 0}>Back</Button>
          {step < steps.length - 1 ? (
            <Button type="button" onClick={next}>Next</Button>
          ) : (
            <Button type="submit">Generate Workspace</Button>
          )}
        </div>
      </form>
    </div>
  );
}
export default OnboardingPage;