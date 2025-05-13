
import { createStore } from "react-auth-kit";
import useAuthUser from "react-auth-kit/useAuthUser";
import useSignIn from "react-auth-kit/useSignIn";
import useSignOut from "react-auth-kit/useSignOut";
import { authOptions, User } from '@/lib/auth';

export const useAuth = () => {
  const authUser = useAuthUser<User>();
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
        auth: {
          token: "demo-token",
          type: "Bearer",
        },
        userState: result.user
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
