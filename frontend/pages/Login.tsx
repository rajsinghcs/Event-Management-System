import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Login: React.FC = () => {
  const { login, loading, error, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    if (!error) navigate('/');
  };

  if (user) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-card p-8 rounded-xl shadow-xl w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</Button>
        <div className="text-center text-sm mt-2">
          Don&apos;t have an account? <a href="/signup" className="text-primary underline">Sign up</a>
        </div>
      </form>
    </div>
  );
};

export default Login; 