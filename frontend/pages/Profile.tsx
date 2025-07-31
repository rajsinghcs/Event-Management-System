import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Profile: React.FC = () => {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <span className="font-semibold">Name:</span> {user.name}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {user.email}
          </div>
          <div>
            <span className="font-semibold">Role:</span> {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile; 