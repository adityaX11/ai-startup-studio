import { useAuthStore } from '@/store/authStore.js';
import { useNavigate, useLocation, Link } from 'react-router-dom';

function LoginPage() {
  const loginMock = useAuthStore((s) => s.loginMock);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/dashboard';

  const handleLogin = () => {
    loginMock({ name: 'Aditya' });
    navigate(from, { replace: true });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">Login</h1>
      <button onClick={handleLogin} className="mt-6 w-full rounded-lg bg-indigo-600 px-4 py-2">Mock Login</button>
      <p className="mt-4 text-sm text-slate-400">No account? <Link to="/register" className="text-indigo-400">Register</Link></p>
    </div>
  );
}
export default LoginPage;