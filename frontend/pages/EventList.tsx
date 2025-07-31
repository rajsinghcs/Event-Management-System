import { useState, useEffect } from 'react';
import { EventCard } from '@/components/EventCard';
import { Event } from '@/types/event';
import { eventService } from '@/lib/mockData';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/context/AuthContext';

export const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await eventService.getAllEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const upcomingEvents = events.filter(event => 
    new Date(`${event.date}T${event.time}`) > new Date()
  );
  
  const pastEvents = events.filter(event => 
    new Date(`${event.date}T${event.time}`) <= new Date()
  );

  if (loading) {
    return (
      <div className="bg-background">
        <div className="container mx-auto px-4 py-8">
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
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-black drop-shadow-lg">
            Discover Amazing Events
          </h1>
          <p className="text-2xl text-gray-600 max-w-2xl mx-auto mb-8">
            Join exciting events, connect with like-minded people, and create memorable experiences.
          </p>
          {user?.role === 'organiser' && (
            <a href="/create" className="inline-block px-8 py-4 rounded-full bg-black text-white font-semibold text-lg shadow-lg hover:scale-105 transition-transform">
              Create New Event
            </a>
          )}
        </div>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-black">
              Upcoming Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-black">
              Past Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {/* No Events */}
        {events.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No events found</h3>
            <p className="text-gray-500">Be the first to create an event!</p>
          </div>
        )}
      </div>
    </div>
  );
};