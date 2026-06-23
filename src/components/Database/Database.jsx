import Dexie from 'dexie';
// https://dexie.org/
// Create the database
export const db = new Dexie('uFranchiseDB');

// Define Schema - version 1
db.version(1).stores({
    seasons: 'id, name',
    settings: 'key'
});

// Helper functions