export interface UserProfile {
  name: string;
  email: string;
  photo: string;
  id: string;
}

export interface AuthProviderType {
  children: React.ReactNode;
}
export interface AuthContextType {
  isAuthenticated: boolean;
  signIn: ({ email, password }: SignInType) => Promise<void>;
  findNotifications: (id: string) => Promise<void>;
  user: UserProfile | null;
  countNotifications: string;
}

export interface SignInType {
  email: string;
  password: string;
}
