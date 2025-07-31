import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/types/event";

export const EventCard = ({ event }: { event: Event }) => {
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

  const isUpcoming = new Date(`${event.date}T${event.time}`) > new Date();

  return (
    <Card className="h-full rounded-2xl border border-gray-200 shadow-lg bg-white hover:scale-[1.025] hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl font-bold text-black line-clamp-2">
            {event.title}
          </CardTitle>
          <Badge 
            variant={isUpcoming ? "default" : "secondary"}
            className={isUpcoming ? "bg-black text-white" : "bg-gray-200 text-gray-700"}
          >
            {isUpcoming ? "Upcoming" : "Past"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-base text-gray-600 line-clamp-3 mb-2">
          {event.description}
        </div>
        <div className="flex flex-wrap gap-2 text-sm text-gray-700">
          <span className="px-3 py-1 rounded-full bg-gray-100 font-medium">
            {formatDate(event.date)}
          </span>
          <span className="px-3 py-1 rounded-full bg-gray-100 font-medium">
            {formatTime(event.time)}
          </span>
          <span className="px-3 py-1 rounded-full bg-gray-100 font-medium">
            {event.location}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};