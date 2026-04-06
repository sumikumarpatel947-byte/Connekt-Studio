// ============================================================================
// ADMIN APPWRITE MANAGER - CENTRALIZED
// ============================================================================
// Handles all admin operations using centralized configuration

import { appwriteClient, appwriteDatabases, APPWRITE_DATABASE_CONFIG } from './appwrite-config.js';
import { classManager } from './appwrite-class-manager.js';
import { userManager } from './appwrite-user-manager.js';

console.log('Admin Appwrite Integration loaded!');

// Admin Appwrite Manager
class AdminAppwriteManager {
    constructor() {
        this.initialized = false;
    }

    async initialize() {
        try {
            console.log('Initializing Admin Appwrite connection...');
            
            // Test connection with classes collection
            await appwriteDatabases.listDocuments(
                APPWRITE_DATABASE_CONFIG.DATABASE_ID,
                APPWRITE_DATABASE_CONFIG.COLLECTIONS.CLASSES,
                [Appwrite.Query.limit(1)]
            );
            
            this.initialized = true;
            console.log('Admin Appwrite initialized successfully');
            return true;
            
        } catch (error) {
            console.error('Admin Appwrite initialization failed:', error);
            this.initialized = false;
            return false;
        }
    }

    // Load classes from Appwrite for admin
    async loadClasses() {
        if (!this.initialized) {
            await this.initialize();
        }

        try {
            console.log('Admin: Loading classes from Appwrite...');
            const classes = await classManager.loadClasses();
            console.log('Admin: Classes loaded successfully:', classes.length);
            return classes;
        } catch (error) {
            console.error('Admin: Error loading classes from Appwrite:', error);
            return [];
        }
    }

    // Load users from Appwrite for admin
    async loadUsers() {
        if (!this.initialized) {
            await this.initialize();
        }

        try {
            console.log('Admin: Loading users from Appwrite...');
            const users = await userManager.loadUsers();
            console.log('Admin: Users loaded successfully:', users.length);
            return users;
        } catch (error) {
            console.error('Admin: Error loading users from Appwrite:', error);
            return [];
        }
    }

    // Save class to Appwrite
    async saveClass(classData) {
        if (!this.initialized) {
            await this.initialize();
        }

        try {
            console.log('Admin: Saving class to Appwrite:', classData);
            const result = await classManager.saveClass(classData);
            console.log('Admin: Class saved successfully:', result.$id);
            return result;
        } catch (error) {
            console.error('Admin: Error saving class:', error);
            throw error;
        }
    }

    // Update class in Appwrite
    async updateClass(classId, updateData) {
        if (!this.initialized) {
            await this.initialize();
        }

        try {
            console.log('Admin: Updating class:', classId, updateData);
            const result = await classManager.updateClass(classId, updateData);
            console.log('Admin: Class updated successfully:', result.$id);
            return result;
        } catch (error) {
            console.error('Admin: Error updating class:', error);
            throw error;
        }
    }

    // Delete class from Appwrite
    async deleteClass(classId) {
        if (!this.initialized) {
            await this.initialize();
        }

        try {
            console.log('Admin: Deleting class:', classId);
            await classManager.deleteClass(classId);
            console.log('Admin: Class deleted successfully:', classId);
            return true;
        } catch (error) {
            console.error('Admin: Error deleting class:', error);
            throw error;
        }
    }

    // Save user to Appwrite (admin function)
    async saveUser(userData) {
        if (!this.initialized) {
            await this.initialize();
        }

        try {
            console.log('Admin: Saving user to Appwrite:', userData);
            const result = await userManager.saveUser(userData);
            console.log('Admin: User saved successfully:', result.$id);
            return result;
        } catch (error) {
            console.error('Admin: Error saving user:', error);
            throw error;
        }
    }

    // Update user in Appwrite (admin function)
    async updateUser(userId, updateData) {
        if (!this.initialized) {
            await this.initialize();
        }

        try {
            console.log('Admin: Updating user:', userId, updateData);
            const result = await userManager.updateUser(userId, updateData);
            console.log('Admin: User updated successfully:', result.$id);
            return result;
        } catch (error) {
            console.error('Admin: Error updating user:', error);
            throw error;
        }
    }

    // Delete user from Appwrite (admin function)
    async deleteUser(userId) {
        if (!this.initialized) {
            await this.initialize();
        }

        try {
            console.log('Admin: Deleting user:', userId);
            await userManager.deleteUser(userId);
            console.log('Admin: User deleted successfully:', userId);
            return true;
        } catch (error) {
            console.error('Admin: Error deleting user:', error);
            throw error;
        }
    }
}

// Create global admin Appwrite manager instance
const adminAppwriteManager = new AdminAppwriteManager();

// Initialize admin dashboard
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Admin Dashboard: Initializing with Appwrite...');
    
    // Initialize admin manager
    await adminAppwriteManager.initialize();
    
    console.log('Admin Dashboard: Initialization complete');
});
