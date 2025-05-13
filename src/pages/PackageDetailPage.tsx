
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  getPackageById, 
  getDestinationById,
  getPlacesByIds,
  getGuidesByDestinationId,
  Guide
} from '@/services/mockData';
import BackButton from '@/components/BackButton';
import PlaceCard from '@/components/PlaceCard';
import GuideCard from '@/components/GuideCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CalendarIcon, 
  Clock, 
  DollarSign, 
  MapPin, 
  Calendar
} from 'lucide-react';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';

const PackageDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const packageData = id ? getPackageById(id) : undefined;
  const destination = packageData ? getDestinationById(packageData.destination_id) : undefined;
  const places = packageData ? getPlacesByIds(packageData.places_covered) : [];
  const availableGuides = packageData && destination ? getGuidesByDestinationId(destination.destination_id) : [];
  
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  
  if (!packageData || !destination) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Package not found</h1>
          <Link to="/destinations">
            <Button>Browse Destinations</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };
  
  const handleGuideSelect = (guide: Guide) => {
    if (selectedGuide && selectedGuide.guide_id === guide.guide_id) {
      setSelectedGuide(null);
    } else {
      setSelectedGuide(guide);
    }
  };
  
  const handleBooking = () => {
    if (!isAuthenticated) {
      // Store the package ID in session storage to redirect back after login
      sessionStorage.setItem('pendingBookingPackage', packageData.package_id);
      toast.info("Please log in to book this package");
      navigate('/login');
      return;
    }
    
    if (!selectedDate) {
      toast.error("Please select a travel date");
      return;
    }
    
    // Calculate end date based on package duration
    const endDate = new Date(selectedDate);
    endDate.setDate(endDate.getDate() + packageData.duration_days - 1);
    
    // Prepare booking data to pass to confirmation page
    const bookingData = {
      package_id: packageData.package_id,
      guide_id: selectedGuide?.guide_id || null,
      travel_date: selectedDate.toISOString(),
      end_date: endDate.toISOString(),
      base_cost: packageData.cost,
      guide_cost: selectedGuide ? selectedGuide.price_per_day * packageData.duration_days : 0,
    };
    
    // Navigate to booking confirmation page with data
    navigate('/booking/confirm', { 
      state: { 
        bookingData,
        packageDetails: packageData,
        guideDetails: selectedGuide,
        destinationName: destination.name
      } 
    });
  };

  // Calculate total cost including guide if selected
  const totalCost = packageData.cost + (selectedGuide ? selectedGuide.price_per_day * packageData.duration_days : 0);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <BackButton label="Back to Packages" />
        </div>
        
        {/* Package Header */}
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 mr-2">
              {destination.category}
            </Badge>
            <h3 className="text-gray-600 flex items-center">
              <MapPin size={16} className="mr-1" />
              {destination.name}
            </h3>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">{packageData.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-600">
            <div className="flex items-center">
              <Clock size={18} className="mr-1" />
              {packageData.duration_days} Days
            </div>
            <div className="flex items-center text-primary font-semibold">
              <DollarSign size={18} className="mr-1" />
              ₹{packageData.cost.toLocaleString()}
            </div>
          </div>
        </div>
        
        {/* Main content area with image and description */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <img 
              src={packageData.image_url} 
              alt={packageData.title}
              className="w-full h-72 object-cover rounded-lg mb-6"
            />
            
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-6">
                {packageData.description}
              </p>
              
              <h2 className="text-2xl font-bold mb-4">Detailed Itinerary</h2>
              <ul className="space-y-4 mb-6">
                {packageData.itinerary.map((day, index) => (
                  <li key={index} className="bg-gray-50 p-4 rounded-lg">
                    <span className="font-semibold block mb-1">{day.split(':')[0]}:</span>
                    <span className="text-gray-600">{day.split(':').slice(1).join(':').trim()}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Booking sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 sticky top-20">
              <h3 className="text-xl font-bold mb-4">Book This Package</h3>
              
              {/* Date Selection */}
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">Select Start Date</p>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? (
                        format(selectedDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      initialFocus
                      disabled={(date) => {
                        // Disable dates in the past
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today;
                      }}
                    />
                  </PopoverContent>
                </Popover>
                
                {selectedDate && (
                  <div className="mt-4 text-sm text-gray-600">
                    <div className="flex justify-between mb-2">
                      <span>Start Date:</span>
                      <span>{format(selectedDate, "PPP")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>End Date:</span>
                      <span>
                        {format(
                          new Date(
                            new Date(selectedDate).setDate(
                              selectedDate.getDate() + packageData.duration_days - 1
                            )
                          ),
                          "PPP"
                        )}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Cost Summary */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Package Cost</span>
                  <span>₹{packageData.cost.toLocaleString()}</span>
                </div>
                {selectedGuide && (
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">
                      Guide ({packageData.duration_days} days)
                    </span>
                    <span>₹{(selectedGuide.price_per_day * packageData.duration_days).toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t border-gray-300 my-2 pt-2 flex justify-between font-bold">
                  <span>Total Cost</span>
                  <span className="text-primary">₹{totalCost.toLocaleString()}</span>
                </div>
              </div>
              
              <Button 
                className="w-full mb-4" 
                size="lg"
                onClick={handleBooking}
                disabled={!selectedDate}
              >
                Book Now
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                No payment required at this time
              </p>
            </div>
          </div>
        </div>
        
        {/* Places Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Places You'll Visit</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place) => (
              <PlaceCard key={place.place_id} place={place} />
            ))}
          </div>
        </section>
        
        {/* Available Guides */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Available Guides</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableGuides.map((guide) => (
              <GuideCard 
                key={guide.guide_id} 
                guide={guide}
                selected={selectedGuide?.guide_id === guide.guide_id}
                onSelect={() => handleGuideSelect(guide)}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            <Calendar size={16} className="inline mr-1" />
            Guides availability is subject to change. Final confirmation will be made after booking.
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default PackageDetailPage;
