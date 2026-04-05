// Enhanced JavaScript with Admin Database Integration

// Initialize data from localStorage
function initializeData() {
    if (!localStorage.getItem('classes')) {
        localStorage.setItem('classes', JSON.stringify([
            {
                id: 1,
                name: "Yoga for Beginners",
                category: "yoga",
                price: 2999,
                duration: "60 minutes",
                description: "Perfect for those new to yoga. Learn basic poses, breathing techniques, and relaxation methods.",
                image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
                instructor: "Priya Sharma",
                schedule: "Mon, Wed, Fri - 6:00 AM",
                status: "active",
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                name: "Power Yoga",
                category: "fitness",
                price: 3999,
                duration: "75 minutes",
                description: "Intense workout for advanced practitioners. Build strength, flexibility, and endurance.",
                image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
                instructor: "Rahul Verma",
                schedule: "Tue, Thu - 7:00 PM",
                status: "active",
                createdAt: new Date().toISOString()
            },
            {
                id: 3,
                name: "Meditation & Mindfulness",
                category: "meditation",
                price: 1999,
                duration: "45 minutes",
                description: "Learn meditation techniques to reduce stress and improve mental clarity.",
                image: "https://images.unsplash.com/photo-1499209974431-9dddcece7b88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
                instructor: "Anita Patel",
                schedule: "Daily - 5:30 AM",
                status: "active",
                createdAt: new Date().toISOString()
            },
            {
                id: 4,
                name: "Dance Fitness",
                category: "dance",
                price: 3499,
                duration: "60 minutes",
                description: "Fun dance workouts that combine cardio with dance moves for a full-body workout.",
                image: "https://images.unsplash.com/photo-1547153773-0053a1f5911be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
                instructor: "Deepika Malhotra",
                schedule: "Sat, Sun - 9:00 AM",
                status: "active",
                createdAt: new Date().toISOString()
            }
        ]));
    }
    
    if (!localStorage.getItem('customers')) {
        localStorage.setItem('customers', JSON.stringify([]));
    }
    
    if (!localStorage.getItem('enrollments')) {
        localStorage.setItem('enrollments', JSON.stringify([]));
    }
}

// Load classes dynamically
function loadClasses() {
    const classes = JSON.parse(localStorage.getItem('classes') || '[]');
    const classesGrid = document.getElementById('classesGrid');
    
    if (classesGrid) {
        classesGrid.innerHTML = '';
        
        classes.forEach(classData => {
            const classCard = document.createElement('div');
            classCard.className = 'class-card';
            classCard.innerHTML = `
                <div class="class-image">
                    <img src="${classData.image}" alt="${classData.name}">
                    <div class="class-badge">${classData.category}</div>
                </div>
                <div class="class-content">
                    <h3>${classData.name}</h3>
                    <p class="class-description">${classData.description}</p>
                    <div class="class-info">
                        <div class="class-info-item">
                            <i class="fas fa-user"></i>
                            <span>${classData.instructor}</span>
                        </div>
                        <div class="class-info-item">
                            <i class="fas fa-clock"></i>
                            <span>${classData.duration}</span>
                        </div>
                    </div>
                    <div class="class-schedule">
                        <i class="fas fa-calendar"></i>
                        <span>${classData.schedule}</span>
                    </div>
                    <div class="class-price">
                        <span class="price">₹${classData.price.toLocaleString()}</span>
                        <span class="duration">per month</span>
                    </div>
                    <button class="btn btn-primary enroll-btn" onclick="enrollClass(${classData.id})">
                        Enroll Now
                    </button>
                </div>
            `;
            classesGrid.appendChild(classCard);
        });
    }
}

// Enroll in class
function enrollClass(classId) {
    const classes = JSON.parse(localStorage.getItem('classes') || '[]');
    const classData = classes.find(c => c.id === classId);
    
    if (!classData) {
        showNotification('Class not found', 'error');
        return;
    }
    
    // Show enrollment modal
    showModal('enrollmentModal', classData);
}

// Show modal
function showModal(modalId, data) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    if (modalId === 'enrollmentModal' && data) {
        const modalBody = document.getElementById('modalBody');
        if (modalBody) {
            modalBody.innerHTML = `
                <div class="enrollment-form">
                    <h3>Enroll in ${data.name}</h3>
                    <form id="enrollmentForm">
                        <div class="form-group">
                            <label for="customerName">Full Name</label>
                            <input type="text" id="customerName" required>
                        </div>
                        <div class="form-group">
                            <label for="customerEmail">Email</label>
                            <input type="email" id="customerEmail" required>
                        </div>
                        <div class="form-group">
                            <label for="customerPhone">Phone</label>
                            <input type="tel" id="customerPhone" required>
                        </div>
                        <div class="form-group">
                            <label for="customerAge">Age</label>
                            <input type="number" id="customerAge" min="16" max="100" required>
                        </div>
                        <div class="form-group">
                            <label for="customerExperience">Experience Level</label>
                            <select id="customerExperience" required>
                                <option value="">Select Level</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="customerGoals">Goals</label>
                            <textarea id="customerGoals" placeholder="Tell us about your fitness goals..."></textarea>
                        </div>
                        <div class="class-summary">
                            <h4>Class Details</h4>
                            <p><strong>Class:</strong> ${data.name}</p>
                            <p><strong>Instructor:</strong> ${data.instructor}</p>
                            <p><strong>Schedule:</strong> ${data.schedule}</p>
                            <p><strong>Price:</strong> ₹${data.price.toLocaleString()}/month</p>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="closeModal('enrollmentModal')">Cancel</button>
                            <button type="submit" class="btn btn-primary">Complete Enrollment</button>
                        </div>
                    </form>
                </div>
            `;
                            
                            // Add form submission handler
                            document.getElementById('enrollmentForm').addEventListener('submit', function(e) {
                                e.preventDefault();
                                completeEnrollment(data.id);
                            });
                        }
                    }
                    
                    modal.style.display = 'block';
                }
                
                // Complete enrollment
                function completeEnrollment(classId) {
                    const classes = JSON.parse(localStorage.getItem('classes') || '[]');
                    const classData = classes.find(c => c.id === classId);
                    
                    const customerData = {
                        id: Date.now(),
                        name: document.getElementById('customerName').value,
                        email: document.getElementById('customerEmail').value,
                        phone: document.getElementById('customerPhone').value,
                        age: document.getElementById('customerAge').value,
                        experience: document.getElementById('customerExperience').value,
                        goals: document.getElementById('customerGoals').value,
                        createdAt: new Date().toISOString()
                    };
                    
                    const enrollmentData = {
                        id: Date.now(),
                        customerId: customerData.id,
                        classId: classId,
                        date: new Date().toISOString(),
                        status: 'pending',
                        paymentStatus: 'pending'
                    };
                    
                    // Save customer data
                    const customers = JSON.parse(localStorage.getItem('customers') || '[]');
                    customers.push(customerData);
                    localStorage.setItem('customers', JSON.stringify(customers));
                    
                    // Save enrollment data
                    const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
                    enrollments.push(enrollmentData);
                    localStorage.setItem('enrollments', JSON.stringify(enrollments));
                    
                    // Send WhatsApp message
                    const whatsappMessage = `New Enrollment Alert!📱\n\n` +
                        `👤 Name: ${customerData.name}\n` +
                        `📧 Email: ${customerData.email}\n` +
                        `📞 Phone: ${customerData.phone}\n` +
                        `🎂 Age: ${customerData.age}\n` +
                        `📊 Experience: ${customerData.experience}\n` +
                        `🎯 Goals: ${customerData.goals}\n\n` +
                        `🏃‍♂️ Class: ${classData.name}\n` +
                        `👨‍🏫 Instructor: ${classData.instructor}\n` +
                        `📅 Schedule: ${classData.schedule}\n` +
                        `💰 Price: ₹${classData.price.toLocaleString()}/month\n\n` +
                        `📅 Enrolled on: ${new Date().toLocaleDateString()}\n` +
                        `⏰ Time: ${new Date().toLocaleTimeString()}`;
                    
                    const whatsappUrl = `https://wa.me/919039570885?text=${encodeURIComponent(whatsappMessage)}`;
                    window.open(whatsappUrl, '_blank');
                    
                    // Close modal and show success
                    closeModal('enrollmentModal');
                    showNotification('Enrollment successful! Check WhatsApp for confirmation.', 'success');
                    
                    // Reset form
                    document.getElementById('enrollmentForm').reset();
                }
                
                // Close modal
                function closeModal(modalId) {
                    const modal = document.getElementById(modalId);
                    if (modal) {
                        modal.style.display = 'none';
                    }
                }
                
                // Show notification
                function showNotification(message, type = 'info') {
                    const notification = document.createElement('div');
                    notification.className = `notification ${type}`;
                    notification.innerHTML = `
                        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                        <span>${message}</span>
                    `;
                    
                    document.body.appendChild(notification);
                    
                    // Show notification
                    setTimeout(() => {
                        notification.classList.add('show');
                    }, 100);
                    
                    // Hide notification after 3 seconds
                    setTimeout(() => {
                        notification.classList.remove('show');
                        setTimeout(() => {
                            document.body.removeChild(notification);
                        }, 300);
                    }, 3000);
                }
                
                // Contact form handler
                function handleContactForm() {
                    const contactForm = document.getElementById('contactForm');
                    if (contactForm) {
                        contactForm.addEventListener('submit', function(e) {
                            e.preventDefault();
                            
                            const formData = {
                                name: document.getElementById('name').value,
                                email: document.getElementById('email').value,
                                phone: document.getElementById('phone').value,
                                message: document.getElementById('message').value,
                                date: new Date().toISOString()
                            };
                            
                            // Save to localStorage
                            const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
                            contacts.push(formData);
                            localStorage.setItem('contacts', JSON.stringify(contacts));
                            
                            // Send WhatsApp message
                            const whatsappMessage = `New Contact Inquiry!📞\n\n` +
                                `👤 Name: ${formData.name}\n` +
                                `📧 Email: ${formData.email}\n` +
                                `📞 Phone: ${formData.phone}\n` +
                                `💬 Message: ${formData.message}\n\n` +
                                `📅 Sent on: ${new Date().toLocaleDateString()}\n` +
                                `⏰ Time: ${new Date().toLocaleTimeString()}`;
                            
                            const whatsappUrl = `https://wa.me/919039570885?text=${encodeURIComponent(whatsappMessage)}`;
                            window.open(whatsappUrl, '_blank');
                            
                            // Show success message
                            showNotification('Message sent successfully! We\'ll contact you soon.', 'success');
                            
                            // Reset form
                            contactForm.reset();
                        });
                    }
                }
                
                // Newsletter form handler
                function handleNewsletterForm() {
                    const newsletterForm = document.getElementById('newsletterForm');
                    if (newsletterForm) {
                        newsletterForm.addEventListener('submit', function(e) {
                            e.preventDefault();
                            
                            const email = document.getElementById('newsletterEmail').value;
                            
                            // Save to localStorage
                            const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
                            if (!subscribers.includes(email)) {
                                subscribers.push(email);
                                localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
                            }
                            
                            // Show success message
                            showNotification('Successfully subscribed to newsletter!', 'success');
                            
                            // Reset form
                            newsletterForm.reset();
                        });
                    }
                }
                
                // Initialize everything when DOM is loaded
                document.addEventListener('DOMContentLoaded', function() {
                    initializeData();
                    loadClasses();
                    handleContactForm();
                    handleNewsletterForm();
                    
                    // Close modals when clicking outside
                    window.addEventListener('click', function(event) {
                        if (event.target.classList.contains('modal')) {
                            event.target.style.display = 'none';
                        }
                    });
                    
                    // Mobile menu toggle
                    const hamburger = document.querySelector('.hamburger');
                    const navMenu = document.querySelector('.nav-menu');
                    
                    if (hamburger && navMenu) {
                        hamburger.addEventListener('click', function() {
                            navMenu.classList.toggle('active');
                        });
                        
                        // Close menu when clicking on a link
                        document.querySelectorAll('.nav-menu a').forEach(link => {
                            link.addEventListener('click', function() {
                                navMenu.classList.remove('active');
                            });
                        });
                    }
                    
                    // Smooth scrolling for navigation links
                    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                        anchor.addEventListener('click', function (e) {
                            e.preventDefault();
                            const target = document.querySelector(this.getAttribute('href'));
                            if (target) {
                                target.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
                                });
                            }
                        });
                    });
                    
                    // Scroll animations
                    const observerOptions = {
                        threshold: 0.1,
                        rootMargin: '0px 0px -50px 0px'
                    };
                    
                    const observer = new IntersectionObserver(function(entries) {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                entry.target.style.opacity = '1';
                                entry.target.style.transform = 'translateY(0)';
                            }
                        });
                    }, observerOptions);
                    
                    // Observe elements with stagger-animation class
                    document.querySelectorAll('.stagger-animation').forEach(el => {
                        el.style.opacity = '0';
                        el.style.transform = 'translateY(20px)';
                        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        observer.observe(el);
                    });
                });
                
                // Export functions for global use
                window.enrollClass = enrollClass;
                window.closeModal = closeModal;
                window.showNotification = showNotification;
