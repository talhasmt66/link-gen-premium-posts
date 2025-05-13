
import { useState } from 'react';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ProgressBar from './ProgressBar';
import PremiumBanner from './PremiumBanner';

export default function PostForm({ onPostGenerated }: { onPostGenerated: (post: any) => void }) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Professional');
  const [style, setStyle] = useState('Storytelling');

  const tones = [
    'Professional', 'Casual', 'Inspirational', 'Informative', 'Persuasive'
  ];

  const styles = [
    'Storytelling', 'Listicle', 'How-to', 'Opinion', 'Case Study', 'News Update'
  ];

  const isLimitReached = 
    session?.user.role === 'free' && 
    (session?.user.postCount || 0) >= 20;

  const generatePost = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!topic) {
      toast.error('Please enter a topic');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, tone, style }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate post');
      }

      const data = await response.json();
      onPostGenerated(data.post);
      toast.success('Post generated successfully!');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        {session?.user.role !== 'premium' && (
          <ProgressBar className="mb-4" />
        )}
        
        <form onSubmit={generatePost} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Input
              id="topic"
              placeholder="e.g., Remote work productivity tips"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={isLoading || isLimitReached}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tone">Tone</Label>
              <Select 
                value={tone} 
                onValueChange={setTone}
                disabled={isLoading || isLimitReached}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  {tones.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="style">Style</Label>
              <Select 
                value={style} 
                onValueChange={setStyle}
                disabled={isLoading || isLimitReached}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  {styles.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="pt-2">
            {isLimitReached ? (
              <PremiumBanner />
            ) : (
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || !topic}
              >
                {isLoading ? 'Generating...' : 'Generate LinkedIn Post'}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
