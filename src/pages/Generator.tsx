
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Header from '@/components/Header';
import PostForm from '@/components/PostForm';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CopyIcon, CheckIcon } from 'lucide-react';
import { toast } from 'sonner';

interface Post {
  id: string;
  topic: string;
  tone: string;
  style: string;
  content: string;
  createdAt: string;
}

export default function Generator() {
  const { data: session, status } = useSession();
  const [post, setPost] = useState<Post | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (!post) return;
    
    try {
      await navigator.clipboard.writeText(post.content);
      setIsCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy text');
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container pt-24 pb-10">
        <h1 className="text-3xl font-bold mb-2">LinkedIn Post Generator</h1>
        <p className="text-gray-600 mb-6">
          Fill in the details below to generate a professional LinkedIn post
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PostForm onPostGenerated={setPost} />
          
          <div>
            {post ? (
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Generated Post</h2>
                    <div className="flex gap-2 flex-wrap mb-2">
                      <div className="text-sm text-muted-foreground">
                        Topic: <span className="font-medium text-foreground">{post.topic}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Tone: <span className="font-medium text-foreground">{post.tone}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Style: <span className="font-medium text-foreground">{post.style}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border rounded-md p-4 linkedin-post mb-4">
                    {post.content}
                  </div>
                  
                  <Button 
                    onClick={handleCopy}
                    className="w-full"
                    variant="outline"
                  >
                    {isCopied ? (
                      <>
                        <CheckIcon className="h-4 w-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <CopyIcon className="h-4 w-4 mr-2" />
                        Copy to Clipboard
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="h-full flex items-center justify-center bg-white rounded-lg border-2 border-dashed p-8">
                <div className="text-center text-muted-foreground">
                  <h3 className="mb-2 text-lg font-medium">No Post Generated Yet</h3>
                  <p>Fill in the form and click "Generate LinkedIn Post" to create your content.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
