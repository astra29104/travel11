
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { destinations } from '@/services/mockData';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (query.trim()) {
      // Find the destination that matches the query
      const destination = destinations.find(
        (dest) => dest.name.toLowerCase() === query.toLowerCase()
      );
      
      if (destination) {
        navigate(`/destinations/${destination.destination_id}`);
      } else {
        // If no exact match, go to destinations page with search query
        navigate(`/destinations?search=${encodeURIComponent(query)}`);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim()) {
      // Filter destinations that match the query
      const filtered = destinations
        .filter((dest) => 
          dest.name.toLowerCase().includes(value.toLowerCase())
        )
        .map((dest) => dest.name);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setSuggestions([]);
    
    // Find the destination that matches the suggestion
    const destination = destinations.find(
      (dest) => dest.name.toLowerCase() === suggestion.toLowerCase()
    );
    
    if (destination) {
      navigate(`/destinations/${destination.destination_id}`);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="flex items-center">
        <Input
          type="text"
          placeholder="Search for destinations..."
          className="rounded-l-md focus-visible:ring-primary pr-10"
          value={query}
          onChange={handleInputChange}
        />
        <Button type="submit" className="rounded-l-none">
          <Search size={20} className="mr-2" />
          Search
        </Button>
      </form>

      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg z-20 max-h-60 overflow-auto">
          <ul>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
