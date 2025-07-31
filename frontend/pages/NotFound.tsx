import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-accent">
      <div className="text-center p-8 rounded-2xl shadow-2xl bg-card/80 backdrop-blur-md border border-border max-w-md mx-auto">
        <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-lg">404</h1>
        <p className="text-2xl text-muted-foreground mb-6">Oops! Page not found</p>
        <a href="/" className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold text-lg shadow-lg hover:scale-105 transition-transform">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
