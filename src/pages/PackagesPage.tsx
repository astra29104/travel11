
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  getDestinationById, 
  getPackagesByDestinationId 
} from '@/services/mockData';
import PackageCard from '@/components/PackageCard';
import BackButton from '@/components/BackButton';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';

const PackagesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const destination = id ? getDestinationById(id) : undefined;
  const packages = id ? getPackagesByDestinationId(id) : [];

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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <BackButton label={`Back to ${destination.name}`} />
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Packages for {destination.name}</h1>
          <p className="text-gray-600">
            Choose from our curated packages to explore {destination.name}
          </p>
        </div>
        
        {packages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <PackageCard key={pkg.package_id} package={pkg} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-medium text-gray-700">No packages available</h2>
            <p className="text-gray-500 mt-2">
              Check back soon for new packages to {destination.name}
            </p>
            <div className="mt-6">
              <Link to="/destinations">
                <Button>Browse Other Destinations</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PackagesPage;
