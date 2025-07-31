import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock, Users, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Event } from '@/types/event';
import { eventService } from '@/lib/mockData';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

export const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, token } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationOpen, setRegistrationOpen] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      
      try {
        const eventData = await eventService.getEventById(id);
        setEvent(eventData);
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;
    if (!user || user.role !== 'attendee') {
      alert('Only attendees can register for events.');
      return;
    }
    if (!window.confirm('Are you sure you want to register for this event?')) {
      return;
    }
    setIsRegistering(true);
    try {
      console.log('Starting registration for event:', event.id);
      console.log('User info:', { id: user.id, name: user.name, email: user.email });
      console.log('Token present:', !!token);
      
      // Use empty object since backend will use authenticated user's info
      const result = await eventService.registerForEvent(event.id, {}, token);
      console.log('Registration result:', result);
      
      // Update local event state
      const updatedEvent = await eventService.getEventById(event.id);
      console.log('Updated event:', updatedEvent);
      setEvent(updatedEvent);
      
      toast({
        title: "Registration Successful!",
        description: (
          <div>
            You have been registered for the event. 
            <button 
              onClick={() => navigate('/my-events')}
              className="text-blue-600 underline ml-1 hover:text-blue-800"
            >
              View My Events
            </button>
          </div>
        ),
      });
      
      // Navigate to My Events after successful registration
      setTimeout(() => {
        navigate('/my-events');
      }, 2000);
      
      setRegistrationOpen(false);
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsRegistering(false);
    }
  };

  const handleDelete = async () => {
    if (!event) return;
    
    const confirmed = window.confirm('Are you sure you want to delete this event?');
    if (!confirmed) return;
    
    try {
      await eventService.deleteEvent(event.id);
      toast({
        title: "Event Deleted",
        description: "The event has been successfully deleted.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Delete Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className="bg-background">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
          <Link to="/">
            <Button>Back to Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isUpcoming = new Date(`${event.date}T${event.time}`) > new Date();
  
  // Check if current user is already registered
  const isUserRegistered = event.registrations.some(
    registration => registration.userId === user?.id || registration.email === user?.email
  );

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl font-bold mb-2 text-black">{event.title}</CardTitle>
                    <Badge 
                      variant={isUpcoming ? "default" : "secondary"}
                      className={isUpcoming ? "bg-black text-white" : "bg-gray-200 text-gray-700"}
                    >
                      {isUpcoming ? "Upcoming" : "Past Event"}
                    </Badge>
                  </div>
                  
                  {user?.role === 'organiser' && (
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/events/${event.id}/edit`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Link>
                      </Button>
                      <Button variant="destructive" size="sm" onClick={handleDelete}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {event.description}
                </p>
              </CardContent>
            </Card>

            {/* Registrations */}
            <Card>
              <CardHeader>
                <CardTitle>Registered Attendees ({event.registrations.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {event.registrations.length > 0 ? (
                  <div className="space-y-2">
                    {event.registrations.map((registration) => (
                      <div key={registration.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-black">{registration.name}</p>
                          <p className="text-sm text-gray-600">{registration.email}</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          {new Date(registration.registeredAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No registrations yet.</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-3 text-black" />
                  <div>
                    <p className="font-medium text-black">{formatDate(event.date)}</p>
                    <p className="text-sm text-gray-500">Date</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-3 text-black" />
                  <div>
                    <p className="font-medium text-black">{formatTime(event.time)}</p>
                    <p className="text-sm text-gray-500">Time</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-black" />
                  <div>
                    <p className="font-medium text-black">{event.location}</p>
                    <p className="text-sm text-gray-500">Location</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-3 text-black" />
                  <div>
                    <p className="font-medium text-black">{event.registrations.length} people</p>
                    <p className="text-sm text-gray-500">Registered</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {isUpcoming && (
              <Dialog open={registrationOpen} onOpenChange={setRegistrationOpen}>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full bg-black hover:bg-gray-800 text-white"
                    disabled={isUserRegistered || isRegistering}
                  >
                    {isUserRegistered ? 'Already Registered' : isRegistering ? 'Registering...' : 'Register for Event'}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Register for {event.title}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-gray-600 mb-4">
                        You will be registered using your account information:
                      </p>
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <p className="font-medium text-black">{user?.name}</p>
                        <p className="text-sm text-gray-600">{user?.email}</p>
                      </div>
                    </div>
                    <Button 
                      onClick={handleRegister} 
                      disabled={isRegistering} 
                      className="w-full bg-black hover:bg-gray-800 text-white"
                    >
                      {isRegistering ? 'Registering...' : 'Confirm Registration'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};