
// This file is kept for reference but is not actually used
// We're now using react-auth-kit instead of next-auth

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: "free" | "premium";
  postCount: number;
}

export interface Session {
  user: User;
}
