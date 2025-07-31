import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Event } from '@/types/event';
import { eventService } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import { CalendarIcon, Clock, MapPin, FileText } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export const EditEvent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      
      try {
        const eventData = await eventService.getEventById(id);
        setEvent(eventData);
      } catch (error) {
        console.error('Error fetching event:', error);
        toast({
          title: "Error",
          description: "Failed to load event data.",
          variant: "destructive",
        });
      } finally {
        setFetchLoading(false);
      }
    };

    fetchEvent();
  }, [id, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event || !id) return;
    
    setLoading(true);

    try {
      await eventService.updateEvent(id, {
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
        location: event.location
      });
      
      toast({
        title: "Event Updated!",
        description: "Your event has been successfully updated.",
      });
      navigate(`/events/${id}`);
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!event) return;
    
    setEvent(prev => prev ? {
      ...prev,
      [e.target.name]: e.target.value
    } : null);
  };

  if (fetchLoading) {
    return (
      <div className="bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Skeleton className="h-8 w-64 mb-8 mx-auto" />
            <div className="space-y-6">
              <Skeleton className="h-64 w-full" />
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
          <Button onClick={() => navigate('/')}>Back to Events</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-black">Edit Event</h1>
            <p className="text-gray-600">
              Update your event information
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Event Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Event Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={event.title}
                    onChange={handleChange}
                    placeholder="Enter event title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={event.description}
                    onChange={handleChange}
                    placeholder="Describe your event"
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Date
                    </Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={event.date}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time" className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Time
                    </Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={event.time}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    value={event.location}
                    onChange={handleChange}
                    placeholder="Event location or online platform"
                    required
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(`/events/${id}`)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-black hover:bg-gray-800 text-white"
                  >
                    {loading ? 'Updating...' : 'Update Event'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};