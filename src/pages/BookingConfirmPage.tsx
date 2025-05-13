
import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { format } from 'date-fns';
import { 
  getPackageById,
  getDestinationById, 
  getGuideById,
  createBooking
} from '@/services/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, User } from 'lucide-react';
import BackButton from '@/components/BackButton';
import Layout from '@/components/Layout';

interface BookingData {
  package_id: string;
  guide_id: string | null;
  travel_date: string;
  end_date: string;
  base_cost: number;
  guide_cost: number;
}

const BookingConfirmPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Get booking data from location state or redirect
  const bookingData = location.state?.bookingData as BookingData | undefined;
  
  if (!bookingData || !user) {
    return <Navigate to="/" />;
  }
  
  const packageDetails = getPackageById(bookingData.package_id);
  const destination = packageDetails ? getDestinationById(packageDetails.destination_id) : undefined;
  const guideDetails = bookingData.guide_id ? getGuideById(bookingData.guide_id) : null;
  
  if (!packageDetails || !destination) {
    return <Navigate to="/" />;
  }
  
  const totalCost = bookingData.base_cost + bookingData.guide_cost;
  
  const handleConfirmBooking = () => {
    try {
      // Calculate travel dates array
      const startDate = new Date(bookingData.travel_date);
      const endDate = new Date(bookingData.end_date);
      const travelDates = [];
      
      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        travelDates.push(new Date(d).toISOString());
      }
      
      // Create booking
      const booking = createBooking({
        user_id: user.user_id,
        package_id: bookingData.package_id,
        guide_id: bookingData.guide_id || "",
        travel_dates: travelDates,
        booking_status: "Confirmed",
        total_cost: totalCost
      });
      
      toast.success("Booking confirmed successfully!");
      navigate(`/bookings/${booking.booking_id}`);
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to create booking. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <BackButton label="Back to Package" />
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Confirm Your Booking</h1>
            <p className="text-gray-600">
              Please review your booking details before confirming
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden border mb-8">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">{packageDetails.title}</h2>
                <span className="text-primary font-bold text-xl">
                  ₹{totalCost.toLocaleString()}
                </span>
              </div>
              
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin size={18} className="mr-1 flex-shrink-0" />
                <span>{destination.name}</span>
              </div>
              
              <div className="flex items-center text-gray-600 mb-6">
                <Calendar size={18} className="mr-1 flex-shrink-0" />
                <span>
                  {format(new Date(bookingData.travel_date), "PPP")} - {format(new Date(bookingData.end_date), "PPP")}
                  <span className="ml-2 text-sm">({packageDetails.duration_days} days)</span>
                </span>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-4">
                <h3 className="font-semibold mb-2">Booking Summary</h3>
                
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Package Cost</span>
                    <span>₹{bookingData.base_cost.toLocaleString()}</span>
                  </div>
                  
                  {guideDetails && (
                    <div className="flex justify-between">
                      <span className="flex items-center">
                        <User size={16} className="mr-1" />
                        Guide: {guideDetails.name} ({packageDetails.duration_days} days)
                      </span>
                      <span>₹{bookingData.guide_cost.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between pt-2 border-t border-gray-200 font-semibold">
                    <span>Total Amount</span>
                    <span className="text-primary">₹{totalCost.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Back to Package
            </Button>
            <Button size="lg" onClick={handleConfirmBooking}>
              Confirm Booking
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingConfirmPage;
