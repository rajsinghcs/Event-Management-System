import { Event } from '@/types/event';

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'React Conference 2024',
    description: 'Join us for the biggest React conference of the year! Learn about the latest features, best practices, and network with fellow developers.',
    date: '2024-03-15',
    time: '09:00',
    location: 'San Francisco Convention Center',
    createdAt: '2024-01-15T10:00:00Z',
    registrations: []
  },
  {
    id: '2',
    title: 'TypeScript Workshop',
    description: 'A hands-on workshop covering advanced TypeScript concepts, generics, and real-world applications.',
    date: '2024-02-28',
    time: '14:00',
    location: 'Tech Hub Downtown',
    createdAt: '2024-01-20T15:30:00Z',
    registrations: []
  },
  {
    id: '3',
    title: 'Web Development Bootcamp',
    description: 'Intensive 3-day bootcamp covering HTML, CSS, JavaScript, and modern frameworks.',
    date: '2024-04-10',
    time: '10:00',
    location: 'Online Virtual Event',
    createdAt: '2024-01-25T09:15:00Z',
    registrations: []
  }
];

// Mock API functions that would typically interact with MongoDB backend
export const eventService = {
  getAllEvents: async (): Promise<Event[]> => {
    const response = await fetch('http://localhost:4000/api/events');
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    return response.json();
  },

  getEventById: async (id: string): Promise<Event | null> => {
    const response = await fetch(`http://localhost:4000/api/events/${id}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to fetch event');
    }
    return response.json();
  },

  createEvent: async (
    eventData: Omit<Event, 'id' | 'createdAt' | 'registrations'>,
    token?: string
  ): Promise<Event> => {
    const response = await fetch('http://localhost:4000/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) {
      throw new Error('Failed to create event');
    }
    return response.json();
  },

  updateEvent: (id: string, eventData: Partial<Event>): Promise<Event | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockEvents.findIndex(e => e.id === id);
        if (index !== -1) {
          mockEvents[index] = { ...mockEvents[index], ...eventData };
          resolve(mockEvents[index]);
        } else {
          resolve(null);
        }
      }, 500);
    });
  },

  deleteEvent: (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockEvents.findIndex(e => e.id === id);
        if (index !== -1) {
          mockEvents.splice(index, 1);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 300);
    });
  },

  registerForEvent: async (
    eventId: string,
    registration: Record<string, never>,
    token?: string
  ) => {
    console.log('Calling registerForEvent with:', { eventId, registration, hasToken: !!token });
    
    const response = await fetch(`http://localhost:4000/api/events/${eventId}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(registration),
    });
    
    console.log('Registration response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Registration error response:', errorText);
      throw new Error(`Failed to register for event: ${response.status} ${response.statusText} - ${errorText}`);
    }
    
    const result = await response.json();
    console.log('Registration successful:', result);
    return result;
  }
};