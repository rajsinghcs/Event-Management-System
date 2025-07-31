import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Event } from '@/types/event';
import { EventCard } from '@/components/EventCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';

const ManageEvents: React.FC = () => {
  const { token } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:4000/api/events', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setEvents(data);
      } catch {
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [token]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    setDeleting(id);
    try {
      await fetch(`http://localhost:4000/api/events/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(events => events.filter(e => e.id !== id));
    } finally {
      setDeleting(null);
    }
  };

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
        Manage Events
      </h1>
      {events.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-2xl font-semibold text-gray-600 mb-2">No events found.</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map(event => (
            <div key={event.id} className="relative">
              <EventCard event={event} />
              <div className="absolute top-4 right-4 flex gap-2">
                <Button size="sm" variant="outline" onClick={() => navigate(`/events/${event.id}/edit`)}>
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(event.id)} disabled={deleting === event.id}>
                  {deleting === event.id ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageEvents; 