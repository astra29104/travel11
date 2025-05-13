
import React from 'react';
import { Link } from 'react-router-dom';
import { Package } from '@/services/mockData';
import { Clock, DollarSign, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PackageCardProps {
  package: Package;
  showDestination?: boolean;
  destinationName?: string;
}

const PackageCard: React.FC<PackageCardProps> = ({ 
  package: pkg, 
  showDestination = false,
  destinationName = ""
}) => {
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
        
        {showDestination && destinationName && (
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <MapPin size={16} className="mr-1" />
            <span>{destinationName}</span>
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
        
        <Link to={`/packages/${pkg.package_id}`}>
          <Button className="w-full">View Details</Button>
        </Link>
      </div>
    </div>
  );
};

export default PackageCard;
