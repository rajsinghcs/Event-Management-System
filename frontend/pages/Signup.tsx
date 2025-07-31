import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Signup: React.FC = () => {
  const { signup, loading, error, user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'attendee' | 'organiser'>('attendee');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(name, email, password, role);
    if (!error) navigate('/');
  };

  if (user) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-card p-8 rounded-xl shadow-xl w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <Input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" name="role" value="attendee" checked={role === 'attendee'} onChange={() => setRole('attendee')} />
            Attendee
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="role" value="organiser" checked={role === 'organiser'} onChange={() => setRole('organiser')} />
            Organiser
          </label>
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Signing up...' : 'Sign Up'}</Button>
        <div className="text-center text-sm mt-2">
          Already have an account? <a href="/login" className="text-primary underline">Login</a>
        </div>
      </form>
    </div>
  );
};

export default Signup; 