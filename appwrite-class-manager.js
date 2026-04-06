// ============================================================================
// APPWRITE CLASS DATA MANAGER
// ============================================================================
// Handles all class-related database operations for admin panel

// Note: appwriteClient, appwriteDatabases, APPWRITE_DATABASE_CONFIG 
// are available globally from appwrite-config.js

class AppwriteClassManager {
    constructor() {
        this.initialized = false;
    }

    // Initialize connection
    async initialize() {
        try {
            console.log('Initializing Appwrite Class Manager...');
            
            // Test connection
            await appwriteDatabases.listDocuments(
                APPWRITE_DATABASE_CONFIG.DATABASE_ID,
                APPWRITE_DATABASE_CONFIG.COLLECTIONS.CLASSES,
                [Appwrite.Query.limit(1)]
            );
            
            this.initialized = true;
            console.log('Appwrite Class Manager initialized successfully');
            return true;
            
        } catch (error) {
            console.error('Appwrite Class Manager initialization failed:', error);
            this.initialized = false;
            return false;
        }
    }

    // Save class to database
    async saveClass(classData) {
        if (!this.initialized) {
            await this.initialize();
        }

        try {
            console.log('Saving class to Appwrite:', classData);
            
            const response = await appwriteDatabases.createDocument(
                APPWRITE_DATABASE_CONFIG.DATABASE_ID,
                APPWRITE_DATABASE_CONFIG.COLLECTIONS.CLASSES,
                Appwrite.ID.unique(),
                classData
            );
            
            console.log('Class saved successfully:', response.$id);
            return response;
            
        } catch (error) {
            console.error('Error saving class:', error);
            
            // Provide specific error messages
            if (error.message.includes('database not found')) {
                throw new Error('Database not found. Please check Appwrite configuration.');
            } else if (error.message.includes('collection not found')) {
                throw new Error('Classes collection not found. Please check Appwrite configuration.');
            } else {
                throw new Error('Error saving class: ' + error.message);
            }
        }
    }

    // Load all classes from database
    async loadClasses() {
        if (!this.initialized) {
            await this.initialize();
        }

        try {
            console.log('Loading classes from Appwrite...');
            
            const response = await appwriteDatabases.listDocuments(
                APPWRITE_DATABASE_CONFIG.DATABASE_ID,
                APPWRITE_DATABASE_CONFIG.COLLECTIONS.CLASSES,
                [
                    Appwrite.Query.orderDesc('$createdAt'),
                    Appwrite.Query.limit(100)
                ]
            );
            
            console.log('Classes loaded successfully:', response.documents.length);
            return response.documents;
            
        } catch (error) {
            console.error('Error loading classes:', error);
            
            if (error.message.includes('database not found')) {
                throw new Error('Database not found. Please check Appwrite configuration.');
            } else if (error.message.includes('collection not found')) {
                throw new Error('Classes collection not found. Please check Appwrite configuration.');
            } else {
                throw new Error('Error loading classes: ' + error.message);
            }
        }
    }

    // Update class in database
    async updateClass(classId, updateData) {
        if (!this.initialized) {
            await this.initialize();
        }

        try {
            console.log('Updating class:', classId, updateData);
            
            const response = await appwriteDatabases.updateDocument(
                APPWRITE_DATABASE_CONFIG.DATABASE_ID,
                APPWRITE_DATABASE_CONFIG.COLLECTIONS.CLASSES,
                classId,
                updateData
            );
            
            console.log('Class updated successfully:', response.$id);
            return response;
            
        } catch (error) {
            console.error('Error updating class:', error);
            
            if (error.message.includes('database not found')) {
                throw new Error('Database not found. Please check Appwrite configuration.');
            } else if (error.message.includes('collection not found')) {
                throw new Error('Classes collection not found. Please check Appwrite configuration.');
            } else if (error.message.includes('document not found')) {
                throw new Error('Class not found.');
            } else {
                throw new Error('Error updating class: ' + error.message);
            }
        }
    }

    // Delete class from database
    async deleteClass(classId) {
        if (!this.initialized) {
            await this.initialize();
        }

        try {
            console.log('Deleting class:', classId);
            
            await appwriteDatabases.deleteDocument(
                APPWRITE_DATABASE_CONFIG.DATABASE_ID,
                APPWRITE_DATABASE_CONFIG.COLLECTIONS.CLASSES,
                classId
            );
            
            console.log('Class deleted successfully:', classId);
            return true;
            
        } catch (error) {
            console.error('Error deleting class:', error);
            
            if (error.message.includes('database not found')) {
                throw new Error('Database not found. Please check Appwrite configuration.');
            } else if (error.message.includes('collection not found')) {
                throw new Error('Classes collection not found. Please check Appwrite configuration.');
            } else if (error.message.includes('document not found')) {
                throw new Error('Class not found.');
            } else {
                throw new Error('Error deleting class: ' + error.message);
            }
        }
    }

    // Find class by ID
    async findClassById(classId) {
        if (!this.initialized) {
            await this.initialize();
        }

        try {
            console.log('Finding class by ID:', classId);
            
            const response = await appwriteDatabases.listDocuments(
                APPWRITE_DATABASE_CONFIG.DATABASE_ID,
                APPWRITE_DATABASE_CONFIG.COLLECTIONS.CLASSES,
                [
                    Appwrite.Query.equal('$id', classId),
                    Appwrite.Query.limit(1)
                ]
            );
            
            return response.documents.length > 0 ? response.documents[0] : null;
            
        } catch (error) {
            console.error('Error finding class by ID:', error);
            return null;
        }
    }
}

// Export to window for global access
window.classManager = new AppwriteClassManager();
