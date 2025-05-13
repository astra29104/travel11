
import React from 'react';
import { Guide } from '@/services/supabaseService';
import { Star, Languages } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface GuideCardProps {
  guide: Guide;
  selected?: boolean;
  onSelect?: () => void;
}

const GuideCard: React.FC<GuideCardProps> = ({ 
  guide, 
  selected = false, 
  onSelect 
}) => {
  return (
    <div 
      className={`bg-white rounded-lg border p-4 transition-all ${
        selected 
          ? 'border-primary shadow-md ring-2 ring-primary/20' 
          : 'border-gray-200 hover:border-primary/50'
      }`}
      onClick={onSelect}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
    >
      <div className="flex items-start gap-4">
        <img 
          src={guide.image_url} 
          alt={guide.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
        />
        
        <div className="flex-1">
          <h3 className="font-bold text-lg">{guide.name}</h3>
          
          <div className="flex items-center mt-1 text-amber-500">
            <Star size={16} className="fill-amber-500" />
            <span className="ml-1 text-sm">{guide.rating} / 5</span>
            <span className="ml-2 text-sm text-gray-600">{guide.experience} years exp.</span>
          </div>
          
          <div className="flex items-center mt-2">
            <Languages size={16} className="text-gray-500" />
            <div className="ml-2 flex flex-wrap gap-1">
              {guide.languages.map((language, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {language}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="mt-3 flex items-center justify-between">
            <div className="text-primary font-semibold">₹{guide.price_per_day}/day</div>
            {onSelect && (
              <Badge variant={selected ? "default" : "outline"}>
                {selected ? "Selected" : "Select Guide"}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideCard;
