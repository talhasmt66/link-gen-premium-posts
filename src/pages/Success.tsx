
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircleIcon } from 'lucide-react';

export default function Success() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) return;
    
    // Here we could verify the payment status with a server-side call
    // but the webhook should handle the actual user role update
    
    // Add a small delay before redirecting
    const timer = setTimeout(() => {
      navigate('/generator');
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [sessionId, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        <div className="mb-4 flex justify-center">
          <CheckCircleIcon size={64} className="text-green-500" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
        <p className="mb-6 text-gray-600">
          Thank you for upgrading to Premium! Your account has been upgraded and you now have access to unlimited post generation.
        </p>
        <div className="space-y-3">
          <Button onClick={() => navigate('/generator')} className="w-full">
            Start Creating Posts
          </Button>
          <Button variant="outline" onClick={() => navigate('/posts')} className="w-full">
            View My Posts
          </Button>
        </div>
      </div>
    </div>
  );
}
