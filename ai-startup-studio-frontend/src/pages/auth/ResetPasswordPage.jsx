import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '@/schemas/authSchemas.js';
import { mockResetPassword } from '@/services/authService.js';
import FormField from '@/components/ui/FormField.jsx';
import Input from '@/components/ui/Input.jsx';
import Button from '@/components/ui/Button.jsx';

function ResetPasswordPage() {
  const [message, setMessage] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(resetPasswordSchema)
  });

  const onSubmit = async (values) => {
    const res = await mockResetPassword(values);
    setMessage(res.message);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h1 className="text-2xl font-semibold">Reset password</h1>
      <FormField label="New password" error={errors.password?.message}>
        <Input type="password" {...register('password')} />
      </FormField>
      <FormField label="Confirm password" error={errors.confirmPassword?.message}>
        <Input type="password" {...register('confirmPassword')} />
      </FormField>
      {message ? <p className="text-sm text-emerald-400">{message}</p> : null}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Updating...' : 'Update password'}
      </Button>
    </form>
  );
}
export default ResetPasswordPage;