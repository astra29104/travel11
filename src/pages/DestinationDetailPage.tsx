
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  getDestinationById,
  getPlacesByDestinationId,
  getPackagesByDestinationId,
  Destination,
  Place,
  Package
} from '@/services/supabaseService';
import PlaceCard from '@/components/PlaceCard';
import PackageCard from '@/components/PackageCard';
import BackButton from '@/components/BackButton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Utensils,
  ArrowUpRight 
} from 'lucide-react';
import Layout from '@/components/Layout';

const DestinationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(1);
  const placesPerPage = 3;
  
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      setIsLoading(true);
      
      try {
        // Fetch destination data
        const destinationData = await getDestinationById(id);
        setDestination(destinationData);
        
        if (destinationData) {
          // Fetch related places
          const placesData = await getPlacesByDestinationId(id);
          setPlaces(placesData);
          
          // Fetch packages
          const packagesData = await getPackagesByDestinationId(id);
          setPackages(packagesData);
        }
      } catch (error) {
        console.error('Error fetching destination details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id]);
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <p className="text-center py-12 text-gray-500">Loading destination details...</p>
        </div>
      </Layout>
    );
  }
  
  if (!destination) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Destination not found</h1>
          <Link to="/destinations">
            <Button>Back to Destinations</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  // Pagination for places
  const totalPages = Math.ceil(places.length / placesPerPage);
  const indexOfLastPlace = currentPage * placesPerPage;
  const indexOfFirstPlace = indexOfLastPlace - placesPerPage;
  const currentPlaces = places.slice(indexOfFirstPlace, indexOfLastPlace);
  
  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <Layout>
      <div>
        {/* Hero Section */}
        <div 
          className="relative h-72 md:h-96 bg-cover bg-center"
          style={{ backgroundImage: `url(${destination.image_url})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center text-center text-white p-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{destination.name}</h1>
              <div className="flex items-center justify-center">
                <MapPin size={18} className="mr-1" />
                <span>{destination.category}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <BackButton label="Back to Destinations" />
          </div>
          
          {/* About Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">About {destination.name}</h2>
            <p className="text-gray-700 mb-6">
              {destination.description}
            </p>
            
            {/* Highlights */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-3">Highlights</h3>
              <div className="flex flex-wrap gap-2">
                {destination.highlights.map((highlight, index) => (
                  <Badge key={index} variant="outline" className="bg-primary/5 text-primary border-primary/20">
                    {highlight}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Popular Foods */}
            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <Utensils className="mr-2" size={20} />
                Must Try Foods
              </h3>
              <div className="flex flex-wrap gap-2">
                {destination.popular_foods.map((food, index) => (
                  <Badge key={index} variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20">
                    {food}
                  </Badge>
                ))}
              </div>
            </div>
          </section>
          
          {/* Places Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Places to Visit</h2>
              {totalPages > 1 && (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft size={16} />
                  </Button>
                  <span className="text-sm">
                    {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight size={16} />
                  </Button>
                </div>
              )}
            </div>
            
            {places.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPlaces.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No places found for this destination.</p>
            )}
            
            {/* Pagination for mobile */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 md:hidden">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft size={16} />
                  </Button>
                  <span className="text-sm">
                    {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            )}
          </section>
          
          {/* Packages Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Available Packages</h2>
              {packages.length > 3 && (
                <Link 
                  to={`/destinations/${destination.id}/packages`} 
                  className="flex items-center text-primary hover:underline"
                >
                  View All <ArrowUpRight size={16} className="ml-1" />
                </Link>
              )}
            </div>
            
            {packages.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.slice(0, 3).map((pkg) => (
                  <PackageCard key={pkg.id} package={pkg} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No packages available for this destination yet.</p>
            )}
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default DestinationDetailPage;
