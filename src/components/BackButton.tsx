
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BackButtonProps {
  label?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ label = 'Back' }) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      onClick={() => navigate(-1)}
      className="flex items-center text-gray-600 hover:text-gray-900"
    >
      <ChevronLeft size={18} className="mr-1" />
      {label}
    </Button>
  );
};

export default BackButton;
