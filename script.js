// Test script loading
console.log('Script.js loaded successfully!');

// ============================================================================
// APPWRITE DATA MANAGEMENT SYSTEM
// ============================================================================

// Initialize Appwrite
const client = new Appwrite.Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('69d1e218000c0c6bf59f');

const databases = new Appwrite.Databases(client);

// Appwrite Configuration
const APPWRITE_CONFIG = {
    DATABASE_ID: '69d1ea0f0000b37f7fa2',
    COLLECTION_ID: '69d1ea0f0000b37f7fa2'
};

// Appwrite Data Manager Class
class AppwriteDataManager {
    constructor() {
        this.initialized = false;
    }

    // Initialize Appwrite connection
    async initialize() {
        try {
            console.log('Initializing Appwrite connection...');
            
            // Test connection
            await databases.list(APPWRITE_CONFIG.DATABASE_ID, APPWRITE_CONFIG.COLLECTION_ID, [
                Appwrite.Query.limit(1)
            ]);
            
            this.initialized = true;
            console.log('Appwrite initialized successfully');
            
        } catch (error) {
            console.error('Appwrite initialization failed:', error);
            this.initialized = false;
        }
    }

    // Save user data to Appwrite
    async saveUser(userData) {
        if (!this.initialized) {
            await this.initialize();
        }

        try {
            const response = await databases.createDocument(
                APPWRITE_CONFIG.DATABASE_ID,
                APPWRITE_CONFIG.COLLECTION_ID,
                Appwrite.ID.unique(),
                userData
            );
            
            console.log('User saved to Appwrite:', response.$id);
            return response;
        } catch (error) {
            console.error('Error saving user to Appwrite:', error);
            throw error;
        }
    }

    // Load users from Appwrite
    async loadUsers() {
        if (!this.initialized) {
            await this.initialize();
        }

        try {
            const response = await databases.listDocuments(
                APPWRITE_CONFIG.DATABASE_ID,
                APPWRITE_CONFIG.COLLECTION_ID,
                [
                    Appwrite.Query.orderDesc('$createdAt')
                ]
            );
            
            console.log('Users loaded from Appwrite:', response.documents.length);
            return response.documents;
        } catch (error) {
            console.error('Error loading users from Appwrite:', error);
            return [];
        }
    }

    // Update user in Appwrite
    async updateUser(userId, userData) {
        if (!this.initialized) {
            await this.initialize();
        }

        try {
            const response = await databases.updateDocument(
                APPWRITE_CONFIG.DATABASE_ID,
                APPWRITE_CONFIG.COLLECTION_ID,
                userId,
                userData
            );
            
            console.log('User updated in Appwrite:', response.$id);
            return response;
        } catch (error) {
            console.error('Error updating user in Appwrite:', error);
            throw error;
        }
    }

    // Delete user from Appwrite
    async deleteUser(userId) {
        if (!this.initialized) {
            await this.initialize();
        }

        try {
            await databases.deleteDocument(
                APPWRITE_CONFIG.DATABASE_ID,
                APPWRITE_CONFIG.COLLECTION_ID,
                userId
            );
            
            console.log('User deleted from Appwrite:', userId);
            return true;
        } catch (error) {
            console.error('Error deleting user from Appwrite:', error);
            throw error;
        }
    }
}

// Create global Appwrite data manager instance
const appwriteManager = new AppwriteDataManager();

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

        // Validate required fields
        if (!fullName || !email || !phone) {
            showStatus('Please fill in all required fields (Name, Email, Phone)', 'error');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showStatus('Please enter a valid email address', 'error');
            return;
        }

        // Show loading status
        showStatus('Saving user data...', 'info');

        // Prepare user data
        const userData = {
            fullName,
            gender,
            email,
            phone,
            location
        };

        // Save to Appwrite
        const result = await appwriteManager.saveUser(userData);

        // Show success message
        showStatus(`User saved successfully! ID: ${result.$id}`, 'success');

        // Clear form after successful submission
        clearUserForm();

        // Refresh user list if display function exists
        if (typeof displayUsers === 'function') {
            await displayUsers();
        }

    } catch (error) {
        console.error('Error in saveUser:', error);
        
        // Provide specific error messages
        if (error.message.includes('duplicate') || error.message.includes('unique')) {
            showStatus('A user with this email already exists.', 'error');
        } else if (error.message.includes('database not found')) {
            showStatus('Database not found. Please check Appwrite configuration.', 'error');
        } else if (error.message.includes('collection not found')) {
            showStatus('Collection not found. Please check Appwrite configuration.', 'error');
        } else {
            showStatus('Error saving user: ' + error.message, 'error');
        }
    }
}

// Load users function
async function loadUsers() {
    try {
        showStatus('Loading users...', 'info');
        
        const users = await appwriteManager.loadUsers();
        
        if (users.length === 0) {
            showStatus('No users found in database.', 'info');
        } else {
            showStatus(`Loaded ${users.length} users successfully.`, 'success');
        }

        // Display users if function exists
        if (typeof displayUsers === 'function') {
            displayUsers(users);
        }

        return users;
    } catch (error) {
        console.error('Error in loadUsers:', error);
        showStatus('Error loading users: ' + error.message, 'error');
        return [];
    }
}

// Clear user form
function clearUserForm() {
    const form = document.getElementById('userProfileForm') || document.getElementById('userForm');
    if (form) {
        form.reset();
    }
}

// Show status message
function showStatus(message, type) {
    // Try to find status message container
    let statusDiv = document.getElementById('statusMessage');
    
    // If not found, create one
    if (!statusDiv) {
        statusDiv = document.createElement('div');
        statusDiv.id = 'statusMessage';
        statusDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            font-weight: 500;
            z-index: 9999;
            max-width: 400px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        `;
        document.body.appendChild(statusDiv);
    }

    // Set message and styling based on type
    statusDiv.innerHTML = message;
    statusDiv.className = 'status-message';
    
    const colors = {
        success: { bg: '#d4edda', color: '#155724', border: '#c3e6cb' },
        error: { bg: '#f8d7da', color: '#721c24', border: '#f5c6cb' },
        info: { bg: '#d1ecf1', color: '#0c5460', border: '#bee5eb' }
    };
    
    const theme = colors[type] || colors.info;
    statusDiv.style.background = theme.bg;
    statusDiv.style.color = theme.color;
    statusDiv.style.border = `1px solid ${theme.border}`;

    // Auto hide after 5 seconds
    setTimeout(() => {
        if (statusDiv.parentNode) {
            statusDiv.parentNode.removeChild(statusDiv);
        }
    }, 5000);
}

// ============================================================================
// EXISTING FUNCTIONS (Updated to use Appwrite)
// ============================================================================
// Missing functions for class cards
async function enrollInClass(classId) {
    console.log('Enroll in class:', classId);
    showNotification('Enrollment feature coming soon!', 'info');
}

async function showClassDetails(classId) {
    console.log('Show class details:', classId);
    showNotification('Class details feature coming soon!', 'info');
}

// Class Data - Read from Appwrite Database
async function getClassesFromDatabase() {
    try {
        const classes = await appwriteManager.getClasses();
        return classes;
    } catch (error) {
        console.error('Error loading classes:', error);
        return getDefaultClasses();
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOM Content Loaded - Initializing page...');
    
    // Make all stagger animation elements visible immediately
    const staggerElements = document.querySelectorAll('.stagger-animation > *');
    staggerElements.forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    });
    
    await loadClasses();
    setupEventListeners();
    setupSmoothScrolling();
    
    // Check if testimonials are visible
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    if (testimonialsGrid) {
        console.log('Testimonials grid found with', testimonialsGrid.children.length, 'testimonial cards');
        // Make testimonials visible immediately
        const testimonialCards = testimonialsGrid.querySelectorAll('.testimonial-card');
        testimonialCards.forEach((card, index) => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            console.log(`Testimonial ${index + 1}:`, card.querySelector('h4')?.textContent);
        });
    } else {
        console.error('Testimonials grid not found!');
    }
    
    // Set initial FAQ state
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const answer = item.querySelector('.faq-answer');
        if (answer) {
            answer.style.display = 'none';
        }
    });
    
    // Show all FAQs by default
    filterFAQ('all');
    
    // Setup mobile menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    console.log('Page initialization complete');
});

// Initialize stagger animations
function initializeStaggerAnimations() {
    const staggerElements = document.querySelectorAll('.stagger-animation');
    
    staggerElements.forEach(container => {
        const children = container.children;
        
        // Use Intersection Observer to trigger animations when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const children = target.children;
                    
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                    
                    observer.unobserve(target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        observer.observe(container);
        
        // Fallback: Make elements visible after 3 seconds if observer doesn't work
        setTimeout(() => {
            Array.from(children).forEach((child, index) => {
                if (child.style.opacity === '0' || child.style.opacity === '') {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, 3000);
    });
}

// Load Classes
// Load classes from Appwrite
async function loadClasses() {
    const classesGrid = document.getElementById('classesGrid');
    
    console.log('Loading classes from Appwrite...');
    console.log('Classes grid element:', classesGrid);
    
    if (classesGrid) {
        try {
            // Get classes from Appwrite
            const classes = await appwriteManager.getClasses();
            console.log('Classes loaded from Appwrite:', classes.length);
            
            if (classes && classes.length > 0) {
                console.log('Loading Appwrite classes:', classes.length, 'classes');
                classesGrid.innerHTML = ''; // Clear fallback content
                classes.forEach((classItem, index) => {
                    console.log('Creating card for class:', classItem.name);
                    const classCard = createClassCard(classItem);
                    // Make card visible immediately
                    classCard.style.opacity = '1';
                    classCard.style.transform = 'translateY(0)';
                    classesGrid.appendChild(classCard);
                });
                console.log('Appwrite classes loaded successfully');
                return;
            }
        } catch (error) {
            console.error('Error loading classes from Appwrite:', error);
        }
        
        // Use fallback content that's already in HTML
        console.log('Using fallback classes content');
        const existingCards = classesGrid.querySelectorAll('.class-card');
        console.log('Found', existingCards.length, 'fallback class cards');
        
        // Make existing cards visible immediately
        existingCards.forEach((card, index) => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            console.log('Made class card visible:', card.querySelector('.class-title')?.textContent);
        });
        
        console.log('Fallback classes loaded successfully');
    } else {
        console.error('Classes grid element not found!');
    }
}

// Create Class Card
function createClassCard(classItem) {
    const card = document.createElement('div');
    card.className = 'class-card';
    card.innerHTML = `
        <div class="class-image">
            <img src="${classItem.image}" alt="${classItem.name}">
            <div class="class-badge">${classItem.level}</div>
        </div>
        <div class="class-content">
            <h3 class="class-title">${classItem.name}</h3>
            <p class="class-description">${classItem.description}</p>
            <div class="class-details">
                <div class="class-duration">
                    <i class="fas fa-clock"></i>
                    <span>${classItem.duration}</span>
                </div>
                <div class="class-price">
                    <i class="fas fa-tag"></i>
                    <span>${classItem.price}</span>
                </div>
            </div>
            <div class="class-instructor">
                <i class="fas fa-user"></i>
                <span>${classItem.instructor}</span>
            </div>
            <div class="class-features">
                ${classItem.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
            </div>
            <div class="class-actions">
                <button class="btn-enroll" onclick="enrollInClass(${classItem.id})">
                    <i class="fas fa-plus-circle"></i>
                    Enroll Now
                </button>
                <button class="btn-details" onclick="showClassDetails(${classItem.id})">
                    <i class="fas fa-info-circle"></i>
                    Details
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Setup Event Listeners
function setupEventListeners() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Modal close buttons
    const closeButtons = document.querySelectorAll('.modal-close, .modal-overlay');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            closeModal();
        });
    });
    
    // Enrollment form
    const enrollmentForm = document.getElementById('enrollmentForm');
    if (enrollmentForm) {
        enrollmentForm.addEventListener('submit', handleEnrollment);
    }
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContact);
    }
}

// Setup Smooth Scrolling
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enroll in Class
function enrollInClass(classId) {
    const classItem = classes.find(c => c.id === classId);
    if (!classItem) return;
    
    // Store class data for enrollment form (in-memory)
    window.selectedClassData = classItem;
    
    // Open enrollment modal
    const modal = document.getElementById('enrollmentModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Update modal content
        const modalContent = modal.querySelector('.modal-content');
        modalContent.querySelector('.modal-title').textContent = `Enroll in ${classItem.name}`;
        modalContent.querySelector('.selected-class-name').textContent = classItem.name;
        modalContent.querySelector('.selected-class-price').textContent = classItem.price;
    }
}

// Show Class Details
function showClassDetails(classId) {
    const classItem = classes.find(c => c.id === classId);
    if (!classItem) return;
    
    // Store class data for details modal (in-memory)
    window.selectedClassData = classItem;
    
    // Open details modal
    const modal = document.getElementById('detailsModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Update modal content
        const modalContent = modal.querySelector('.modal-content');
        modalContent.querySelector('.modal-title').textContent = classItem.name;
        modalContent.querySelector('.class-details-description').textContent = classItem.description;
        modalContent.querySelector('.class-details-duration').textContent = classItem.duration;
        modalContent.querySelector('.class-details-price').textContent = classItem.price;
        modalContent.querySelector('.class-details-instructor').textContent = classItem.instructor;
        modalContent.querySelector('.class-details-schedule').textContent = classItem.schedule;
        modalContent.querySelector('.class-details-image').src = classItem.image;
        modalContent.querySelector('.class-details-image').alt = classItem.name;
        
        // Update features
        const featuresContainer = modalContent.querySelector('.class-details-features');
        featuresContainer.innerHTML = classItem.features.map(feature => 
            `<span class="feature-tag">${feature}</span>`
        ).join('');
    }
}

// Close Modal
function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = '';
}

// Handle Enrollment
function handleEnrollment(e) {
    e.preventDefault();
    
    // Get selected class data from in-memory storage
    const selectedClass = window.selectedClassData;
    if (!selectedClass) {
        showNotification('No class selected. Please try again.', 'error');
        return;
    }
    
    const formData = new FormData(e.target);
    const enrollmentData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        classId: selectedClass.id,
        className: selectedClass.name,
        classPrice: selectedClass.price,
        timestamp: new Date().toISOString()
    };
    
    // Save enrollment to Appwrite (optional - could be added later)
    // For now, just show success message
    console.log('Enrollment data:', enrollmentData);
    
    // Show success message
    showNotification('Enrollment submitted successfully! We will contact you soon.', 'success');
    
    // Close modal
    closeModal();
    
    // Reset form
    e.target.reset();
    
    // Clear selected class from memory
    window.selectedClassData = null;
}

// Handle Contact
function handleContact(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };
    
    // Save contact to Appwrite (optional - could be added later)
    // For now, just show success message
    console.log('Contact data:', contactData);
    
    // Show success message
    showNotification('Message sent successfully! We will get back to you soon.', 'success');
    
    // Reset form
    e.target.reset();
}

// Show Notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <p>${message}</p>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Scroll to Top Button
window.addEventListener('scroll', function() {
    const scrollToTop = document.querySelector('.scroll-to-top');
    if (scrollToTop) {
        if (window.pageYOffset > 300) {
            scrollToTop.classList.add('active');
        } else {
            scrollToTop.classList.remove('active');
        }
    }
});

// Scroll to Top Function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Refresh classes when admin makes changes (DISABLED TO PREVENT INFINITE RELOAD)
// window.addEventListener('storage', function(e) {
//     if (e.key === 'classes') {
//         console.log('Storage event detected - classes updated by admin');
//         location.reload();
//     }
// });

// Auto-refresh classes DISABLED to prevent infinite reload
// setInterval(function() {
//     const currentClasses = JSON.stringify(classes);
//     const newClasses = JSON.stringify(getClassesFromDatabase());
//     
//     if (currentClasses !== newClasses) {
//         console.log('Classes change detected, reloading...');
//         location.reload();
//     }
// }, 5000);

// Manual refresh function for testing
function refreshClasses() {
    console.log('Manual refresh triggered');
    location.reload();
}

// Check Appwrite connection and data
async function checkAppwriteConnection() {
    console.log('=== APPWRITE DEBUG ===');
    
    // Check Appwrite initialization
    console.log('Appwrite initialized:', appwriteManager.initialized);
    
    try {
        // Get users from Appwrite
        const users = await appwriteManager.loadUsers();
        console.log('Users from Appwrite:', users);
        console.log('Number of users:', users.length);
        
        if (users.length > 0) {
            users.forEach((user, index) => {
                console.log(`User ${index + 1}:`, user.fullName);
            });
            alert(`Found ${users.length} users in Appwrite! Check console for details.`);
        } else {
            alert('No users found in Appwrite, database is ready for new entries');
        }
    } catch (error) {
        console.error('Error accessing Appwrite:', error);
        alert('Error accessing Appwrite: ' + error.message);
    }
    
    console.log('=== END DEBUG ===');
}

// Add test user to Appwrite
async function addTestUser() {
    const testUser = {
        fullName: "Test User from Website",
        gender: "other",
        email: "test@example.com",
        phone: "1234567890",
        location: "Test Location"
    };
    
    try {
        const result = await appwriteManager.saveUser(testUser);
        alert('Test user added to Appwrite! Click Check Appwrite Data to see it.');
        console.log('Test user added to Appwrite:', result);
        
        // Refresh user list if display function exists
        if (typeof displayUsers === 'function') {
            await displayUsers();
        }
    } catch (error) {
        console.error('Error adding test user to Appwrite:', error);
        alert('Error adding test user: ' + error.message);
    }
}

// Handle contact form submission
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.innerHTML = '<div class="spinner"></div> Sending...';
    submitBtn.disabled = true;
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    // Create contact data object
    const contactData = {
        name: name,
        email: email,
        phone: phone,
        message: message,
        timestamp: new Date().toISOString()
    };
    
    // Save contact to Appwrite (optional - could be added later)
    // For now, just show success message
    console.log('Contact data:', contactData);
    
    // Show success message
    showNotification('Thank you for your message! We will get back to you within 24 hours.', 'success');
    
    // Reset form
    form.reset();
    
    // Reset button after 3 seconds
    setTimeout(() => {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }, 3000);
}

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// FAQ Functions
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const faqAnswer = faqItem.querySelector('.faq-answer');
    const icon = element.querySelector('i');
    
    // Close other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem && item.classList.contains('active')) {
            item.classList.remove('active');
            const otherAnswer = item.querySelector('.faq-answer');
            if (otherAnswer) {
                otherAnswer.style.display = 'none';
            }
            const otherIcon = item.querySelector('.faq-question i');
            if (otherIcon) {
                otherIcon.classList.remove('fa-chevron-up');
                otherIcon.classList.add('fa-chevron-down');
            }
        }
    });
    
    // Toggle current FAQ item
    if (faqItem.classList.contains('active')) {
        faqItem.classList.remove('active');
        if (faqAnswer) {
            faqAnswer.style.display = 'none';
        }
        if (icon) {
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        }
    } else {
        faqItem.classList.add('active');
        if (faqAnswer) {
            faqAnswer.style.display = 'block';
        }
        if (icon) {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        }
    }
}

function filterFAQ(category) {
    const faqItems = document.querySelectorAll('.faq-item');
    const tabs = document.querySelectorAll('.category-tab');
    
    // Update active tab
    tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('onclick').includes(category)) {
            tab.classList.add('active');
        }
    });
    
    // Filter FAQ items
    faqItems.forEach(item => {
        const faqAnswer = item.querySelector('.faq-answer');
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
            // Reset answer visibility when filtering
            if (faqAnswer) {
                faqAnswer.style.display = 'none';
            }
            item.classList.remove('active');
            const icon = item.querySelector('.faq-question i');
            if (icon) {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
            // Add animation
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        } else {
            item.style.display = 'none';
        }
    });
}

// Modal Functions
function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

function closePaymentModal() {
    closeModal();
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});
