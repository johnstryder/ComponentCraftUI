import React, { createContext, useContext, useEffect, useState } from 'react';
import { UsersResponse } from '../types/pocketbase-types';
import { pb } from '../lib/pocketbase';

type AuthContextType = {
  user: UsersResponse | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => void;
  error: string | null;
  clearError: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UsersResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Update auth store on auth state changes
    pb.authStore.onChange((_token: string, model: any) => {
      setUser(model as UsersResponse | null);
      setIsLoading(false);
    });

    // Check initial auth state
    setUser(pb.authStore.model as UsersResponse | null);
    setIsLoading(false);

    return () => {
      pb.authStore.clear();
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      const authData = await pb.collection('users').listAuthMethods();
      
      if (!authData?.oauth2.providers) {
        throw new Error('No auth providers available');
      }

      const provider = authData.oauth2.providers.find((p: { name: string }) => p.name === 'google');
      
      if (!provider) {
        throw new Error('Google auth provider not found');
      }

      // Store provider data for the callback
      localStorage.setItem('provider', JSON.stringify({
        name: provider.name,
        state: provider.state,
        codeVerifier: provider.codeVerifier,
        codeChallenge: provider.codeChallenge,
        codeChallengeMethod: provider.codeChallengeMethod,
      }));

      // Store the redirect path
      localStorage.setItem('redirectPath', '/components');

      // Construct the redirect URL
      const redirectUrl = `${window.location.origin}/oauth-callback`;

      // Redirect to Google OAuth
      window.location.href = `${provider.authURL}${encodeURIComponent(redirectUrl)}`;
    } catch (err) {
      console.error('Google sign in error:', err);
      setError(err instanceof Error ? err.message : 'Failed to sign in with Google. Please try again.');
    }
  };

  const signOut = () => {
    pb.authStore.clear();
    setUser(null);
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      signInWithGoogle, 
      signOut, 
      error,
      clearError
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 