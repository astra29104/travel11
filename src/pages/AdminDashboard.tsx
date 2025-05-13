
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getAllBookings, destinations, packages, guides } from '@/services/mockData';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Package, Navigation, Compass, Home, LogOut } from 'lucide-react';

// Admin Dashboard Components
const AdminSidebar: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void }> = ({ 
  activeTab, 
  setActiveTab 
}) => {
  const { logout } = useAuth();
  
  return (
    <div className="bg-gray-800 text-white w-64 flex-shrink-0 min-h-screen">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
      </div>
      <nav className="p-2">
        <ul className="space-y-1">
          <li>
            <button
              className={`flex items-center w-full px-4 py-2 rounded-md ${
                activeTab === 'overview' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              <Home size={18} className="mr-2" />
              Overview
            </button>
          </li>
          <li>
            <button
              className={`flex items-center w-full px-4 py-2 rounded-md ${
                activeTab === 'destinations' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('destinations')}
            >
              <Navigation size={18} className="mr-2" />
              Destinations
            </button>
          </li>
          <li>
            <button
              className={`flex items-center w-full px-4 py-2 rounded-md ${
                activeTab === 'packages' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('packages')}
            >
              <Package size={18} className="mr-2" />
              Packages
            </button>
          </li>
          <li>
            <button
              className={`flex items-center w-full px-4 py-2 rounded-md ${
                activeTab === 'guides' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('guides')}
            >
              <Compass size={18} className="mr-2" />
              Guides
            </button>
          </li>
          <li>
            <button
              className={`flex items-center w-full px-4 py-2 rounded-md ${
                activeTab === 'bookings' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('bookings')}
            >
              <Users size={18} className="mr-2" />
              Bookings
            </button>
          </li>
        </ul>
      </nav>
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-gray-300 hover:text-white text-sm">
            View Site
          </Link>
          <Button 
            variant="ghost" 
            className="text-gray-300 hover:text-white"
            onClick={logout}
          >
            <LogOut size={16} className="mr-1" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

const OverviewTab: React.FC = () => {
  const bookings = getAllBookings();
  
  const chartData = [
    { name: 'Goa', bookings: bookings.filter(b => {
      const pkg = packages.find(p => p.package_id === b.package_id);
      return pkg && pkg.destination_id === 'dest-001';
    }).length },
    { name: 'Manali', bookings: bookings.filter(b => {
      const pkg = packages.find(p => p.package_id === b.package_id);
      return pkg && pkg.destination_id === 'dest-002';
    }).length },
    { name: 'Rajasthan', bookings: bookings.filter(b => {
      const pkg = packages.find(p => p.package_id === b.package_id);
      return pkg && pkg.destination_id === 'dest-003';
    }).length },
    { name: 'Kerala', bookings: bookings.filter(b => {
      const pkg = packages.find(p => p.package_id === b.package_id);
      return pkg && pkg.destination_id === 'dest-004';
    }).length },
  ];
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Destinations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{destinations.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Packages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{packages.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{bookings.length}</div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Bookings by Destination</CardTitle>
          <CardDescription>Overview of booking distribution across destinations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#0EA5E9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>Last 5 bookings made on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Package</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Amount</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 5).map((booking) => {
                  const pkg = packages.find(p => p.package_id === booking.package_id);
                  return (
                    <tr key={booking.booking_id} className="border-b">
                      <td className="px-4 py-2">{booking.booking_id.slice(-5)}</td>
                      <td className="px-4 py-2">{pkg ? pkg.title : 'Unknown'}</td>
                      <td className="px-4 py-2">
                        {booking.created_at ? format(new Date(booking.created_at), 'dd MMM yyyy') : 'N/A'}
                      </td>
                      <td className="px-4 py-2">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          booking.booking_status === 'Confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.booking_status}
                        </span>
                      </td>
                      <td className="px-4 py-2">₹{booking.total_cost.toLocaleString()}</td>
                    </tr>
                  );
                })}
                {bookings.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                      No bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const DestinationsTab: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Destinations</h1>
        <Button>Add Destination</Button>
      </div>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Highlights
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {destinations.map((destination) => (
              <tr key={destination.destination_id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img 
                        src={destination.image_url} 
                        alt={destination.name} 
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{destination.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                    {destination.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 line-clamp-1">
                    {destination.highlights.join(', ')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button variant="ghost" className="text-primary hover:text-primary/80">
                    Edit
                  </Button>
                  <Button variant="ghost" className="text-destructive hover:text-destructive/80">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PackagesTab: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Packages</h1>
        <Button>Add Package</Button>
      </div>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Destination
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cost
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {packages.map((pkg) => {
              const destination = destinations.find(d => d.destination_id === pkg.destination_id);
              
              return (
                <tr key={pkg.package_id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img 
                          src={pkg.image_url} 
                          alt={pkg.title} 
                          className="h-10 w-10 rounded object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{pkg.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {destination ? destination.name : 'Unknown'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{pkg.duration_days} days</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{pkg.cost.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="ghost" className="text-primary hover:text-primary/80">
                      Edit
                    </Button>
                    <Button variant="ghost" className="text-destructive hover:text-destructive/80">
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const GuidesTab: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Guides</h1>
        <Button>Add Guide</Button>
      </div>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Destination
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Languages
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fee
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {guides.map((guide) => {
              const destination = destinations.find(d => d.destination_id === guide.destination_id);
              
              return (
                <tr key={guide.guide_id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img 
                          src={guide.image_url} 
                          alt={guide.name} 
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{guide.name}</div>
                        <div className="text-sm text-gray-500">{guide.experience} years exp.</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {destination ? destination.name : 'Unknown'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {guide.languages.join(', ')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{guide.rating}/5</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">₹{guide.price_per_day}/day</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="ghost" className="text-primary hover:text-primary/80">
                      Edit
                    </Button>
                    <Button variant="ghost" className="text-destructive hover:text-destructive/80">
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const BookingsTab: React.FC = () => {
  const bookings = getAllBookings();
  
  const [activeStatus, setActiveStatus] = useState("all");
  
  const filteredBookings = activeStatus === "all" 
    ? bookings 
    : bookings.filter(b => b.booking_status.toLowerCase() === activeStatus);
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Bookings</h1>
      
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all" onClick={() => setActiveStatus("all")}>All</TabsTrigger>
          <TabsTrigger value="confirmed" onClick={() => setActiveStatus("confirmed")}>Confirmed</TabsTrigger>
          <TabsTrigger value="pending" onClick={() => setActiveStatus("pending")}>Pending</TabsTrigger>
          <TabsTrigger value="canceled" onClick={() => setActiveStatus("canceled")}>Canceled</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Booking ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Package
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Travel Dates
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => {
                const pkg = packages.find(p => p.package_id === booking.package_id);
                
                return (
                  <tr key={booking.booking_id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.booking_id.slice(-5)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {pkg ? pkg.title : 'Unknown Package'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.user_id.slice(-5)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking.travel_dates.length > 0 
                          ? `${format(new Date(booking.travel_dates[0]), 'dd MMM yyyy')} - 
                             ${format(new Date(booking.travel_dates[booking.travel_dates.length - 1]), 'dd MMM yyyy')}`
                          : 'N/A'
                        }
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${booking.booking_status === 'Confirmed' ? 'bg-green-100 text-green-800' : ''}
                        ${booking.booking_status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${booking.booking_status === 'Canceled' ? 'bg-red-100 text-red-800' : ''}
                      `}>
                        {booking.booking_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{booking.total_cost.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="ghost" className="text-primary hover:text-primary/80">
                        View
                      </Button>
                      <Button variant="ghost" className="text-destructive hover:text-destructive/80">
                        Cancel
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Redirect if not authenticated or not admin
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'destinations' && <DestinationsTab />}
        {activeTab === 'packages' && <PackagesTab />}
        {activeTab === 'guides' && <GuidesTab />}
        {activeTab === 'bookings' && <BookingsTab />}
      </div>
    </div>
  );
};

export default AdminDashboard;
