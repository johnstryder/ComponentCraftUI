import PocketBase from 'pocketbase';

// Get the PocketBase URL from environment variables with a fallback
const pocketbaseUrl = import.meta.env.VITE_POCKETBASE_URL;

// Add error handling for the URL
if (!pocketbaseUrl) {
  console.error('PocketBase URL is not configured. Please set VITE_POCKETBASE_URL environment variable.');
}
console.log('PocketBase URL:', pocketbaseUrl);
// Create and export the PocketBase client instance
export const pb = new PocketBase(pocketbaseUrl);