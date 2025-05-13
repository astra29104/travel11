
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

// Type definitions
export interface Destination {
  id: string;
  name: string;
  description: string;
  image_url: string;
  highlights: string[];
  category: string;
  popular_foods: string[];
}

export interface Place {
  id: string;
  destination_id: string;
  name: string;
  description: string;
  image_url: string;
}

export interface Package {
  id: string;
  destination_id: string;
  title: string;
  description: string;
  places_covered: string[];
  duration_days: number;
  itinerary: string[];
  cost: number;
  image_url: string;
}

export interface Guide {
  id: string;
  name: string;
  contact: string;
  experience: number;
  languages: string[];
  rating: number;
  destination_id: string;
  price_per_day: number;
  image_url: string;
}

export interface BookingData {
  id?: string;
  user_id: string;
  package_id: string;
  guide_id?: string;
  travel_dates: string[];
  booking_status: string;
  total_cost: number;
}

export interface Booking extends BookingData {
  id: string;
  created_at: string;
}

// Destination functions
export const getDestinations = async (): Promise<Destination[]> => {
  try {
    const { data, error } = await supabase
      .from('destinations')
      .select('*');
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching destinations:', error);
    toast({
      title: 'Error',
      description: 'Failed to load destinations',
      variant: 'destructive',
    });
    return [];
  }
};

export const getDestinationById = async (id: string): Promise<Destination | null> => {
  try {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching destination ${id}:`, error);
    toast({
      title: 'Error',
      description: 'Failed to load destination details',
      variant: 'destructive',
    });
    return null;
  }
};

export const getDestinationsByCategory = async (category: string): Promise<Destination[]> => {
  try {
    if (category === 'All') {
      return await getDestinations();
    }
    
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .eq('category', category);
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(`Error fetching destinations by category ${category}:`, error);
    toast({
      title: 'Error',
      description: 'Failed to load destinations by category',
      variant: 'destructive',
    });
    return [];
  }
};

// Places functions
export const getPlacesByDestinationId = async (destinationId: string): Promise<Place[]> => {
  try {
    const { data, error } = await supabase
      .from('places')
      .select('*')
      .eq('destination_id', destinationId);
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(`Error fetching places for destination ${destinationId}:`, error);
    toast({
      title: 'Error',
      description: 'Failed to load places',
      variant: 'destructive',
    });
    return [];
  }
};

export const getPlacesByIds = async (placeIds: string[]): Promise<Place[]> => {
  try {
    if (placeIds.length === 0) return [];
    
    const { data, error } = await supabase
      .from('places')
      .select('*')
      .in('id', placeIds);
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching places by IDs:', error);
    toast({
      title: 'Error',
      description: 'Failed to load places',
      variant: 'destructive',
    });
    return [];
  }
};

// Packages functions
export const getPackages = async (): Promise<Package[]> => {
  try {
    const { data, error } = await supabase
      .from('packages')
      .select('*');
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching packages:', error);
    toast({
      title: 'Error',
      description: 'Failed to load packages',
      variant: 'destructive',
    });
    return [];
  }
};

export const getPackageById = async (id: string): Promise<Package | null> => {
  try {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching package ${id}:`, error);
    toast({
      title: 'Error',
      description: 'Failed to load package details',
      variant: 'destructive',
    });
    return null;
  }
};

export const getPackagesByDestinationId = async (destinationId: string): Promise<Package[]> => {
  try {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('destination_id', destinationId);
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(`Error fetching packages for destination ${destinationId}:`, error);
    toast({
      title: 'Error',
      description: 'Failed to load packages',
      variant: 'destructive',
    });
    return [];
  }
};

// Guides functions
export const getGuideById = async (id: string): Promise<Guide | null> => {
  try {
    const { data, error } = await supabase
      .from('guides')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching guide ${id}:`, error);
    toast({
      title: 'Error',
      description: 'Failed to load guide details',
      variant: 'destructive',
    });
    return null;
  }
};

export const getGuidesByDestinationId = async (destinationId: string): Promise<Guide[]> => {
  try {
    const { data, error } = await supabase
      .from('guides')
      .select('*')
      .eq('destination_id', destinationId);
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(`Error fetching guides for destination ${destinationId}:`, error);
    toast({
      title: 'Error',
      description: 'Failed to load guides',
      variant: 'destructive',
    });
    return [];
  }
};

// Bookings functions
export const getBookingsByUserId = async (userId: string): Promise<Booking[]> => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(`Error fetching bookings for user ${userId}:`, error);
    toast({
      title: 'Error',
      description: 'Failed to load your bookings',
      variant: 'destructive',
    });
    return [];
  }
};

export const getBookingById = async (bookingId: string, userId: string): Promise<Booking | null> => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .eq('user_id', userId)
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching booking ${bookingId}:`, error);
    toast({
      title: 'Error',
      description: 'Failed to load booking details',
      variant: 'destructive',
    });
    return null;
  }
};

export const createBooking = async (bookingData: BookingData): Promise<Booking | null> => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert(bookingData)
      .select()
      .single();
      
    if (error) throw error;
    
    toast({
      title: 'Success',
      description: 'Booking created successfully',
    });
    
    return data;
  } catch (error) {
    console.error('Error creating booking:', error);
    toast({
      title: 'Error',
      description: 'Failed to create booking',
      variant: 'destructive',
    });
    return null;
  }
};
