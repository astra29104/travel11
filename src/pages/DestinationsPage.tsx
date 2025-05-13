
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { destinations, getDestinationsByCategory } from '@/services/mockData';
import DestinationCard from '@/components/DestinationCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Layout from '@/components/Layout';

const categories = ['All', 'Beaches', 'Mountains', 'Historical', 'Nature'];

const DestinationsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filteredDestinations, setFilteredDestinations] = useState(destinations);

  useEffect(() => {
    // Filter destinations based on both search term and category
    let filtered = getDestinationsByCategory(selectedCategory);
    
    if (searchTerm) {
      filtered = filtered.filter(dest => 
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredDestinations(filtered);
  }, [searchTerm, selectedCategory]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // The filtering is already handled in the useEffect
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Explore Destinations</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover amazing places across India. Filter by category or search for your dream destination.
          </p>
        </div>
        
        {/* Filter and Search */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="w-full md:w-1/3">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-2/3">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </form>
            </div>
          </div>
        </div>
        
        {/* Results */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((destination) => (
              <DestinationCard key={destination.destination_id} destination={destination} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-600">No destinations found</h3>
            <p className="mt-2 text-gray-500">Try changing your search or filter criteria</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DestinationsPage;
