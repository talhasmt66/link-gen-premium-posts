
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LinkedinIcon } from 'lucide-react';
import useAuth from '@/hooks/useAuth';

export default function Header() {
  const { user, status, signIn, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-white shadow-sm">
      <div className="container flex justify-between items-center h-16">
        <div className="flex items-center gap-2" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <LinkedinIcon className="h-8 w-8 text-linkedin-blue" />
          <h1 className="text-xl font-bold">LinkedIn Post Generator</h1>
        </div>
        <nav className="flex items-center gap-4">
          {status === 'authenticated' ? (
            <>
              <Button
                variant="ghost"
                onClick={() => navigate('/generator')}
              >
                Generator
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate('/posts')}
              >
                My Posts
              </Button>
              <div className="flex items-center gap-2">
                <div className="flex flex-col text-sm">
                  <span className="font-medium">{user?.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {user?.role === 'premium' ? '✨ Premium' : 'Free'}
                  </span>
                </div>
                <img 
                  src={user?.image || '/placeholder.svg'} 
                  alt={user?.name || 'User'} 
                  className="h-8 w-8 rounded-full"
                />
                <Button variant="ghost" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </div>
            </>
          ) : (
            <Button onClick={() => signIn()}>Sign In</Button>
          )}
        </nav>
      </div>
    </header>
  );
}
