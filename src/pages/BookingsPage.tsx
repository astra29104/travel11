
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getBookingsByUserId, Booking } from '@/services/supabaseService';
import BookingCard from '@/components/BookingCard';
import { Button } from '@/components/ui/button';
import { Calendar, CalendarX } from 'lucide-react';
import Layout from '@/components/Layout';

const BookingsPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      
      setIsLoading(true);
      
      try {
        const bookingData = await getBookingsByUserId(user.id);
        setBookings(bookingData);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (isAuthenticated) {
      fetchBookings();
    } else {
      setIsLoading(false);
    }
  }, [user, isAuthenticated]);
  
  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Please Log In</h1>
            <p className="text-gray-600 mb-8">
              You need to be logged in to view your bookings.
            </p>
            <Link to="/login">
              <Button>Log In</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <p className="text-center py-12 text-gray-500">Loading your bookings...</p>
        </div>
      </Layout>
    );
  }

  // Separate bookings into upcoming and past
  const today = new Date();
  const upcomingBookings = bookings.filter(booking => {
    const lastTravelDate = new Date(booking.travel_dates[booking.travel_dates.length - 1]);
    return lastTravelDate >= today;
  });
  
  const pastBookings = bookings.filter(booking => {
    const lastTravelDate = new Date(booking.travel_dates[booking.travel_dates.length - 1]);
    return lastTravelDate < today;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Bookings</h1>
        </div>
        
        {/* Upcoming Bookings */}
        <section className="mb-12">
          <div className="flex items-center mb-4">
            <Calendar size={20} className="mr-2 text-primary" />
            <h2 className="text-2xl font-bold">Upcoming Trips</h2>
          </div>
          
          {upcomingBookings.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {upcomingBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-600 mb-4">You don't have any upcoming trips</p>
              <Link to="/destinations">
                <Button>Explore Destinations</Button>
              </Link>
            </div>
          )}
        </section>
        
        {/* Past Bookings */}
        <section>
          <div className="flex items-center mb-4">
            <CalendarX size={20} className="mr-2 text-gray-600" />
            <h2 className="text-2xl font-bold">Past Trips</h2>
          </div>
          
          {pastBookings.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {pastBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-600">No past trips</p>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default BookingsPage;
