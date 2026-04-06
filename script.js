// Test script loading
console.log('Script.js loaded successfully!');

// ============================================================================
// APPWRITE DATA MANAGEMENT SYSTEM - FRONTEND
// ============================================================================

// Import centralized managers
import { userManager } from './appwrite-user-manager.js';
import { classManager } from './appwrite-class-manager.js';

// ============================================================================
// FRONTEND FUNCTIONS
// ============================================================================

// Initialize data manager
const dataManager = userManager;

// ============================================================================
// USER DATA FUNCTIONS
// ============================================================================

// Save user function
async function saveUser() {
    try {
        // Collect form values
        const fullName = document.getElementById("fullName")?.value || '';
        const gender = document.getElementById("gender")?.value || '';
        const email = document.getElementById("email")?.value || '';
        const phone = document.getElementById("phone")?.value || '';
        const location = document.getElementById("location")?.value || '';
        const password = document.getElementById("password")?.value || '';
        const confirmPassword = document.getElementById("confirmPassword")?.value || '';

        // Validation
        if (!fullName || !email || !phone || !password) {
            showStatus('Please fill in all required fields', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showStatus('Passwords do not match', 'error');
            return;
        }

        if (password.length < 6) {
            showStatus('Password must be at least 6 characters', 'error');
            return;
        }

        // Prepare user data
        const userData = {
            fullName,
            gender,
            email,
            phone,
            location,
            password: btoa(password) // Simple encoding for demo
        };

        // Save to Appwrite
        await userManager.saveUser(userData);
        showStatus('User saved successfully!', 'success');
        
        // Reset form
        document.getElementById("userForm")?.reset();
        
    } catch (error) {
        console.error('Error saving user:', error);
        showStatus(error.message || 'Error saving user', 'error');
    }
}

// Load users function
async function loadUsers() {
    try {
        const users = await userManager.loadUsers();
        displayUsers(users);
    } catch (error) {
        console.error('Error loading users:', error);
        showStatus(error.message || 'Error loading users', 'error');
    }
}

// Display users function
function displayUsers(users) {
    const userList = document.getElementById('userList');
    if (!userList) return;
    
    if (users.length === 0) {
        userList.innerHTML = '<p>No users found.</p>';
        return;
    }
    
    userList.innerHTML = users.map(user => `
        <div class="user-item">
            <h4>${user.fullName}</h4>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <p>Location: ${user.location || 'Not specified'}</p>
            <button onclick="editUser('${user.$id}')">Edit</button>
            <button onclick="deleteUser('${user.$id}')">Delete</button>
        </div>
    `).join('');
}

// Edit user function
async function editUser(userId) {
    try {
        const user = await userManager.findUserByEmail(userId);
        if (!user) {
            showStatus('User not found', 'error');
            return;
        }
        
        // Populate form
        document.getElementById("fullName").value = user.fullName || '';
        document.getElementById("gender").value = user.gender || '';
        document.getElementById("email").value = user.email || '';
        document.getElementById("phone").value = user.phone || '';
        document.getElementById("location").value = user.location || '';
        
        showStatus('User loaded for editing', 'info');
        
    } catch (error) {
        console.error('Error loading user:', error);
        showStatus(error.message || 'Error loading user', 'error');
    }
}

// Delete user function
async function deleteUser(userId) {
    if (!confirm('Are you sure you want to delete this user?')) {
        return;
    }
    
    try {
        await userManager.deleteUser(userId);
        showStatus('User deleted successfully!', 'success');
        await loadUsers(); // Reload list
    } catch (error) {
        console.error('Error deleting user:', error);
        showStatus(error.message || 'Error deleting user', 'error');
    }
}

// ============================================================================
// CLASS DATA FUNCTIONS
// ============================================================================

// Load classes for frontend
async function loadClasses() {
    try {
        const classes = await classManager.loadClasses();
        displayClasses(classes);
    } catch (error) {
        console.error('Error loading classes:', error);
        showStatus(error.message || 'Error loading classes', 'error');
    }
}

// Display classes function
function displayClasses(classes) {
    const classList = document.getElementById('classList');
    if (!classList) return;
    
    if (classes.length === 0) {
        classList.innerHTML = '<p>No classes found.</p>';
        return;
    }
    
    classList.innerHTML = classes.map(cls => `
        <div class="class-item">
            <h4>${cls.name || 'Untitled Class'}</h4>
            <p>${cls.description || 'No description'}</p>
            <p>Duration: ${cls.duration || 'Not specified'}</p>
            <p>Price: ${cls.price || 'Not specified'}</p>
            <p>Level: ${cls.level || 'Not specified'}</p>
            <button onclick="enrollInClass('${cls.$id}')">Enroll</button>
        </div>
    `).join('');
}

// Enroll in class function
async function enrollInClass(classId) {
    try {
        const classData = await classManager.findClassById(classId);
        if (!classData) {
            showStatus('Class not found', 'error');
            return;
        }
        
        // For demo purposes, just show success message
        showStatus(`Enrolled in ${classData.name || 'class'} successfully!`, 'success');
        
    } catch (error) {
        console.error('Error enrolling in class:', error);
        showStatus(error.message || 'Error enrolling in class', 'error');
    }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

// Show status message
function showStatus(message, type = 'info') {
    const statusDiv = document.getElementById('statusMessage');
    if (!statusDiv) return;
    
    statusDiv.className = `status-message ${type}`;
    statusDiv.textContent = message;
    statusDiv.style.display = 'block';
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        statusDiv.style.display = 'none';
    }, 5000);
}

// ============================================================================
// INITIALIZATION
// ============================================================================

// Initialize on page load
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Frontend initialized');
    
    // Load initial data
    await loadUsers();
    await loadClasses();
    
    // Setup form handlers
    const userForm = document.getElementById('userForm');
    if (userForm) {
        userForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveUser();
        });
    }
});
