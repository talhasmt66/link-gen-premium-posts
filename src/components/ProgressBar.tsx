
import useAuth from '@/hooks/useAuth';

interface ProgressBarProps {
  className?: string;
}

export default function ProgressBar({ className = '' }: ProgressBarProps) {
  const { user } = useAuth();
  
  if (!user || user.role === 'premium') {
    return null;
  }
  
  const postCount = user.postCount || 0;
  const maxPosts = 20;
  const percentage = Math.min((postCount / maxPosts) * 100, 100);

  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex justify-between text-sm">
        <span>{postCount} / {maxPosts} posts used</span>
        {postCount >= maxPosts && (
          <span className="text-destructive font-medium">Limit reached</span>
        )}
      </div>
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${percentage < 75 ? 'bg-linkedin-blue' : percentage < 90 ? 'bg-amber-500' : 'bg-destructive'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
