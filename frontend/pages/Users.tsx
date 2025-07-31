import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const Users: React.FC = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:4000/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUsers(data);
      } catch {
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [token]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-4 w-96 mb-4" />
        <div className="space-y-2">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-8 w-full rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        All Users
      </h1>
      {users.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-2xl font-semibold text-muted-foreground mb-2">No users found.</h3>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-card rounded-xl shadow">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Signup Date</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b border-border">
                  <td className="px-4 py-2 font-medium">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 capitalize">{user.role}</td>
                  <td className="px-4 py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users; 