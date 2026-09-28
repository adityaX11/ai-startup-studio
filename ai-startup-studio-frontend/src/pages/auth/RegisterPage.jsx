import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/ui/Button.jsx';
import Input from '@/components/ui/Input.jsx';
import FormField from '@/components/ui/FormField.jsx';
import { registerSchema } from '@/schemas/authSchemas.js';
import { mockRegister } from '@/services/authService.js';

function RegisterPage() {
  const navigate = useNavigate();
  const [done, setDone] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '', acceptTerms: false }
  });

  const onSubmit = async (values) => {
    await mockRegister(values);
    setDone('Account created. You can login now.');
    setTimeout(() => navigate('/login'), 700);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h1 className="text-2xl font-semibold">Create account</h1>
      <FormField label="Name" error={errors.name?.message}><Input {...register('name')} /></FormField>
      <FormField label="Email" error={errors.email?.message}><Input type="email" {...register('email')} /></FormField>
      <FormField label="Password" error={errors.password?.message}><Input type="password" {...register('password')} /></FormField>
      <FormField label="Confirm password" error={errors.confirmPassword?.message}><Input type="password" {...register('confirmPassword')} /></FormField>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" {...register('acceptTerms')} />
        I accept terms and privacy policy
      </label>
      {errors.acceptTerms ? <p className="text-xs text-rose-400">{errors.acceptTerms.message}</p> : null}
      {done ? <p className="text-sm text-emerald-400">{done}</p> : null}
      <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? 'Creating...' : 'Register'}</Button>
      <p className="text-sm">Already have an account? <Link to="/login" className="text-indigo-400">Login</Link></p>
    </form>
  );
}
export default RegisterPage;