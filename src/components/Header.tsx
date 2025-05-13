
import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LinkedinIcon } from 'lucide-react';

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
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
        <div className="flex items-center gap-2" onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
          <LinkedinIcon className="h-8 w-8 text-linkedin-blue" />
          <h1 className="text-xl font-bold">LinkedIn Post Generator</h1>
        </div>
        <nav className="flex items-center gap-4">
          {status === 'authenticated' ? (
            <>
              <Button
                variant="ghost"
                onClick={() => router.push('/generator')}
              >
                Generator
              </Button>
              <Button
                variant="ghost"
                onClick={() => router.push('/posts')}
              >
                My Posts
              </Button>
              <div className="flex items-center gap-2">
                <div className="flex flex-col text-sm">
                  <span className="font-medium">{session.user.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {session.user.role === 'premium' ? '✨ Premium' : 'Free'}
                  </span>
                </div>
                <img 
                  src={session.user.image || '/placeholder.svg'} 
                  alt={session.user.name || 'User'} 
                  className="h-8 w-8 rounded-full"
                />
                <Button variant="ghost" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </div>
            </>
          ) : (
            <Button onClick={() => signIn('google')}>Sign In</Button>
          )}
        </nav>
      </div>
    </header>
  );
}
