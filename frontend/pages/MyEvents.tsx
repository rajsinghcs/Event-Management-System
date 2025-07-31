import React, { useEffect, useState } from 'react';
import { Event } from '@/types/event';
import { useAuth } from '@/context/AuthContext';
import { EventCard } from '@/components/EventCard';
import { Skeleton } from '@/components/ui/skeleton';

const MyEvents: React.FC = () => {
  const { token, user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyEvents = async () => {
      setLoading(true);
      try {
        console.log('Fetching my events...');
        console.log('Token present:', !!token);
        console.log('User info:', user);
        
        const res = await fetch('http://localhost:4000/api/events/my-events', {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        console.log('Response status:', res.status);
        console.log('Response headers:', Object.fromEntries(res.headers.entries()));
        
        if (!res.ok) {
          const errorText = await res.text();
          console.error('Error response:', errorText);
          throw new Error(`HTTP ${res.status}: ${res.statusText} - ${errorText}`);
        }
        
        const data = await res.json();
        console.log('My events data:', data);
        setEvents(data);
      } catch (error) {
        console.error('Error fetching my events:', error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMyEvents();
  }, [token, user]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-black">
        My Events
      </h1>
      {events.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-2xl font-semibold text-gray-600 mb-2">You have not registered for any events yet.</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEvents; 