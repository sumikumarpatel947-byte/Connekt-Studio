// Admin Dashboard Appwrite Integration
console.log('Admin Appwrite Integration loaded!');

// Initialize Appwrite for Admin
const adminClient = new Appwrite.Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('69d1e218000c0c6bf59f');

const adminDatabases = new Appwrite.Databases(adminClient);

// Admin Appwrite Configuration
const ADMIN_APPWRITE_CONFIG = {
    DATABASE_ID: 'connekt_studio',
    COLLECTIONS: {
        CLASSES: 'classes',
        CUSTOMERS: 'customers', 
        ENROLLMENTS: 'enrollments',
        USERS: 'users',
        SETTINGS: 'settings',
        AUDIT_LOGS: 'audit_logs'
    }
};

// Admin Appwrite Manager
class AdminAppwriteManager {
    constructor() {
        this.initialized = false;
    }

    async initialize() {
        try {
            console.log('Initializing Admin Appwrite connection...');
            
            // Test connection
            await adminDatabases.list(ADMIN_APPWRITE_CONFIG.DATABASE_ID, ADMIN_APPWRITE_CONFIG.COLLECTIONS.CLASSES, [
                Appwrite.Query.limit(1)
            ]);
            
            this.initialized = true;
            console.log('Admin Appwrite initialized successfully');
            
        } catch (error) {
            console.error('Admin Appwrite initialization failed:', error);
            this.initialized = false;
        }
    }

    // Load classes from Appwrite for admin
    async loadClasses() {
        if (!this.initialized) {
            await this.initialize();
        }

        try {
            const response = await adminDatabases.listDocuments(
                ADMIN_APPWRITE_CONFIG.DATABASE_ID,
                ADMIN_APPWRITE_CONFIG.COLLECTIONS.CLASSES,
                [
                    Appwrite.Query.orderDesc('created_at')
                ]
            );
            
            console.log('Admin: Classes loaded from Appwrite:', response.documents.length);
            return response.documents;
            
        } catch (error) {
            console.error('Admin: Error loading classes from Appwrite:', error);
            return [];
        }
    }

    // Add class to Appwrite
    async addClass(classData, userId) {
        try {
            const response = await adminDatabases.createDocument(
                ADMIN_APPWRITE_CONFIG.DATABASE_ID,
                ADMIN_APPWRITE_CONFIG.COLLECTIONS.CLASSES,
                Appwrite.ID.unique(),
                {
                    name: classData.name,
                    description: classData.description,
                    duration: classData.duration,
                    price: parseFloat(classData.price),
                    level: classData.level,
                    schedule: classData.schedule,
                    instructor: classData.instructor,
                    image_url: classData.image,
                    features: classData.features || [],
                    status: 'active',
                    created_by: userId,
                    created_at: new Date().toISOString()
                }
            );
            
            console.log('Admin: Class added to Appwrite:', response.$id);
            return response;
        } catch (error) {
            console.error('Admin: Error adding class to Appwrite:', error);
            throw error;
        }
    }

    // Update class in Appwrite
    async updateClass(classId, classData, userId) {
        try {
            const response = await adminDatabases.updateDocument(
                ADMIN_APPWRITE_CONFIG.DATABASE_ID,
                ADMIN_APPWRITE_CONFIG.COLLECTIONS.CLASSES,
                classId,
                {
                    name: classData.name,
                    description: classData.description,
                    duration: classData.duration,
                    price: parseFloat(classData.price),
                    level: classData.level,
                    schedule: classData.schedule,
                    instructor: classData.instructor,
                    image_url: classData.image,
                    features: classData.features,
                    updated_by: userId,
                    updated_at: new Date().toISOString()
                }
            );
            
            console.log('Admin: Class updated in Appwrite:', response.$id);
            return response;
        } catch (error) {
            console.error('Admin: Error updating class in Appwrite:', error);
            throw error;
        }
    }

    // Delete class from Appwrite
    async deleteClass(classId, userId) {
        try {
            await adminDatabases.deleteDocument(
                ADMIN_APPWRITE_CONFIG.DATABASE_ID,
                ADMIN_APPWRITE_CONFIG.COLLECTIONS.CLASSES,
                classId
            );
            
            console.log('Admin: Class deleted from Appwrite:', classId);
            return true;
        } catch (error) {
            console.error('Admin: Error deleting class from Appwrite:', error);
            throw error;
        }
    }

// Create global admin Appwrite manager instance
const adminAppwriteManager = new AdminAppwriteManager();

// Override existing admin functions to use Appwrite
async function loadClassesData() {
    const tbody = document.getElementById('classesTable');
    tbody.innerHTML = '';
    
    try {
        const classes = await adminAppwriteManager.loadClasses();
        
        if (classes.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 40px;">No classes found. Add your first class!</td></tr>';
            return;
        }
        
        classes.forEach(classItem => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${classItem.name || 'Untitled Class'}</td>
                <td>${classItem.level || 'All Levels'}</td>
                <td>₹${classItem.price || '0'}</td>
                <td>${classItem.instructor || 'Not specified'}</td>
                <td>
                    <button class="btn-edit" onclick="editClass(${classItem.$id || classItem.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-delete" onclick="deleteClass(${classItem.$id || classItem.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
        
        console.log('Admin: Classes table loaded successfully');
    } catch (error) {
        console.error('Admin: Error loading classes data:', error);
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: red;">Error loading classes. Please try again.</td></tr>';
    }
}

// Override add class function
document.getElementById('addClassForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        const classData = {
            name: document.getElementById('className').value,
            description: document.getElementById('classDescription').value,
            duration: document.getElementById('classDuration').value,
            price: document.getElementById('classPrice').value,
            level: document.getElementById('classLevel').value,
            schedule: document.getElementById('classSchedule').value,
            instructor: document.getElementById('classInstructor').value,
            image: document.getElementById('classImage').value,
            features: []
        };
        
        await adminAppwriteManager.addClass(classData, 'admin-user');
        
        closeModal('addClassModal');
        showNotification('Class added successfully to Appwrite!');
        loadClassesData();
        loadDashboardData();
        
    } catch (error) {
        console.error('Admin: Error adding class:', error);
        showNotification('Error adding class: ' + error.message, 'error');
    }
});

// Override delete class function
async function deleteClass(id) {
    if (confirm('Are you sure you want to delete this class?')) {
        try {
            await adminAppwriteManager.deleteClass(id, 'admin-user');
            showNotification('Class deleted successfully from Appwrite!');
            loadClassesData();
            loadDashboardData();
        } catch (error) {
            console.error('Admin: Error deleting class:', error);
            showNotification('Error deleting class: ' + error.message, 'error');
        }
    }
}

// Initialize admin dashboard
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Admin Dashboard: Initializing with Appwrite...');
    
    // Initialize Appwrite
    await adminAppwriteManager.initialize();
    
    // Load data
    await loadDashboardData();
    await loadClassesData();
    await loadRecentEnrollments();
    await loadRevenueData();
    
    console.log('Admin Dashboard: Initialization complete');
});
