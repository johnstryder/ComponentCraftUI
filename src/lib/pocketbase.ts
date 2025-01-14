import PocketBase from 'pocketbase';

// Get the PocketBase URL from environment variables
const pocketbaseUrl = import.meta.env.VITE_POCKETBASE_URL || 'http://localhost:8090';

// Create and export the PocketBase client instance
export const pb = new PocketBase(pocketbaseUrl); 