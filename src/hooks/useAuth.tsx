
import { useAuthUser, useSignIn, useSignOut } from 'react-auth-kit';
import { authOptions, User } from '@/lib/auth';

export const useAuth = () => {
  // Use the hooks without type parameters since the current version doesn't support them
  const authUser = useAuthUser();
  const signIn = useSignIn();
  const signOut = useSignOut();
  
  // Get user data from auth state
  const user = authUser();
  
  const googleSignIn = async () => {
    // In a real app, this would open Google OAuth
    // For now, we'll simulate a successful sign-in
    const userData = {
      name: "Demo User",
      email: "demo@example.com",
      image: "/placeholder.svg"
    };
    
    const result = await authOptions.signIn(userData);
    
    if (result.isSuccess) {
      signIn({
        token: "demo-token",
        tokenType: "Bearer",
        authState: result.user
      });
      return true;
    }
    
    return false;
  };
  
  const logout = () => {
    signOut();
  };
  
  return {
    user,
    status: user ? "authenticated" : "unauthenticated",
    signIn: googleSignIn,
    signOut: logout
  };
};

export default useAuth;
