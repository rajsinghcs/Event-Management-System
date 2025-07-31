import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Event } from '@/types/event';
import { eventService } from '@/lib/mockData';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarTrigger,
  SidebarInput
} from './ui/sidebar';
import { Skeleton } from './ui/skeleton';
import { Calendar } from 'lucide-react';

export const EventSidebar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const location = useLocation();

  useEffect(() => {
    eventService.getAllEvents().then((data) => {
      setEvents(data);
      setLoading(false);
    });
  }, []);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SidebarProvider>
      <Sidebar className="bg-white border-r border-gray-200 h-full">
        <SidebarHeader className="flex items-center gap-2 p-4">
          <SidebarTrigger />
          <span className="text-lg font-bold flex items-center gap-2 text-black">
            <Calendar className="h-5 w-5 text-black" />
            All Events
          </span>
        </SidebarHeader>
        <div className="px-4 pb-2">
          <SidebarInput
            placeholder="Search events..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="mb-2"
          />
        </div>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Events</SidebarGroupLabel>
            <SidebarMenu>
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <SidebarMenuItem key={i}>
                    <Skeleton className="h-8 w-32 rounded-md" />
                  </SidebarMenuItem>
                ))
              ) : filteredEvents.length === 0 ? (
                <SidebarMenuItem>
                  <span className="text-gray-500 px-4 py-2">No events</span>
                </SidebarMenuItem>
              ) : (
                filteredEvents.map((event) => (
                  <SidebarMenuItem key={event.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === `/events/${event.id}`}
                      className="truncate"
                    >
                      <Link to={`/events/${event.id}`}>{event.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              )}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}; 