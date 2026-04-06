// ============================================================================
// APPWRITE USER DATA MANAGER
// ============================================================================
// Handles all user-related database operations

// Note: appwriteClient, appwriteDatabases, APPWRITE_DATABASE_CONFIG 
// are available globally from appwrite-config.js

class AppwriteUserManager {
    constructor() {
        this.initialized = false;
    }

    // Initialize connection
    async initialize() {
        try {
            console.log('Initializing Appwrite User Manager...');
            
            // Test connection
            await appwriteDatabases.listDocuments(
                APPWRITE_DATABASE_CONFIG.DATABASE_ID,
                APPWRITE_DATABASE_CONFIG.COLLECTIONS.USERS,
                [Appwrite.Query.limit(1)]
            );
            
            this.initialized = true;
            console.log('Appwrite User Manager initialized successfully');
            return true;
            
        } catch (error) {
            console.error('Appwrite User Manager initialization failed:', error);
            this.initialized = false;
            return false;
        }
    }

    // Save user to database
    async saveUser(userData) {
        if (!this.initialized) {
            await this.initialize();
        }

        try {
            console.log('Saving user to Appwrite:', userData);
            
            const response = await appwriteDatabases.createDocument(
                APPWRITE_DATABASE_CONFIG.DATABASE_ID,
                APPWRITE_DATABASE_CONFIG.COLLECTIONS.USERS,
                Appwrite.ID.unique(),
                userData
            );
            
            console.log('User saved successfully:', response.$id);
            return response;
            
        } catch (error) {
            console.error('Error saving user:', error);
            
            // Provide specific error messages
            if (error.message.includes('duplicate') || error.message.includes('unique')) {
                throw new Error('A user with this email already exists.');
            } else if (error.message.includes('database not found')) {
                throw new Error('Database not found. Please check Appwrite configuration.');
            } else if (error.message.includes('collection not found')) {
                throw new Error('Users collection not found. Please check Appwrite configuration.');
            } else {
                throw new Error('Error saving user: ' + error.message);
            }
        }
    }

    // Load all users from database
    async loadUsers() {
        if (!this.initialized) {
            await this.initialize();
        }

        try {
            console.log('Loading users from Appwrite...');
            
            const response = await appwriteDatabases.listDocuments(
                APPWRITE_DATABASE_CONFIG.DATABASE_ID,
                APPWRITE_DATABASE_CONFIG.COLLECTIONS.USERS,
                [
                    Appwrite.Query.orderDesc('$createdAt'),
                    Appwrite.Query.limit(100)
                ]
            );
            
            console.log('Users loaded successfully:', response.documents.length);
            return response.documents;
            
        } catch (error) {
            console.error('Error loading users:', error);
            
            if (error.message.includes('database not found')) {
                throw new Error('Database not found. Please check Appwrite configuration.');
            } else if (error.message.includes('collection not found')) {
                throw new Error('Users collection not found. Please check Appwrite configuration.');
            } else {
                throw new Error('Error loading users: ' + error.message);
            }
        }
    }

    // Update user in database
    async updateUser(userId, updateData) {
        if (!this.initialized) {
            await this.initialize();
        }

        try {
            console.log('Updating user:', userId, updateData);
            
            const response = await appwriteDatabases.updateDocument(
                APPWRITE_DATABASE_CONFIG.DATABASE_ID,
                APPWRITE_DATABASE_CONFIG.COLLECTIONS.USERS,
                userId,
                updateData
            );
            
            console.log('User updated successfully:', response.$id);
            return response;
            
        } catch (error) {
            console.error('Error updating user:', error);
            
            if (error.message.includes('database not found')) {
                throw new Error('Database not found. Please check Appwrite configuration.');
            } else if (error.message.includes('collection not found')) {
                throw new Error('Users collection not found. Please check Appwrite configuration.');
            } else if (error.message.includes('document not found')) {
                throw new Error('User not found.');
            } else {
                throw new Error('Error updating user: ' + error.message);
            }
        }
    }

    // Delete user from database
    async deleteUser(userId) {
        if (!this.initialized) {
            await this.initialize();
        }

        try {
            console.log('Deleting user:', userId);
            
            await appwriteDatabases.deleteDocument(
                APPWRITE_DATABASE_CONFIG.DATABASE_ID,
                APPWRITE_DATABASE_CONFIG.COLLECTIONS.USERS,
                userId
            );
            
            console.log('User deleted successfully:', userId);
            return true;
            
        } catch (error) {
            console.error('Error deleting user:', error);
            
            if (error.message.includes('database not found')) {
                throw new Error('Database not found. Please check Appwrite configuration.');
            } else if (error.message.includes('collection not found')) {
                throw new Error('Users collection not found. Please check Appwrite configuration.');
            } else if (error.message.includes('document not found')) {
                throw new Error('User not found.');
            } else {
                throw new Error('Error deleting user: ' + error.message);
            }
        }
    }

    // Find user by email
    async findUserByEmail(email) {
        if (!this.initialized) {
            await this.initialize();
        }

        try {
            console.log('Finding user by email:', email);
            
            const response = await appwriteDatabases.listDocuments(
                APPWRITE_DATABASE_CONFIG.DATABASE_ID,
                APPWRITE_DATABASE_CONFIG.COLLECTIONS.USERS,
                [
                    Appwrite.Query.equal('email', email),
                    Appwrite.Query.limit(1)
                ]
            );
            
            return response.documents.length > 0 ? response.documents[0] : null;
            
        } catch (error) {
            console.error('Error finding user by email:', error);
            return null;
        }
    }
}

// Export to window for global access
window.userManager = new AppwriteUserManager();
