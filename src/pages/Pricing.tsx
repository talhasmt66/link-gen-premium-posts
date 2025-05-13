
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckIcon, Sparkles } from 'lucide-react';
import useAuth from '@/hooks/useAuth';

export default function Pricing() {
  const { user, status } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      // In a real app, this would call your payment API
      // For demo purposes, we'll simulate a successful checkout
      setTimeout(() => {
        toast.success('Payment successful!');
        navigate('/success');
      }, 1500);
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast.error('Failed to initiate checkout');
    } finally {
      setIsLoading(false);
    }
  };

  const isPremium = user?.role === 'premium';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container pt-24 pb-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Pricing Plans</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the right plan for your LinkedIn content creation needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className={`border ${isPremium ? 'border-muted' : ''}`}>
            <CardHeader>
              <CardTitle>Free Plan</CardTitle>
              <CardDescription>For casual LinkedIn users</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">$0</span>
                <span className="text-muted-foreground ml-1">/ forever</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckIcon className="h-4 w-4 mr-2 text-green-500" />
                  <span>20 LinkedIn posts</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-4 w-4 mr-2 text-green-500" />
                  <span>Multiple tones & styles</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-4 w-4 mr-2 text-green-500" />
                  <span>Save & manage posts</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" disabled className="w-full">
                Current Plan
              </Button>
            </CardFooter>
          </Card>

          <Card className={`border ${isPremium ? 'border-4 border-linkedin-blue' : ''} relative`}>
            {isPremium && (
              <div className="absolute -top-4 right-4 bg-linkedin-blue text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <Sparkles className="h-3 w-3 mr-1" />
                Your Plan
              </div>
            )}
            <CardHeader>
              <CardTitle className="flex items-center">
                Premium Plan
              </CardTitle>
              <CardDescription>For serious LinkedIn creators</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">$14.99</span>
                <span className="text-muted-foreground ml-1">/ one-time</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckIcon className="h-4 w-4 mr-2 text-green-500" />
                  <span className="font-semibold">Unlimited LinkedIn posts</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-4 w-4 mr-2 text-green-500" />
                  <span>Multiple tones & styles</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-4 w-4 mr-2 text-green-500" />
                  <span>Save & manage posts</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-4 w-4 mr-2 text-green-500" />
                  <span>Priority support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              {isPremium ? (
                <Button disabled className="w-full bg-linkedin-blue">
                  Current Plan
                </Button>
              ) : (
                <Button
                  onClick={handleCheckout}
                  disabled={isLoading || status !== 'authenticated'}
                  className="w-full bg-linkedin-blue hover:bg-linkedin-darkBlue"
                >
                  {isLoading ? 'Processing...' : 'Upgrade Now'}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Questions about our plans? <a href="#" className="text-linkedin-blue hover:underline">Contact us</a>
          </p>
        </div>
      </div>
    </div>
  );
}
