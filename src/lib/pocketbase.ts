import PocketBase from 'pocketbase';

// Add debugging to see what environment variables are available
console.log('All Vite Env Variables:', import.meta.env);
console.log('Attempting to use PocketBase URL:', import.meta.env.VITE_POCKETBASE_URL);

// Get the PocketBase URL from environment variables with a fallback
const pocketbaseUrl = import.meta.env.VITE_POCKETBASE_URL || 'http://pocketbase:8090';

if (!import.meta.env.VITE_POCKETBASE_URL) {
  console.error('PocketBase URL is not configured. Please set VITE_POCKETBASE_URL environment variable.');
  console.error('Currently falling back to:', pocketbaseUrl);
}

// Create and export the PocketBase client instance
export const pb = new PocketBase(pocketbaseUrl);

// Log the final PocketBase instance configuration
console.log('PocketBase instance created with URL:', pb.baseUrl);