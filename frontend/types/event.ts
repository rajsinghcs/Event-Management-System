export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  createdAt: string;
  registrations: Registration[];
}

export interface Registration {
  id: string;
  eventId: string;
  name: string;
  email: string;
  registeredAt: string;
}

export interface CreateEventData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
}

export interface RegisterForEventData {
  name: string;
  email: string;
}