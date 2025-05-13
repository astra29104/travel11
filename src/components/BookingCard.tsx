
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Booking, getPackageById, getDestinationById } from '@/services/supabaseService';
import { format } from 'date-fns';
import { MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BookingCardProps {
  booking: Booking;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const [packageTitle, setPackageTitle] = useState<string>('');
  const [destinationName, setDestinationName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  
  // Format the first and last date of travel
  const firstDay = new Date(booking.travel_dates[0]);
  const lastDay = new Date(booking.travel_dates[booking.travel_dates.length - 1]);
  
  const isUpcoming = new Date(lastDay) >= new Date();
  
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Get package details
        const packageData = await getPackageById(booking.package_id);
        
        if (packageData) {
          setPackageTitle(packageData.title);
          
          // Get destination
          const destination = await getDestinationById(packageData.destination_id);
          if (destination) {
            setDestinationName(destination.name);
          }
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching booking details:', error);
        setIsLoading(false);
      }
    };
    
    fetchDetails();
  }, [booking.package_id]);
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
        <div className="h-8 bg-gray-200 rounded"></div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md border overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg">{packageTitle}</h3>
          <Badge className={`
            ${booking.booking_status.toLowerCase() === 'confirmed' ? 'bg-green-100 text-green-800' : ''}
            ${booking.booking_status.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
            ${booking.booking_status.toLowerCase() === 'canceled' ? 'bg-red-100 text-red-800' : ''}
          `}>
            {booking.booking_status}
          </Badge>
        </div>
        
        <div className="flex items-center text-gray-600 mb-1">
          <MapPin size={16} className="mr-1" />
          <span>{destinationName}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3">
          <Calendar size={16} className="mr-1" />
          <span>
            {format(firstDay, "MMM d")} - {format(lastDay, "MMM d, yyyy")}
          </span>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="text-primary font-semibold">
            ₹{booking.total_cost.toLocaleString()}
          </div>
          
          <Link to={`/bookings/${booking.id}`}>
            <Button variant={isUpcoming ? "default" : "outline"} size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
