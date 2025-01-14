import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pb } from '../lib/pocketbase';
import { Loader2, AlertCircle } from 'lucide-react';

export function OAuthCallback() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // Get URL parameters
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get('code');
        const state = searchParams.get('state');

        // Get stored provider data
        const providerJson = localStorage.getItem('provider');
        if (!providerJson) {
          throw new Error('No provider data found');
        }
        const provider = JSON.parse(providerJson);

        // Verify state matches
        if (!state || state !== provider.state) {
          throw new Error('Invalid state parameter');
        }

        // Verify we have a code
        if (!code) {
          throw new Error('No code parameter received');
        }

        // Complete the OAuth flow
        await pb.collection('users').authWithOAuth2Code(
          'google',
          code,
          provider.codeVerifier,
          `${window.location.origin}/oauth-callback`,
          {
            emailVisibility: true,
          }
        );

        // Clear stored data
        localStorage.removeItem('provider');

        // Get redirect path or default to components
        const redirectPath = localStorage.getItem('redirectPath') || '/components';
        localStorage.removeItem('redirectPath');

        // Navigate to the components page
        navigate(redirectPath, { replace: true });
      } catch (err) {
        console.error('OAuth callback error:', err);
        setError('Authentication failed. Please try again.');
      }
    };

    handleOAuthCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-center gap-2 text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
    </div>
  );
} 