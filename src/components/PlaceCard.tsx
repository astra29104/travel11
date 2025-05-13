
import React from 'react';
import { Place } from '@/services/mockData';

interface PlaceCardProps {
  place: Place;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow">
      <div className="relative h-48">
        <img
          src={place.image_url}
          alt={place.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{place.name}</h3>
        <p className="text-gray-600 line-clamp-3">{place.description}</p>
      </div>
    </div>
  );
};

export default PlaceCard;
