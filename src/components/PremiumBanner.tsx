
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SparklesIcon } from 'lucide-react';

export default function PremiumBanner() {
  const navigate = useNavigate();
  
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 rounded-lg text-white">
      <div className="flex items-center gap-3 mb-2">
        <SparklesIcon className="h-5 w-5" />
        <h3 className="font-semibold text-lg">Upgrade to Premium</h3>
      </div>
      <p className="mb-3 text-sm">
        You've reached your free post limit. Upgrade to Premium for unlimited posts!
      </p>
      <Button 
        onClick={() => navigate('/pricing')} 
        variant="secondary" 
        className="w-full bg-white text-purple-700 hover:bg-gray-100"
      >
        Upgrade Now
      </Button>
    </div>
  );
}
