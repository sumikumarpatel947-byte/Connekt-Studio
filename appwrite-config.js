// ============================================================================
// APPWRITE CONFIGURATION - CENTRALIZED
// ============================================================================
// This file contains all Appwrite configuration for the entire project
// All other files should import this configuration

// Appwrite Client Configuration
const APPWRITE_CLIENT_CONFIG = {
    ENDPOINT: 'https://cloud.appwrite.io/v1',
    PROJECT_ID: '69d1e218000c0c6bf59f'
};

// Database Configuration
const APPWRITE_DATABASE_CONFIG = {
    DATABASE_ID: 'database-69d2929600321ba774c7',
    COLLECTIONS: {
        USERS: 'collection-users',
        CLASSES: 'collection-classes'
    }
};

// Initialize Appwrite Client
const appwriteClient = new Appwrite.Client()
    .setEndpoint(APPWRITE_CLIENT_CONFIG.ENDPOINT)
    .setProject(APPWRITE_CLIENT_CONFIG.PROJECT_ID);

// Initialize Appwrite Databases
const appwriteDatabases = new Appwrite.Databases(appwriteClient);

// Export to window for global access
window.APPWRITE_CLIENT_CONFIG = APPWRITE_CLIENT_CONFIG;
window.APPWRITE_DATABASE_CONFIG = APPWRITE_DATABASE_CONFIG;
window.appwriteClient = appwriteClient;
window.appwriteDatabases = appwriteDatabases;

console.log('Appwrite configuration loaded:', {
    project: APPWRITE_CLIENT_CONFIG.PROJECT_ID,
    database: APPWRITE_DATABASE_CONFIG.DATABASE_ID,
    collections: APPWRITE_DATABASE_CONFIG.COLLECTIONS
});
