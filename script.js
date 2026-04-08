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
            "Flexibility Training"
        ],
        image: "https://images.unsplash.com/photo-1599901860903-17e6ed7083a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        name: "Meditation & Mindfulness",
        description: "Learn meditation techniques to reduce stress and improve mental clarity.",
        duration: "60 minutes",
        price: "₹1,499",
        level: "All Levels",
        schedule: "Daily, 6:00 PM",
        instructor: "Meditation Expert",
        experience: "8 years",
        students: 180,
        rating: 4.7,
        features: [
            "Guided Meditation",
            "Breathing Techniques",
            "Stress Management",
            "Mindfulness Practices",
            "Mental Clarity"
        ],
        image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        name: "Yoga for Weight Loss",
        description: "Specialized yoga program designed for weight management and body toning.",
        duration: "45 minutes",
        price: "₹1,799",
        level: "Intermediate",
        schedule: "Mon-Wed-Fri, 5:00 PM",
        instructor: "Fitness Expert",
        experience: "6 years",
        students: 200,
        rating: 4.6,
        features: [
            "Weight Loss Focus",
            "Cardio Yoga",
            "Strength Training",
            "Diet Guidance",
            "Body Toning"
        ],
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    }
];

// ============================================================================
// BUTTON FUNCTIONS AND INTERACTIONS
// ============================================================================

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Enroll in class - Professional Implementation
function enrollInClass(classId) {
    const classData = STATIC_CLASSES.find(c => c.id === classId);
    if (classData) {
        // Create WhatsApp message with class details
        const whatsappMessage = encodeURIComponent(
            `Hi! I'm interested in enrolling in the "${classData.name}" class.\n\n` +
            `Schedule: ${classData.schedule}\n` +
            `Instructor: ${classData.instructor}\n` +
            `Duration: ${classData.duration}\n` +
            `Price: ${classData.price}\n` +
            `Level: ${classData.level}\n\n` +
            `Please provide more information about enrollment. Thank you!`
        );
        
        // Open WhatsApp with pre-filled message
        const whatsappUrl = `https://wa.me/919039570885?text=${whatsappMessage}`;
        
        // Show notification and redirect
        showMessage('success', `Opening WhatsApp to enroll in "${classData.name}"...`);
        
        // Open WhatsApp in new tab
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 1000);
    }
}

// Show class details - Professional Implementation
function showClassDetails(classId) {
    const classData = STATIC_CLASSES.find(c => c.id === classId);
    if (classData) {
        // Create comprehensive modal content
        const modalContent = `
            <div class="class-details-modal">
                <div class="class-details-header">
                    <div class="class-details-image">
                        <img src="${classData.image}" alt="${classData.name}">
                        <div class="class-details-badge">${classData.level}</div>
                    </div>
                    <div class="class-details-info">
                        <h2>${classData.name}</h2>
                        <div class="class-details-meta">
                            <div class="meta-detail">
                                <i class="fas fa-user-tie"></i>
                                <div>
                                    <strong>Instructor</strong>
                                    <span>${classData.instructor}</span>
                                </div>
                            </div>
                            <div class="meta-detail">
                                <i class="fas fa-clock"></i>
                                <div>
                                    <strong>Duration</strong>
                                    <span>${classData.duration}</span>
                                </div>
                            </div>
                            <div class="meta-detail">
                                <i class="fas fa-calendar"></i>
                                <div>
                                    <strong>Schedule</strong>
                                    <span>${classData.schedule}</span>
                                </div>
                            </div>
                            <div class="meta-detail">
                                <i class="fas fa-tag"></i>
                                <div>
                                    <strong>Price</strong>
                                    <span>${classData.price}</span>
                                </div>
                            </div>
                            <div class="meta-detail">
                                <i class="fas fa-signal"></i>
                                <div>
                                    <strong>Level</strong>
                                    <span>${classData.level}</span>
                                </div>
                            </div>
                            <div class="meta-detail">
                                <i class="fas fa-users"></i>
                                <div>
                                    <strong>Students</strong>
                                    <span>${classData.students} enrolled</span>
                                </div>
                            </div>
                            <div class="meta-detail">
                                <i class="fas fa-star"></i>
                                <div>
                                    <strong>Rating</strong>
                                    <span>${classData.rating} / 5.0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="class-details-description">
                    <h3>About This Class</h3>
                    <p>${classData.description}</p>
                </div>
                
                <div class="class-details-features">
                    <h3>What You'll Learn</h3>
                    <div class="features-grid">
                        ${classData.features.map(feature => `
                            <div class="feature-card">
                                <i class="fas fa-check-circle"></i>
                                <span>${feature}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="class-details-actions">
                    <button class="btn btn-primary btn-large" onclick="enrollInClass(${classId})">
                        <i class="fas fa-plus-circle"></i>
                        Enroll Now
                    </button>
                    <button class="btn btn-secondary btn-large" onclick="closeModal('classModal')">
                        <i class="fas fa-times"></i>
                        Close
                    </button>
                </div>
            </div>
        `;
        
        // Show modal
        showClassModal(modalContent);
    }
}

// Show class modal - Professional Implementation
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


// Filter FAQ by category
function filterFAQ(category) {
    // Update active tab
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Find the clicked tab and make it active
    event.target.classList.add('active');
    
    // Filter FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        const itemCategory = item.dataset.category;
        if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
            item.style.animation = 'slideDown 0.3s ease';
        } else {
            item.style.display = 'none';
        }
    });
}

// FAQ Toggle Function - Final Working Implementation
function toggleFAQ(index) {
    const faqItems = document.querySelectorAll('.faq-item');
    const clickedItem = faqItems[index];
    const answer = clickedItem.querySelector('.faq-answer');
    const icon = clickedItem.querySelector('.faq-question i');
    
    // Close all other FAQ items
    faqItems.forEach((item, i) => {
        if (i !== index) {
            item.classList.remove('active');
            const otherAnswer = item.querySelector('.faq-answer');
            const otherIcon = item.querySelector('.faq-question i');
            if (otherAnswer) {
                otherAnswer.style.display = 'none';
                otherAnswer.style.opacity = '0';
            }
            if (otherIcon) {
                otherIcon.style.transform = 'rotate(0deg)';
            }
        }
    });
    
    // Toggle current item
    if (clickedItem.classList.contains('active')) {
        clickedItem.classList.remove('active');
        answer.style.display = 'none';
        answer.style.opacity = '0';
        icon.style.transform = 'rotate(0deg)';
    } else {
        clickedItem.classList.add('active');
        answer.style.display = 'block';
        answer.style.opacity = '1';
        icon.style.transform = 'rotate(180deg)';
    }
}

// FAQ Filter Function - New Implementation
function filterFAQ(category) {
    const faqItems = document.querySelectorAll('.faq-item');
    const tabs = document.querySelectorAll('.category-tab');
    
    // Update active tab
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter items
    faqItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
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
    
    // Get form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validation
    const errors = [];
    
    if (!name) {
        errors.push('Name is required');
    }
    
    if (!email) {
        errors.push('Email is required');
    } else if (!isValidEmail(email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!phone) {
        errors.push('Phone number is required');
    } else if (!isValidPhone(phone)) {
        errors.push('Please enter a valid phone number');
    }
    
    if (!message) {
        errors.push('Message is required');
    } else if (message.length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    // If there are errors, show them
    if (errors.length > 0) {
        showMessage('error', errors.join(', '));
        return;
    }
    
    // Create data object
    const data = { name, email, phone, message };
    
    console.log('Contact form submitted:', data);
    showMessage('success', 'Thank you for contacting us! We will get back to you soon.');
    form.reset();
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation helper
function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    return phoneRegex.test(phone) && phone.length >= 10;
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

// ============================================================================
// INITIALIZATION
// ============================================================================

// Handle navigation clicks
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing FAQ');
    
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
    
    // Setup category tabs
    const categoryTabs = document.querySelectorAll('.category-tab');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            // Get category from text content
            let category = this.textContent.toLowerCase().replace(' questions', '').replace(' ', '-');
            if (category === 'all') {
                category = 'all';
            }
            filterFAQ(category);
        });
    });
});

// Handle contact form submission
function handleContactForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    showMessage('success', 'Thank you for contacting us! We will get back to you soon.');
    form.reset();
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
