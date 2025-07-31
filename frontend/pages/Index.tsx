// Update this page (the content is just a fallback if you fail to update the page)

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-accent">
      <div className="text-center p-8 rounded-2xl shadow-2xl bg-card/80 backdrop-blur-md border border-border max-w-xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-lg">
          Welcome to EventHub
        </h1>
        <p className="text-2xl text-muted-foreground mb-8 max-w-lg mx-auto">
          Discover, create, and join amazing events. Connect with your community and make memories!
        </p>
        <a href="/" className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold text-lg shadow-lg hover:scale-105 transition-transform">
          Explore Events
        </a>
      </div>
    </div>
  );
};

export default Index;
