
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Header from '@/components/Header';
import PostCard from '@/components/PostCard';
import { toast } from 'sonner';

interface Post {
  id: string;
  topic: string;
  tone: string;
  style: string;
  content: string;
  createdAt: string;
}

export default function Posts() {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) throw new Error('Failed to fetch posts');
        
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        toast.error('Failed to load posts');
      } finally {
        setIsLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchPosts();
    }
  }, [status]);

  const handlePostDelete = (deletedId: string) => {
    setPosts(posts.filter(post => post.id !== deletedId));
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container pt-24 pb-10">
        <h1 className="text-3xl font-bold mb-2">My LinkedIn Posts</h1>
        <p className="text-gray-600 mb-6">
          Manage and review your previously generated LinkedIn posts
        </p>

        {posts.length === 0 ? (
          <div className="bg-white rounded-lg border-2 border-dashed p-8 text-center">
            <h3 className="text-lg font-medium mb-2">No posts yet</h3>
            <p className="text-muted-foreground">
              Generate your first LinkedIn post to see it here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map(post => (
              <PostCard 
                key={post.id} 
                post={post} 
                onDelete={handlePostDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
