// Test script loading
console.log('Script.js loaded successfully!');

// ============================================================================
// FRONTEND ONLY - NO BACKEND
// ============================================================================

// ============================================================================
// DUMMY DATA (TEMPORARY - FOR FRONTEND DEMO)
// ============================================================================

// Dummy classes data for demo purposes
const DUMMY_CLASSES = [
    {
        id: 1,
        name: "21 Days Dincharya Program",
        description: "Perfect for those new to yoga. Learn fundamental poses, improve sleep cycle, and basic meditation.",
        duration: "21 Days",
        price: "₹2,499",
        level: "Beginner",
        schedule: "Mon-Sat, 6th April",
        instructor: "Hina Pamnani",
        experience: "3 years",
        students: 117,
        rating: 4.8,
        features: [
            "21 Days Live Sessions",
            "Basic Yoga Poses",
            "Pranayama Practices",
            "Introduction to Meditation",
            "Flexibility Training",
            "Ayurveda Lifestyle"
        ],
        image: "https://images.unsplash.com/photo-1774857491446-dfab0acd73A8?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaGox"
    },
    {
        id: 2,
        name: "Advanced Yoga Flow",
        description: "For experienced practitioners looking to deepen their practice with challenging sequences and advanced techniques.",
        duration: "90 minutes",
        price: "₹1,999",
        level: "Advanced",
        schedule: "Daily, 7:00 AM",
        instructor: "Expert Instructor",
        experience: "10+ years",
        students: 250,
        rating: 4.9,
        features: [
            "Advanced Sequences",
            "Inversion Practice",
            "Breathwork Techniques",
            "Meditation Integration",
            "Strength Building",
            "Flexibility Advanced"
        ],
        image: "https://images.unsplash.com/photo-1599901860903-17e6edead8c8?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaGox"
    },
    {
        id: 3,
        name: "Gentle Yoga Therapy",
        description: "Therapeutic yoga sessions focused on healing, relaxation, and stress relief through gentle movements.",
        duration: "60 minutes",
        price: "₹1,499",
        level: "All Levels",
        schedule: "Mon-Wed, 6:00 PM",
        instructor: "Certified Therapist",
        experience: "8 years",
        students: 89,
        rating: 4.7,
        features: [
            "Therapeutic Approach",
            "Stress Relief",
            "Gentle Movements",
            "Relaxation Techniques",
            "Healing Focus",
            "Mind-Body Connection"
        ],
        image: "https://images.unsplash.com/photo-1545205597-1609c0e9e78?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaGox"
    }
];

// ============================================================================
// USER DATA FUNCTIONS (PLACEHOLDERS)
// ============================================================================

// Save user function (placeholder)
function saveUser(userData) {
    console.log('Saving user data (placeholder):', userData);
    
    // Store in localStorage temporarily for demo
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({
        ...userData,
        id: Date.now(),
        createdAt: new Date().toISOString()
    });
    localStorage.setItem('users', JSON.stringify(users));
    
    // Show success message
    showStatus('User data saved successfully!', 'success');
    
    // Reset form if exists
    const form = document.getElementById('userForm');
    if (form) {
        form.reset();
    }
    
    return true;
}

// Load users function (placeholder)
function loadUsers() {
    console.log('Loading users (placeholder)');
    
    // Get from localStorage temporarily for demo
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    displayUsers(users);
    return users;
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
            <button onclick="editUser('${user.id}')">Edit</button>
            <button onclick="deleteUser('${user.id}')">Delete</button>
        </div>
    `).join('');
}

// Edit user function (placeholder)
function editUser(userId) {
    console.log('Editing user (placeholder):', userId);
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.id == userId);
    
    if (user) {
        // Populate form
        document.getElementById("fullName").value = user.fullName || '';
        document.getElementById("email").value = user.email || '';
        document.getElementById("phone").value = user.phone || '';
        document.getElementById("location").value = user.location || '';
        
        showStatus('User loaded for editing', 'info');
    } else {
        showStatus('User not found', 'error');
    }
}

// Delete user function (placeholder)
function deleteUser(userId) {
    if (!confirm('Are you sure you want to delete this user?')) {
        return;
    }
    
    console.log('Deleting user (placeholder):', userId);
    
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users = users.filter(u => u.id != userId);
    localStorage.setItem('users', JSON.stringify(users));
    
    showStatus('User deleted successfully!', 'success');
    loadUsers(); // Reload list
}

// ============================================================================
// CLASS DATA FUNCTIONS (PLACEHOLDERS)
// ============================================================================

// Load classes function (placeholder)
function loadClasses() {
    console.log('Loading classes (placeholder)');
    displayClasses(DUMMY_CLASSES);
    return DUMMY_CLASSES;
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
            <button onclick="enrollInClass('${cls.id}')">Enroll</button>
        </div>
    `).join('');
}

// Enroll in class function (placeholder)
function enrollInClass(classId) {
    console.log('Enrolling in class (placeholder):', classId);
    
    const classData = DUMMY_CLASSES.find(cls => cls.id == classId);
    if (classData) {
        showStatus(`Enrolled in ${classData.name || 'class'} successfully!`, 'success');
    } else {
        showStatus('Class not found', 'error');
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
document.addEventListener('DOMContentLoaded', function() {
    console.log('Frontend initialized (no backend)');
    
    // Load initial data
    loadUsers();
    loadClasses();
    
    // Setup form handlers
    const userForm = document.getElementById('userForm');
    if (userForm) {
        userForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = {
                fullName: document.getElementById("fullName")?.value || '',
                email: document.getElementById("email")?.value || '',
                phone: document.getElementById("phone")?.value || '',
                location: document.getElementById("location")?.value || ''
            };
            
            // Save user
            saveUser(formData);
        });
    }
    
    console.log('Frontend initialization complete');
});
