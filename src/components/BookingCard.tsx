
import React from 'react';
import { Booking, Package, Guide, getPackageById, getGuideById } from '@/services/mockData';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BookingCardProps {
  booking: Booking;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  // In a real app, these would come from API calls or be passed as props
  const packageDetails = getPackageById(booking.package_id);
  const guideDetails = booking.guide_id ? getGuideById(booking.guide_id) : null;
  
  if (!packageDetails) {
    return <div>Package information not found</div>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">{packageDetails.title}</h3>
              <Badge className={getStatusColor(booking.booking_status)}>
                {booking.booking_status}
              </Badge>
            </div>

            <div className="flex items-center text-gray-600 mb-1">
              <MapPin size={16} className="mr-1 flex-shrink-0" />
              <span>Package ID: {booking.package_id}</span>
            </div>

            <div className="flex items-center text-gray-600 mb-3">
              <Calendar size={16} className="mr-1 flex-shrink-0" />
              <span>
                {booking.travel_dates.length > 0 && formatDate(booking.travel_dates[0])} 
                {booking.travel_dates.length > 1 && ' - ' + formatDate(booking.travel_dates[booking.travel_dates.length - 1])}
              </span>
            </div>

            {guideDetails && (
              <div className="mb-3">
                <p className="text-sm font-medium">Guide: {guideDetails.name}</p>
              </div>
            )}

            <div className="mb-3">
              <p className="text-primary font-bold">₹{booking.total_cost.toLocaleString()}</p>
            </div>

            <div className="flex space-x-2">
              <Link to={`/bookings/${booking.booking_id}`}>
                <Button variant="outline" size="sm">View Details</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
