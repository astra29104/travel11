
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeroBanner from '@/components/HeroBanner';
import SearchBar from '@/components/SearchBar';
import { getDestinations, getPackages, Destination, Package } from '@/services/supabaseService';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import DestinationCard from '@/components/DestinationCard';
import PackageCard from '@/components/PackageCard';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [featuredDestinations, setFeaturedDestinations] = useState<Destination[]>([]);
  const [topPackages, setTopPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        // Get destinations and packages
        const destinationsData = await getDestinations();
        setFeaturedDestinations(destinationsData.slice(0, 3));
        
        const packagesData = await getPackages();
        setTopPackages(packagesData.slice(0, 4));
      } catch (error) {
        console.error('Error fetching home page data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <HeroBanner />
      
      {/* Search Section */}
      <section className="bg-gradient-to-b from-primary/10 to-transparent py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Find Your Next Adventure</h2>
            <SearchBar />
          </div>
        </div>
      </section>
      
      {/* Featured Destinations */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Destinations</h2>
            <Link 
              to="/destinations" 
              className="flex items-center text-primary hover:underline"
            >
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading destinations...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredDestinations.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Popular Packages */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Popular Packages</h2>
          
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading packages...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {topPackages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  package={pkg}
                  showDestination={true}
                />
              ))}
            </div>
          )}
          
          <div className="mt-10 text-center">
            <Button size="lg" onClick={() => navigate('/destinations')}>
              Explore All Destinations
            </Button>
          </div>
        </div>
      </section>
      
      {/* About/CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Your Journey Begins with TravelQuest</h2>
          <p className="max-w-2xl mx-auto mb-8 text-white/90">
            We provide unforgettable travel experiences with expertly curated packages and exceptional guides.
            Discover the world with us and create memories that last a lifetime.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              variant="secondary" 
              onClick={() => navigate('/destinations')}
            >
              Find Your Destination
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-primary"
              onClick={() => navigate('/login')}
            >
              Sign Up Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
