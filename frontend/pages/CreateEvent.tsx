import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CreateEventData } from '@/types/event';
import { eventService } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import { CalendarIcon, Clock, MapPin, FileText } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const CreateEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { token, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateEventData>({
    title: '',
    description: '',
    date: '',
    time: '',
    location: ''
  });

  useEffect(() => {
    if (!user) return;
    if (user.role !== 'organiser') {
      alert('Only organisers can create events.');
      navigate('/');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'organiser') {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await eventService.createEvent(formData, token!);
      toast({
        title: "Event Created!",
        description: "Your event has been successfully created.",
      });
      navigate('/manage-events');
    } catch (error) {
      toast({
        title: "Creation Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-black">Create New Event</h1>
            <p className="text-gray-600">
              Fill in the details below to create your event
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
                    value={formData.title}
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
                    value={formData.description}
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
                      value={formData.date}
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
                      value={formData.time}
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
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Event location or online platform"
                    required
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/')}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-black hover:bg-gray-800 text-white"
                  >
                    {loading ? 'Creating...' : 'Create Event'}
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