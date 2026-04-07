// Connekt Studio - Frontend Only Script
// No backend dependencies - Pure UI functionality

console.log('Connekt Studio Frontend Loaded');

// ============================================================================
// STATIC DUMMY DATA (No Database)
// ============================================================================

// Static classes data for demo
const STATIC_CLASSES = [
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
// UI FUNCTIONS (No Backend Logic)
// ============================================================================

// Show status message (UI only)
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

// Load classes (static data)
function loadClasses() {
    console.log('Loading static classes data');
    displayClasses(STATIC_CLASSES);
    return STATIC_CLASSES;
}

// Display classes
function displayClasses(classes) {
    const classesGrid = document.getElementById('classesGrid');
    if (!classesGrid) return;
    
    classesGrid.innerHTML = classes.map(cls => `
        <div class="class-card stagger-animation">
            <div class="class-image">
                <img src="${cls.image}" alt="${cls.name}">
                <div class="class-badge">${cls.level}</div>
            </div>
            <div class="class-content">
                <h3>${cls.name}</h3>
                <p>${cls.description}</p>
                <div class="class-meta">
                    <span><i class="fas fa-clock"></i> ${cls.duration}</span>
                    <span><i class="fas fa-tag"></i> ${cls.price}</span>
                    <span><i class="fas fa-signal"></i> ${cls.level}</span>
                </div>
                <div class="class-instructor">
                    <img src="https://picsum.photos/seed/instructor${cls.id}/40/40.jpg" alt="${cls.instructor}">
                    <div>
                        <strong>${cls.instructor}</strong>
                        <small>${cls.experience} experience</small>
                    </div>
                </div>
                <button class="btn btn-primary" onclick="enrollInClass(${cls.id})">
                    Enroll Now
                </button>
            </div>
        </div>
    `).join('');
}

// Enroll in class (UI only - no backend)
function enrollInClass(classId) {
    const classData = STATIC_CLASSES.find(cls => cls.id === classId);
    if (classData) {
        showStatus(`Successfully enrolled in ${classData.name}!`, 'success');
    } else {
        showStatus('Class not found', 'error');
    }
}

// Check frontend data (UI function)
function checkFrontendData() {
    console.log('Checking frontend data...');
    showStatus('Frontend data loaded successfully!', 'success');
}

// Add test user (UI only)
function addTestUser() {
    console.log('Adding test user (UI only)...');
    showStatus('Test user added successfully!', 'success');
}

// Refresh classes (UI only)
function refreshClasses() {
    console.log('Refreshing classes...');
    loadClasses();
    showStatus('Classes refreshed!', 'success');
}

// ============================================================================
// FORM HANDLERS (No Backend Submit)
// ============================================================================

// Handle user form submission (UI only)
function handleUserFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = {
        fullName: document.getElementById("fullName")?.value || '',
        email: document.getElementById("email")?.value || '',
        phone: document.getElementById("phone")?.value || '',
        location: document.getElementById("location")?.value || ''
    };
    
    // Show success message (no backend save)
    showStatus('Form submitted successfully!', 'success');
    
    // Reset form
    if (event.target) {
        event.target.reset();
    }
    
    console.log('Form data (UI only):', formData);
}

// ============================================================================
// NAVIGATION AND UI INTERACTIONS
// ============================================================================

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ============================================================================
// BUTTON FUNCTIONS AND INTERACTIONS
// ============================================================================

// Enroll in class
function enrollInClass(classId) {
    const classData = STATIC_CLASSES.find(c => c.id === classId);
    if (classData) {
        console.log('Enrolling in:', classData.name);
        showMessage('info', `Enrollment for "${classData.name}" initiated! Please contact us to complete enrollment.`);
        
        // Scroll to contact section
        setTimeout(() => {
            scrollToSection('contact');
        }, 1500);
    }
}

// Show class details
function showClassDetails(classId) {
    const classData = STATIC_CLASSES.find(c => c.id === classId);
    if (classData) {
        console.log('Showing details for:', classData.name);
        
        // Create modal content
        const modalContent = `
            <h3>${classData.name}</h3>
            <p><strong>Instructor:</strong> ${classData.instructor}</p>
            <p><strong>Duration:</strong> ${classData.duration}</p>
            <p><strong>Level:</strong> ${classData.level}</p>
            <p><strong>Schedule:</strong> ${classData.schedule}</p>
            <p><strong>Price:</strong> ${classData.price}</p>
            <p><strong>Students:</strong> ${classData.students}</p>
            <p><strong>Rating:</strong> ${classData.rating} stars</p>
            <p>${classData.description}</p>
            <h4>Features:</h4>
            <ul>
                ${classData.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <div style="margin-top: 20px;">
                <button class="btn btn-primary" onclick="enrollInClass(${classId})">Enroll Now</button>
                <button class="btn btn-secondary" onclick="closeModal('classModal')">Close</button>
            </div>
        `;
        
        // Show modal
        showClassModal(modalContent);
    }
}

// Show class modal
function showClassModal(content) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('classModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'classModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Class Details</h3>
                    <span class="close-btn" onclick="closeModal('classModal')">&times;</span>
                </div>
                <div class="modal-body" id="classModalBody">
                    <!-- Content will be inserted here -->
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // Insert content and show modal
    document.getElementById('classModalBody').innerHTML = content;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Toggle FAQ item
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const icon = element.querySelector('i');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
            const otherAnswer = item.querySelector('.faq-answer');
            const otherIcon = item.querySelector('.faq-question i');
            if (otherAnswer) {
                otherAnswer.style.maxHeight = '0';
            }
            if (otherIcon) {
                otherIcon.style.transform = 'rotate(0deg)';
            }
        }
    });
    
    // Toggle current item
    faqItem.classList.toggle('active');
    if (answer) {
        answer.style.maxHeight = faqItem.classList.contains('active') 
            ? answer.scrollHeight + 'px' 
            : '0';
    }
    
    // Rotate icon
    if (icon) {
        icon.style.transform = faqItem.classList.contains('active') 
            ? 'rotate(180deg)' 
            : 'rotate(0deg)';
    }
}

// Filter FAQ by category
function filterFAQ(category) {
    // Update active tab
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filter FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    
    console.log('FAQ filtered by category:', category);
}

// Refresh classes
function refreshClasses() {
    const classesGrid = document.getElementById('classesGrid');
    if (classesGrid) {
        showMessage('info', 'Refreshing classes...');
        
        // Add loading animation
        classesGrid.style.opacity = '0.5';
        
        setTimeout(() => {
            classesGrid.style.opacity = '1';
            showMessage('success', 'Classes refreshed successfully!');
        }, 1000);
    }
}

// Check frontend data
function checkFrontendData() {
    console.log('Frontend Data Check:');
    console.log('Classes:', STATIC_CLASSES.length);
    console.log('Configuration:', typeof CONFIG !== 'undefined' ? 'Loaded' : 'Not loaded');
    
    showMessage('info', `Frontend data loaded: ${STATIC_CLASSES.length} classes available`);
}

// Add test user
function addTestUser() {
    showMessage('success', 'Test user added successfully! (UI only)');
    console.log('Test user created (frontend only)');
}

// Handle contact form submission (global function)
function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    console.log('Contact form submitted:', data);
    showMessage('success', 'Thank you for contacting us! We will get back to you soon.');
    form.reset();
}

// Close modal function (global)
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close payment modal function (global)
function closePaymentModal() {
    closeModal('paymentModal');
}

// Handle navigation clicks
document.addEventListener('DOMContentLoaded', function() {
    console.log('Frontend initialized (no backend)');
    
    // Initialize configuration
    if (typeof CONFIG !== 'undefined') {
        CONFIG.initialize();
    }
    
    // Setup smooth scrolling for all navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Setup mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Setup contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactForm(this);
        });
    }
    
    // Setup enrollment buttons
    const enrollButtons = document.querySelectorAll('[onclick*="enroll"]');
    enrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            handleEnrollment(this);
        });
    });
    
    // Setup FAQ accordion
    setupFAQ();
    
    // Setup class cards
    setupClassCards();
});

// Handle contact form submission
function handleContactForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    console.log('Contact form submitted:', data);
    showMessage('success', 'Thank you for contacting us! We will get back to you soon.');
    form.reset();
}

// Handle enrollment
function handleEnrollment(button) {
    const className = button.getAttribute('data-class') || 'Class';
    console.log('Enrollment requested for:', className);
    showMessage('info', 'Enrollment feature coming soon! Please contact us directly for now.');
}

// Setup FAQ accordion
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                    const faqAnswer = faqItem.querySelector('.faq-answer');
                    if (faqAnswer) {
                        faqAnswer.style.maxHeight = '0';
                    }
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        }
    });
}

// Setup class cards
function setupClassCards() {
    const classCards = document.querySelectorAll('.class-card');
    
    classCards.forEach(card => {
        const enrollBtn = card.querySelector('.enroll-btn');
        const viewDetailsBtn = card.querySelector('.view-details-btn');
        
        if (enrollBtn) {
            enrollBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const className = card.querySelector('.class-title')?.textContent || 'Class';
                handleEnrollment(this);
            });
        }
        
        if (viewDetailsBtn) {
            viewDetailsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const classId = card.getAttribute('data-class-id');
                showClassDetails(classId);
            });
        }
    });
}

// Show notification message
function showMessage(type, message) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.notification-toast');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification-toast ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Handle modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Close modal on outside click
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target.id);
    }
});

// Handle escape key for modals
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal[style*="block"]');
        if (openModal) {
            closeModal(openModal.id);
        }
    }
});
    
    // Setup scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.stagger-animation, .fade-in');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    console.log('Frontend initialization complete');
});

// ============================================================================
// UTILITY FUNCTIONS (UI Only)
// ============================================================================

// Format currency
function formatCurrency(amount) {
    return `₹${amount.toLocaleString()}`;
}

// Format date
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Validate email (UI only)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate phone (UI only)
function validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
}

// Show loading state
function showLoading(element) {
    if (element) {
        element.disabled = true;
        element.innerHTML = '<span class="spinner"></span> Loading...';
    }
}

// Hide loading state
function hideLoading(element, originalText) {
    if (element) {
        element.disabled = false;
        element.innerHTML = originalText;
    }
}

console.log('Connekt Studio Frontend Script Loaded Successfully');
