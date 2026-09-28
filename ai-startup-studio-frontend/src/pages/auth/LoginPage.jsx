import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/ui/Button.jsx';
import Input from '@/components/ui/Input.jsx';
import FormField from '@/components/ui/FormField.jsx';
import { loginSchema } from '@/schemas/authSchemas.js';
import { mockLogin } from '@/services/authService.js';
import { useAuthStore } from '@/store/authStore.js';

function LoginPage() {
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const loginMock = useAuthStore((s) => s.loginMock);
  const from = location.state?.from || '/dashboard';

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', remember: true }
  });

  const onSubmit = async (values) => {
    setServerError('');
    try {
      const res = await mockLogin(values);
      loginMock(res.user);
      navigate(from, { replace: true });
    } catch (e) {
      setServerError(e.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h1 className="text-2xl font-semibold">Welcome back</h1>
      <FormField label="Email" error={errors.email?.message}>
        <Input type="email" {...register('email')} />
      </FormField>
      <FormField label="Password" error={errors.password?.message}>
        <Input type="password" {...register('password')} />
      </FormField>
      {serverError ? <p className="text-sm text-rose-400">{serverError}</p> : null}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Signing in...' : 'Login'}
      </Button>
      <div className="flex items-center justify-between text-sm">
        <Link to="/forgot-password" className="text-indigo-400">Forgot password?</Link>
        <Link to="/register" className="text-indigo-400">Create account</Link>
      </div>
    </form>
  );
}
export default LoginPage;