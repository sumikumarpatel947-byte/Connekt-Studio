// Class Data - Read from Admin Panel Database
function getClassesFromDatabase() {
    const adminClasses = localStorage.getItem('classes');
    if (adminClasses) {
        const classes = JSON.parse(adminClasses);
        return classes.map(classData => ({
            id: classData.id,
            name: classData.name,
            description: classData.description || "Experience the transformative power of yoga with our expert instructors.",
            duration: classData.duration || "60 minutes",
            price: `₹${classData.price.toLocaleString()}`,
            level: classData.level || "All Levels",
            schedule: classData.schedule || "Flexible Schedule",
            instructor: classData.instructor || "Expert Instructor",
            experience: "5+ years",
            students: Math.floor(Math.random() * 500) + 50,
            rating: (Math.random() * 0.5 + 4.5).toFixed(1),
            features: [
                "Live Interactive Sessions",
                "Expert Guidance",
                "Personalized Attention",
                "Flexible Timing",
                "Certificate Available",
                "Community Support"
            ],
            image: classData.image || "https://images.unsplash.com/photo-1599901860903-17e6ed7083a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
        }));
    }
    
    // Fallback to default classes if no admin data exists
    return [
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
            image: "https://images.unsplash.com/photo-1774857491446-dfab0acd73a8?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 2,
            name: "Power Yoga",
            description: "Dynamic and challenging yoga practice for building strength, flexibility, and endurance.",
            duration: "1 Month",
            price: "₹1,999",
            level: "Intermediate",
            schedule: "Tue, Thu, Sat - 7:00 AM",
            instructor: "Rahul Verma",
            experience: "10 years",
            students: 890,
            rating: 4.9,
            features: [
                "12 Live Sessions",
                "Advanced Poses",
                "Strength Building",
                "Cardio Workout",
                "Core Training",
                "Personalized Feedback"
            ],
            image: "https://images.unsplash.com/photo-1599901860903-17e6ed7083a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 3,
            name: "Meditation & Mindfulness",
            description: "Learn various meditation techniques to reduce stress, improve focus, and find inner peace.",
            duration: "1 Month",
            price: "₹1,499",
            level: "All Levels",
            schedule: "Daily - 6:00 AM",
            instructor: "Anita Patel",
            experience: "8 years",
            students: 456,
            rating: 4.7,
            features: [
                "30 Live Sessions",
                "Guided Meditation",
                "Breathing Techniques",
                "Stress Management",
                "Mindfulness Training",
                "Sleep Improvement"
            ],
            image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 4,
            name: "Yoga for Weight Loss",
            description: "Specialized yoga program designed for effective weight loss and body toning.",
            duration: "45 Days",
            price: "₹3,499",
            level: "Intermediate",
            schedule: "Mon, Wed, Fri - 5:30 PM",
            instructor: "Priya Sharma",
            experience: "6 years",
            students: 723,
            rating: 4.8,
            features: [
                "45 Live Sessions",
                "Weight Loss Focus",
                "Diet Guidance",
                "Body Toning",
                "Metabolism Boost",
                "Progress Tracking"
            ],
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
        }
    ];
}

const classes = getClassesFromDatabase();

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadClasses();
    setupEventListeners();
    setupSmoothScrolling();
});

// Load Classes
function loadClasses() {
    const classesGrid = document.getElementById('classesGrid');
    
    if (classesGrid) {
        classesGrid.innerHTML = ''; // Clear existing content
        classes.forEach(classItem => {
            const classCard = createClassCard(classItem);
            classesGrid.appendChild(classCard);
        });
    }
}

// Create Class Card
function createClassCard(classItem) {
    const card = document.createElement('div');
    card.className = 'class-card fade-in-up';
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
    
    // Store class data for enrollment form
    localStorage.setItem('selectedClass', JSON.stringify(classItem));
    
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
    
    // Store class data for details modal
    localStorage.setItem('selectedClass', JSON.stringify(classItem));
    
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
    
    const formData = new FormData(e.target);
    const enrollmentData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        classId: JSON.parse(localStorage.getItem('selectedClass')).id,
        className: JSON.parse(localStorage.getItem('selectedClass')).name,
        classPrice: JSON.parse(localStorage.getItem('selectedClass')).price,
        timestamp: new Date().toISOString()
    };
    
    // Save enrollment to localStorage
    const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    enrollments.push(enrollmentData);
    localStorage.setItem('enrollments', JSON.stringify(enrollments));
    
    // Show success message
    showNotification('Enrollment submitted successfully! We will contact you soon.', 'success');
    
    // Close modal
    closeModal();
    
    // Reset form
    e.target.reset();
    
    // Clear selected class
    localStorage.removeItem('selectedClass');
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
    
    // Save contact to localStorage
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    contacts.push(contactData);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    
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
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
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

// Refresh classes when admin makes changes
window.addEventListener('storage', function(e) {
    if (e.key === 'classes') {
        // Reload classes if admin updated them
        location.reload();
    }
});

// Auto-refresh classes every 30 seconds to sync with admin changes
setInterval(function() {
    const currentClasses = JSON.stringify(classes);
    const newClasses = JSON.stringify(getClassesFromDatabase());
    
    if (currentClasses !== newClasses) {
        location.reload();
    }
}, 30000);
