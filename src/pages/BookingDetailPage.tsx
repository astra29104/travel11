
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBookingsByUserId, getPackageById, getGuideById, getDestinationById } from '@/services/mockData';
import { useAuth } from '@/contexts/AuthContext';
import BackButton from '@/components/BackButton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, User, Clock } from 'lucide-react';
import { format } from 'date-fns';
import Layout from '@/components/Layout';

const BookingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  
  // Find the booking
  const userBookings = user ? getBookingsByUserId(user.user_id) : [];
  const booking = userBookings.find(booking => booking.booking_id === id);
  
  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Please Log In</h1>
            <p className="text-gray-600 mb-8">
              You need to be logged in to view booking details.
            </p>
            <Link to="/login">
              <Button>Log In</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!booking) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <BackButton label="Back to Bookings" />
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Booking Not Found</h1>
            <p className="text-gray-600 mb-6">
              The booking you're looking for doesn't exist or you don't have access to it.
            </p>
            <Link to="/bookings">
              <Button>View All Bookings</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Get related data
  const packageDetails = getPackageById(booking.package_id);
  const guide = booking.guide_id ? getGuideById(booking.guide_id) : null;
  const destination = packageDetails ? getDestinationById(packageDetails.destination_id) : null;
  
  if (!packageDetails || !destination) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <BackButton label="Back to Bookings" />
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Error Loading Booking Details</h1>
            <Link to="/bookings">
              <Button>Go Back</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "PPP");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <BackButton label="Back to Bookings" />
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Booking Details</h1>
            <Badge className={`
              ${booking.booking_status.toLowerCase() === 'confirmed' ? 'bg-green-100 text-green-800' : ''}
              ${booking.booking_status.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
              ${booking.booking_status.toLowerCase() === 'canceled' ? 'bg-red-100 text-red-800' : ''}
            `}>
              {booking.booking_status}
            </Badge>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden border mb-8">
            <div className="p-6">
              {/* Package Info */}
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">{packageDetails.title}</h2>
                <div className="flex items-center text-gray-600 mb-1">
                  <MapPin size={16} className="mr-1" />
                  <span>{destination.name}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock size={16} className="mr-1" />
                  <span>{packageDetails.duration_days} days package</span>
                </div>
              </div>
              
              {/* Booking Info */}
              <div className="mb-6 border-t border-gray-200 pt-4">
                <h3 className="font-semibold mb-2">Travel Details</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <Calendar size={16} className="mr-1 flex-shrink-0" />
                  <span>
                    {formatDate(booking.travel_dates[0])} - {formatDate(booking.travel_dates[booking.travel_dates.length - 1])}
                  </span>
                </div>
                
                {guide && (
                  <div className="flex items-start text-gray-600">
                    <User size={16} className="mr-1 mt-0.5 flex-shrink-0" />
                    <div>
                      <div>{guide.name}</div>
                      <div className="text-sm">{guide.languages.join(', ')}</div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Itinerary */}
              <div className="mb-6 border-t border-gray-200 pt-4">
                <h3 className="font-semibold mb-2">Itinerary Overview</h3>
                <div className="space-y-2">
                  {packageDetails.itinerary.map((day, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-medium">{day.split(':')[0]}:</span> {day.split(':').slice(1).join(':').trim()}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Payment Info */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-semibold mb-2">Payment Details</h3>
                <div className="flex justify-between text-gray-600">
                  <span>Booking ID</span>
                  <span>{booking.booking_id}</span>
                </div>
                <div className="flex justify-between text-gray-600 mt-1">
                  <span>Booking Date</span>
                  <span>{formatDate(booking.created_at)}</span>
                </div>
                <div className="flex justify-between font-bold mt-3 text-lg">
                  <span>Total Amount</span>
                  <span className="text-primary">₹{booking.total_cost.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Link to="/bookings">
              <Button variant="outline">Back to My Bookings</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingDetailPage;
