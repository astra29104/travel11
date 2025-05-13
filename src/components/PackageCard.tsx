
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, getDestinationById, Destination } from '@/services/supabaseService';
import { Clock, DollarSign, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PackageCardProps {
  package: Package;
  showDestination?: boolean;
}

const PackageCard: React.FC<PackageCardProps> = ({ 
  package: pkg, 
  showDestination = false
}) => {
  const [destination, setDestination] = useState<Destination | null>(null);

  useEffect(() => {
    if (showDestination) {
      const fetchDestination = async () => {
        try {
          const data = await getDestinationById(pkg.destination_id);
          setDestination(data);
        } catch (error) {
          console.error('Error fetching destination:', error);
        }
      };
      
      fetchDestination();
    }
  }, [pkg.destination_id, showDestination]);

  return (
    <div className="package-card bg-white rounded-lg overflow-hidden">
      <div className="relative h-48">
        <img 
          src={pkg.image_url} 
          alt={pkg.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{pkg.title}</h3>
        
        {showDestination && destination && (
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <MapPin size={16} className="mr-1" />
            <span>{destination.name}</span>
          </div>
        )}
        
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Clock size={16} className="mr-1" />
          <span>{pkg.duration_days} Days</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <DollarSign size={16} className="mr-1" />
          <span>₹{pkg.cost.toLocaleString()}</span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{pkg.description}</p>
        
        <Link to={`/packages/${pkg.id}`}>
          <Button className="w-full">View Details</Button>
        </Link>
      </div>
    </div>
  );
};

export default PackageCard;
