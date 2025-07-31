import { Link, useLocation } from 'react-router-dom';
import { Calendar, Plus, Home, LogOut, Users, User as UserIcon } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

export const Navigation = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { href: '/', label: 'Events', icon: Home, show: true },
    { href: '/create', label: 'Create Event', icon: Plus, show: user?.role === 'organiser' },
    { href: '/my-events', label: 'My Events', icon: Calendar, show: user?.role === 'attendee' },
    { href: '/manage-events', label: 'Manage Events', icon: Calendar, show: user?.role === 'organiser' },
    { href: '/users', label: 'Users', icon: Users, show: user?.role === 'organiser' },
    { href: '/profile', label: 'Profile', icon: UserIcon, show: !!user },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Calendar className="h-8 w-8 text-black drop-shadow" />
            <span className="text-2xl font-extrabold text-black drop-shadow-lg">
              EventHub
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            {navItems.filter(item => item.show).map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Button
                  key={item.href}
                  asChild
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "flex items-center space-x-2 rounded-full px-5 py-2 font-semibold text-lg transition-all",
                    isActive && "bg-black text-white shadow-md scale-105"
                  )}
                >
                  <Link to={item.href}>
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              );
            })}
            {user && (
              <Button variant="ghost" onClick={logout} className="flex items-center space-x-2 rounded-full px-5 py-2 font-semibold text-lg">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};