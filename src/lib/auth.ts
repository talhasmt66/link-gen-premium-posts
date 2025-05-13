
// Type definitions for user and session
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: "free" | "premium";
  postCount: number;
}

// Simplified auth options for Vite environment
export const authOptions = {
  signIn: async (credentials: { email: string; name: string; image?: string }) => {
    try {
      // In a real app, this would call an API to validate credentials
      // For now, we'll simulate a successful sign-in
      return {
        isSuccess: true,
        user: {
          id: `user-${Math.random().toString(36).substr(2, 9)}`,
          name: credentials.name,
          email: credentials.email,
          image: credentials.image,
          role: "free",
          postCount: 0
        } as User
      };
    } catch (error) {
      return {
        isSuccess: false,
        error: "Sign in failed"
      };
    }
  }
};

export const useAuthHelper = () => {
  // Helper functions for auth logic
  const getUser = (): User | null => {
    const authState = localStorage.getItem('_auth_state');
    return authState ? JSON.parse(authState) : null;
  };
  
  return {
    getUser,
    isAuthenticated: () => !!getUser()
  };
};
