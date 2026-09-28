import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PropTypes from 'prop-types';

import { competitorSchema } from '@/schemas/analysisSchemas.js';

const defaultValues = {
  name: '',
  website: '',
  pricing: '',
  targetCustomer: '',
  positioning: ''
};

function CompetitorForm({ initialValues, onSubmit, onCancel }) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(competitorSchema),
    defaultValues: initialValues || defaultValues
  });

  useEffect(() => {
    reset(initialValues || defaultValues);
  }, [initialValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-2xl border border-slate-700 bg-slate-950/70 p-5"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {[
          ['name', 'Name'],
          ['website', 'Website'],
          ['pricing', 'Pricing'],
          ['targetCustomer', 'Target customer'],
          ['positioning', 'Positioning']
        ].map(([field, label]) => (
          <label key={field} className="block">
            <span className="mb-2 block text-sm font-medium text-slate-300">
              {label}
            </span>

            <input
              {...register(field)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-indigo-400"
            />

            {errors[field] ? (
              <span className="mt-1 block text-xs text-rose-300">
                {errors[field].message}
              </span>
            ) : null}
          </label>
        ))}
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400 disabled:opacity-60"
        >
          {isSubmitting ? 'Saving...' : 'Save competitor'}
        </button>
      </div>
    </form>
  );
}

CompetitorForm.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    website: PropTypes.string,
    pricing: PropTypes.string,
    targetCustomer: PropTypes.string,
    positioning: PropTypes.string
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default CompetitorForm;