import PocketBase from 'pocketbase';

// Get the PocketBase URL from environment variables
const pocketbaseUrl = import.meta.env.VITE_POCKETBASE_URL;

// Create and export the PocketBase client instance
export const pb = new PocketBase(pocketbaseUrl);