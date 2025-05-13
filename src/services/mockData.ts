
// Mock data types
export interface Destination {
  destination_id: string;
  name: string;
  description: string;
  image_url: string;
  highlights: string[];
  category: string;
  popular_foods: string[];
}

export interface Place {
  place_id: string;
  destination_id: string;
  name: string;
  description: string;
  image_url: string;
}

export interface Package {
  package_id: string;
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
  guide_id: string;
  name: string;
  contact: string;
  experience: number;
  languages: string[];
  rating: number;
  destination_id: string;
  price_per_day: number;
  image_url: string;
}

export interface Booking {
  booking_id: string;
  user_id: string;
  package_id: string;
  guide_id: string;
  travel_dates: string[];
  booking_status: string;
  total_cost: number;
  created_at: string;
}

// Mock data
export const destinations: Destination[] = [
  {
    destination_id: "dest-001",
    name: "Goa",
    description: "Goa is a state on the southwestern coast of India within the region known as the Konkan. It is bounded by the state of Maharashtra to the north and by Karnataka to the east and south, with the Arabian Sea forming its western coast.",
    image_url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000",
    highlights: ["Beautiful beaches", "Vibrant nightlife", "Portuguese architecture", "Water sports"],
    category: "Beaches",
    popular_foods: ["Fish curry", "Prawn balchão", "Bebinca", "Feni"]
  },
  {
    destination_id: "dest-002",
    name: "Manali",
    description: "Manali is a high-altitude Himalayan resort town in India's northern Himachal Pradesh state. It has a reputation as a backpacking center and honeymoon destination. Set on the Beas River, it's a gateway for skiing in the Solang Valley and trekking in Parvati Valley.",
    image_url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1000",
    highlights: ["Solang Valley", "Rohtang Pass", "Hadimba Temple", "Adventure sports"],
    category: "Mountains",
    popular_foods: ["Siddu", "Babru", "Aktori", "Kullu Trout"]
  },
  {
    destination_id: "dest-003",
    name: "Rajasthan",
    description: "Rajasthan is a state in northern India. The state covers an area of 342,239 square kilometres or 10.4 percent of the total geographical area of India. It is the largest Indian state by area and the seventh largest by population.",
    image_url: "https://images.unsplash.com/photo-1599661046827-deaf6b506cc7?q=80&w=1000",
    highlights: ["Magnificent forts", "Desert safari", "Palace hotels", "Rich culture"],
    category: "Historical",
    popular_foods: ["Dal Baati Churma", "Laal Maas", "Gatte ki Sabzi", "Ghevar"]
  },
  {
    destination_id: "dest-004",
    name: "Kerala",
    description: "Kerala is a state on the southwestern Malabar Coast of India. It was formed on 1 November 1956, following the passage of the States Reorganisation Act, by combining Malayalam-speaking regions of the erstwhile states of Travancore-Cochin and Madras.",
    image_url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1000",
    highlights: ["Backwaters", "Ayurveda treatments", "Wildlife sanctuaries", "Tea plantations"],
    category: "Nature",
    popular_foods: ["Appam with Stew", "Kerala Prawn Curry", "Puttu", "Payasam"]
  },
  {
    destination_id: "dest-005",
    name: "Darjeeling",
    description: "Darjeeling is a town in India's West Bengal state, in the Himalayan foothills. Once a summer resort for the British Raj elite, it remains the terminus of the narrow-gauge Darjeeling Himalayan Railway, or "Toy Train," completed in 1881.",
    image_url: "https://images.unsplash.com/photo-1544634076-a90160dfa229?q=80&w=1000",
    highlights: ["Tea gardens", "Tiger Hill sunrise", "Himalayan Mountaineering Institute", "Toy train ride"],
    category: "Mountains",
    popular_foods: ["Momos", "Thukpa", "Sel Roti", "Darjeeling Tea"]
  },
  {
    destination_id: "dest-006",
    name: "Andaman Islands",
    description: "The Andaman Islands are an Indian archipelago in the Bay of Bengal. These roughly 300 islands are known for their palm-lined, white-sand beaches, mangroves and tropical rainforests. Coral reefs supporting marine life such as sharks and rays make for popular diving and snorkeling sites.",
    image_url: "https://images.unsplash.com/photo-1621624666561-84d0108d3a06?q=80&w=1000",
    highlights: ["Radhanagar Beach", "Cellular Jail", "Water sports", "Limestone caves"],
    category: "Beaches",
    popular_foods: ["Grilled Fish", "Coconut Prawn Curry", "Macher Jhol", "Fresh Seafood"]
  }
];

export const places: Place[] = [
  // Goa places
  {
    place_id: "place-001",
    destination_id: "dest-001",
    name: "Calangute Beach",
    description: "Calangute is the largest beach in North Goa and one of the most popular beaches in Goa. It is a hub for tourists and backpackers who visit Goa.",
    image_url: "https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=1000"
  },
  {
    place_id: "place-002",
    destination_id: "dest-001",
    name: "Fort Aguada",
    description: "Fort Aguada is a well-preserved 17th-century Portuguese fort looking out at the confluence of the Mandovi River and the Arabian Sea.",
    image_url: "https://images.unsplash.com/photo-1583395838144-08821535f823?q=80&w=1000"
  },
  {
    place_id: "place-003",
    destination_id: "dest-001",
    name: "Basilica of Bom Jesus",
    description: "The Basilica of Bom Jesus is a Roman Catholic basilica located in Goa, India, and is part of the Churches and convents of Goa UNESCO World Heritage Site.",
    image_url: "https://images.unsplash.com/photo-1587129228074-4b59894fa8b3?q=80&w=1000"
  },
  
  // Manali places
  {
    place_id: "place-004",
    destination_id: "dest-002",
    name: "Solang Valley",
    description: "Solang Valley is a side valley at the top of the Kullu Valley in Himachal Pradesh, India. It offers stunning views of glaciers and snow-capped mountains.",
    image_url: "https://images.unsplash.com/photo-1600693363005-5e7edc8a8eac?q=80&w=1000"
  },
  {
    place_id: "place-005",
    destination_id: "dest-002",
    name: "Rohtang Pass",
    description: "Rohtang Pass is a high mountain pass on the eastern Pir Panjal Range of the Himalayas. It connects the Kullu Valley with the Lahaul and Spiti Valleys of Himachal Pradesh.",
    image_url: "https://images.unsplash.com/photo-1585484173186-5f8b2f9c1ef1?q=80&w=1000"
  },
  {
    place_id: "place-006",
    destination_id: "dest-002",
    name: "Hadimba Temple",
    description: "Hadimba Temple is an ancient cave temple dedicated to Hadimba Devi, who was the wife of Bhima from the Hindu epic Mahabharata.",
    image_url: "https://images.unsplash.com/photo-1589881133595-a3c085cb731d?q=80&w=1000"
  },
  
  // Rajasthan places
  {
    place_id: "place-007",
    destination_id: "dest-003",
    name: "Amber Fort",
    description: "Amber Fort is a fort located in Amer, Rajasthan. It is known for its artistic style elements, blending both Hindu and Muslim architecture.",
    image_url: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1000"
  },
  {
    place_id: "place-008",
    destination_id: "dest-003",
    name: "Hawa Mahal",
    description: "Hawa Mahal is a palace in Jaipur, built from red and pink sandstone. It was constructed in 1799 by Maharaja Sawai Pratap Singh.",
    image_url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1000"
  },
  {
    place_id: "place-009",
    destination_id: "dest-003",
    name: "Jaisalmer Fort",
    description: "Jaisalmer Fort is a large fort in the city of Jaisalmer, in the Indian state of Rajasthan. It is one of the largest fully preserved fortified cities in the world.",
    image_url: "https://images.unsplash.com/photo-1624461776513-99ec1876e806?q=80&w=1000"
  }
];

export const packages: Package[] = [
  // Goa packages
  {
    package_id: "pkg-001",
    destination_id: "dest-001",
    title: "Goa Beach Getaway",
    description: "Experience the best beaches and nightlife that Goa has to offer with this complete beach getaway package.",
    places_covered: ["place-001", "place-002", "place-003"],
    duration_days: 5,
    itinerary: [
      "Day 1: Arrival and check-in, evening at Calangute Beach",
      "Day 2: Water sports at Baga Beach, evening beach party",
      "Day 3: Visit to Fort Aguada and nearby attractions",
      "Day 4: Visit to Old Goa and Basilica of Bom Jesus",
      "Day 5: Leisure day at the beach, departure"
    ],
    cost: 25000,
    image_url: "https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf?q=80&w=1000"
  },
  {
    package_id: "pkg-002",
    destination_id: "dest-001",
    title: "Goa Cultural Heritage",
    description: "Explore the rich Portuguese heritage and cultural sites of Goa with this comprehensive cultural tour.",
    places_covered: ["place-002", "place-003"],
    duration_days: 4,
    itinerary: [
      "Day 1: Arrival and check-in, visit to Fontainhas Latin Quarter",
      "Day 2: Tour of Old Goa churches including Basilica of Bom Jesus",
      "Day 3: Visit to Fort Aguada and Reis Magos Fort",
      "Day 4: Local market exploration, departure"
    ],
    cost: 20000,
    image_url: "https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=1000"
  },
  
  // Manali packages
  {
    package_id: "pkg-003",
    destination_id: "dest-002",
    title: "Manali Adventure Week",
    description: "An action-packed week of adventure activities in the beautiful mountains of Manali.",
    places_covered: ["place-004", "place-005", "place-006"],
    duration_days: 7,
    itinerary: [
      "Day 1: Arrival and check-in, orientation walk",
      "Day 2: River rafting in Beas River",
      "Day 3: Trekking to Solang Valley",
      "Day 4: Paragliding and zipline adventures",
      "Day 5: Excursion to Rohtang Pass (weather permitting)",
      "Day 6: Visit to Hadimba Temple and other local attractions",
      "Day 7: Shopping in Mall Road, departure"
    ],
    cost: 35000,
    image_url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1000"
  },
  {
    package_id: "pkg-004",
    destination_id: "dest-002",
    title: "Manali Honeymoon Special",
    description: "A romantic getaway in the picturesque landscapes of Manali, perfect for honeymooners.",
    places_covered: ["place-004", "place-006"],
    duration_days: 5,
    itinerary: [
      "Day 1: Arrival and check-in to premium resort, welcome dinner",
      "Day 2: Private tour to Solang Valley, evening bonfire",
      "Day 3: Couple's adventure activities (optional), spa session",
      "Day 4: Visit to Hadimba Temple, romantic dinner",
      "Day 5: Leisure morning, departure"
    ],
    cost: 40000,
    image_url: "https://images.unsplash.com/photo-1585484173186-5f8b2f9c1ef1?q=80&w=1000"
  },
  
  // Rajasthan packages
  {
    package_id: "pkg-005",
    destination_id: "dest-003",
    title: "Royal Rajasthan Tour",
    description: "Experience the royal heritage of Rajasthan with visits to palaces, forts, and cultural experiences.",
    places_covered: ["place-007", "place-008", "place-009"],
    duration_days: 8,
    itinerary: [
      "Day 1: Arrival in Jaipur, check-in",
      "Day 2: Amber Fort and Jaipur city tour",
      "Day 3: Hawa Mahal and local markets",
      "Day 4: Travel to Jodhpur, visit Mehrangarh Fort",
      "Day 5: Jodhpur city tour",
      "Day 6: Travel to Jaisalmer",
      "Day 7: Jaisalmer Fort and desert safari",
      "Day 8: Return journey, departure"
    ],
    cost: 45000,
    image_url: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1000"
  },
  {
    package_id: "pkg-006",
    destination_id: "dest-003",
    title: "Desert Safari Adventure",
    description: "Explore the Thar Desert with camel safaris, cultural performances, and authentic Rajasthani experiences.",
    places_covered: ["place-009"],
    duration_days: 4,
    itinerary: [
      "Day 1: Arrival in Jaisalmer, check-in",
      "Day 2: Jaisalmer Fort tour, preparation for desert camp",
      "Day 3: Full day desert safari with overnight stay in desert camp",
      "Day 4: Return from desert camp, departure"
    ],
    cost: 25000,
    image_url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1000"
  }
];

export const guides: Guide[] = [
  // Goa guides
  {
    guide_id: "guide-001",
    name: "Rohit Sharma",
    contact: "rohit@goatours.com",
    experience: 8,
    languages: ["English", "Hindi", "Konkani"],
    rating: 4.8,
    destination_id: "dest-001",
    price_per_day: 2500,
    image_url: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    guide_id: "guide-002",
    name: "Maria Fernandes",
    contact: "maria@goatours.com",
    experience: 6,
    languages: ["English", "Portuguese", "Hindi"],
    rating: 4.9,
    destination_id: "dest-001",
    price_per_day: 3000,
    image_url: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  
  // Manali guides
  {
    guide_id: "guide-003",
    name: "Vikram Singh",
    contact: "vikram@himalayanguides.com",
    experience: 10,
    languages: ["English", "Hindi", "Pahari"],
    rating: 4.7,
    destination_id: "dest-002",
    price_per_day: 2800,
    image_url: "https://randomuser.me/api/portraits/men/77.jpg"
  },
  {
    guide_id: "guide-004",
    name: "Nima Sherpa",
    contact: "nima@himalayanguides.com",
    experience: 12,
    languages: ["English", "Hindi", "Nepali", "Tibetan"],
    rating: 5.0,
    destination_id: "dest-002",
    price_per_day: 3500,
    image_url: "https://randomuser.me/api/portraits/men/42.jpg"
  },
  
  // Rajasthan guides
  {
    guide_id: "guide-005",
    name: "Aditya Rathore",
    contact: "aditya@rajasthantours.com",
    experience: 15,
    languages: ["English", "Hindi", "German", "French"],
    rating: 4.9,
    destination_id: "dest-003",
    price_per_day: 3200,
    image_url: "https://randomuser.me/api/portraits/men/17.jpg"
  },
  {
    guide_id: "guide-006",
    name: "Priya Meena",
    contact: "priya@rajasthantours.com",
    experience: 7,
    languages: ["English", "Hindi", "Japanese"],
    rating: 4.6,
    destination_id: "dest-003",
    price_per_day: 2700,
    image_url: "https://randomuser.me/api/portraits/women/82.jpg"
  }
];

// Function to get bookings by user ID
export const getBookingsByUserId = (userId: string): Booking[] => {
  // In a real app, this would be fetched from an API
  return mockBookings.filter(booking => booking.user_id === userId);
};

// Function to create a new booking
export const createBooking = (bookingData: Omit<Booking, "booking_id" | "created_at">): Booking => {
  const newBooking: Booking = {
    booking_id: `booking-${Date.now()}`,
    ...bookingData,
    created_at: new Date().toISOString(),
  };
  
  // In a real app, this would call an API to save the booking
  mockBookings.push(newBooking);
  return newBooking;
};

// Initial mock bookings (empty array to start)
const mockBookings: Booking[] = [];

// Export functions to get filtered data
export const getDestinationById = (id: string): Destination | undefined => {
  return destinations.find(dest => dest.destination_id === id);
};

export const getDestinationsByCategory = (category: string): Destination[] => {
  if (category === "All") {
    return destinations;
  }
  return destinations.filter(dest => dest.category === category);
};

export const getPlacesByDestinationId = (destinationId: string): Place[] => {
  return places.filter(place => place.destination_id === destinationId);
};

export const getPackagesByDestinationId = (destinationId: string): Package[] => {
  return packages.filter(pkg => pkg.destination_id === destinationId);
};

export const getPackageById = (id: string): Package | undefined => {
  return packages.find(pkg => pkg.package_id === id);
};

export const getGuidesByDestinationId = (destinationId: string): Guide[] => {
  return guides.filter(guide => guide.destination_id === destinationId);
};

export const getGuideById = (id: string): Guide | undefined => {
  return guides.find(guide => guide.guide_id === id);
};

export const getPlaceById = (id: string): Place | undefined => {
  return places.find(place => place.place_id === id);
};

export const getPlacesByIds = (ids: string[]): Place[] => {
  return places.filter(place => ids.includes(place.place_id));
};

// Admin-related functions
export const getAllBookings = (): Booking[] => {
  return [...mockBookings];
};
