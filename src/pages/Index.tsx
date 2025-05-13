
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LinkedinIcon, Sparkles } from 'lucide-react';
import useAuth from '@/hooks/useAuth';

export default function Index() {
  const { status, signIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'authenticated') {
      navigate('/generator');
    }
  }, [status, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4 py-24">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center mb-6">
            <LinkedinIcon size={48} className="text-linkedin-blue mr-2" />
            <h1 className="text-4xl font-bold">LinkedIn Post Generator</h1>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-medium text-gray-800 max-w-2xl mb-6">
            Create engaging LinkedIn posts in seconds with AI
          </h2>
          
          <p className="text-gray-600 max-w-xl mb-8">
            Generate professional, attention-grabbing LinkedIn content tailored to your topic, tone, and style preferences. Free users get 20 posts, premium users enjoy unlimited generation.
          </p>
          
          <div className="space-y-4">
            <Button 
              size="lg"
              className="bg-linkedin-blue hover:bg-linkedin-darkBlue text-white px-8"
              onClick={() => status === 'authenticated' ? navigate('/generator') : signIn()}
            >
              {status === 'authenticated' ? 'Go to Generator' : 'Sign in with Google'}
            </Button>
            
            {status !== 'authenticated' && (
              <div className="text-sm text-gray-500">
                No account? Sign in with Google to get started.
              </div>
            )}
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Professional Content</h3>
            <p className="text-gray-600">
              Generate content that resonates with your professional network and showcases your expertise.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Multiple Styles</h3>
            <p className="text-gray-600">
              Choose from various tones and styles including storytelling, how-to guides, and opinion pieces.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <Sparkles className="h-5 w-5 text-yellow-500 mr-2" />
              Premium Benefits
            </h3>
            <p className="text-gray-600 mb-4">
              Upgrade to premium for unlimited post generation and priority support.
            </p>
            <Button 
              variant="outline" 
              className="mt-auto"
              onClick={() => navigate('/pricing')}
            >
              View Pricing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
