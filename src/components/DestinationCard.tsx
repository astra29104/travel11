
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Destination } from '@/services/supabaseService';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <Link to={`/destinations/${destination.id}`} className="destination-card block">
      <div className="relative h-64">
        <img
          src={destination.image_url}
          alt={destination.name}
          className="w-full h-full object-cover rounded-t-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-t-lg"></div>
        <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl drop-shadow-md">
          {destination.name}
        </h3>
      </div>
      <div className="p-4 bg-white rounded-b-lg border border-gray-200 border-t-0">
        <p className="text-gray-600 mb-4 line-clamp-2">
          {destination.description}
        </p>
        <div className="flex items-center text-primary font-medium">
          View Packages
          <ArrowRight size={16} className="ml-2" />
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
