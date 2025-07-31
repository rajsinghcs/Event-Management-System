import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navigation } from "@/components/ui/navigation";
import { EventList } from "./pages/EventList";
import { EventDetails } from "./pages/EventDetails";
import { CreateEvent } from "./pages/CreateEvent";
import { EditEvent } from "./pages/EditEvent";
import NotFound from "./pages/NotFound";
import { EventSidebar } from "@/components/EventSidebar";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import MyEvents from "@/pages/MyEvents";
import ManageEvents from "@/pages/ManageEvents";
import Users from "@/pages/Users";
import Profile from "@/pages/Profile";

const queryClient = new QueryClient();

function AppRoutes() {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="*"
            element={
              user ? (
                <div className="flex flex-1">
                  <div className="hidden md:block w-64 flex-shrink-0">
                    <EventSidebar />
                  </div>
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<EventList />} />
                      <Route path="/create" element={<CreateEvent />} />
                      <Route path="/events/:id" element={<EventDetails />} />
                      <Route path="/events/:id/edit" element={<EditEvent />} />
                      {user?.role === 'attendee' && <Route path="/my-events" element={<MyEvents />} />}
                      {user?.role === 'organiser' && <Route path="/manage-events" element={<ManageEvents />} />}
                      {user?.role === 'organiser' && <Route path="/users" element={<Users />} />}
                      <Route path="/profile" element={<Profile />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                </div>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
