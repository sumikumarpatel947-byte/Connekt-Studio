// Connekt Studio - Central Configuration
// This file contains all website settings that can be updated from admin panel

// Website Configuration
const WEBSITE_CONFIG = {
    // Basic Information
    websiteName: "Connekt Studio",
    ownerName: "Hina Pamnani",
    contactEmail: "connektbmsstudio@gmail.com",
    phoneNumber: "+91 9039570885",
    whatsappNumber: "919039570885",
    address: "Ghanshyam niwas, Nai Basti, Gandhi Ganj, Katni, Madhya Pradesh 483501",
    
    // Social Media
    socialLinks: {
        facebook: "#",
        instagram: "#",
        twitter: "#",
        youtube: "#"
    },
    
    // Business Hours
    businessHours: {
        monday: "6:00 AM - 8:00 PM",
        tuesday: "6:00 AM - 8:00 PM",
        wednesday: "6:00 AM - 8:00 PM",
        thursday: "6:00 AM - 8:00 PM",
        friday: "6:00 AM - 8:00 PM",
        saturday: "6:00 AM - 8:00 PM",
        sunday: "6:00 AM - 8:00 PM"
    },
    
    // SEO Meta
    meta: {
        title: "Connekt Studio - Online Yoga, Fitness & Meditation Classes",
        description: "Join Connekt Studio for online yoga, fitness and meditation classes. Transform your life with expert instructors.",
        keywords: "yoga, fitness, meditation, online classes, wellness, health",
        author: "Hina Pamnani"
    }
};

// Save configuration to localStorage
function saveConfig(config) {
    localStorage.setItem('connektStudioConfig', JSON.stringify(config));
    console.log('Configuration saved to localStorage');
}

// Load configuration from localStorage
function loadConfig() {
    const saved = localStorage.getItem('connektStudioConfig');
    if (saved) {
        return JSON.parse(saved);
    }
    return WEBSITE_CONFIG;
}

// Update specific configuration value
function updateConfig(key, value) {
    const config = loadConfig();
    config[key] = value;
    saveConfig(config);
    
    // Update all pages dynamically
    updateAllPages(key, value);
    console.log(`Configuration updated: ${key} = ${value}`);
}

// Update all pages with new configuration
function updateAllPages(key, value) {
    // Update elements with specific data attributes
    const elements = document.querySelectorAll(`[data-config="${key}"]`);
    elements.forEach(element => {
        element.textContent = value;
    });
    
    // Update specific elements based on key
    switch(key) {
        case 'contactEmail':
            updateEmails(value);
            break;
        case 'phoneNumber':
            updatePhoneNumbers(value);
            break;
        case 'whatsappNumber':
            updateWhatsAppLinks(value);
            break;
        case 'websiteName':
            updateWebsiteName(value);
            break;
        case 'ownerName':
            updateOwnerName(value);
            break;
        case 'address':
            updateAddress(value);
            break;
    }
}

// Update email elements
function updateEmails(email) {
    // Update mailto links
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.href = `mailto:${email}`;
    });
    
    // Update email text content
    document.querySelectorAll('[data-email]').forEach(element => {
        element.textContent = email;
    });
}

// Update phone number elements
function updatePhoneNumbers(phone) {
    // Update tel links
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.href = `tel:${phone}`;
    });
    
    // Update phone text content
    document.querySelectorAll('[data-phone]').forEach(element => {
        element.textContent = phone;
    });
}

// Update WhatsApp links
function updateWhatsAppLinks(number) {
    document.querySelectorAll('a[href^="https://wa.me/"]').forEach(link => {
        link.href = `https://wa.me/${number}?text=Hi!%20I'm%20interested%20in%20joining%20Connekt%20Studio%20yoga%20classes`;
    });
}

// Update website name
function updateWebsiteName(name) {
    document.querySelectorAll('[data-website-name]').forEach(element => {
        element.textContent = name;
    });
    
    // Update page title
    document.title = `${name} - Online Yoga, Fitness & Meditation Classes`;
}

// Update owner name
function updateOwnerName(name) {
    document.querySelectorAll('[data-owner]').forEach(element => {
        element.textContent = name;
    });
}

// Update address
function updateAddress(address) {
    document.querySelectorAll('[data-address]').forEach(element => {
        element.textContent = address;
    });
}

// Initialize configuration on page load
function initializeConfig() {
    const config = loadConfig();
    
    // Apply configuration to current page
    Object.keys(config).forEach(key => {
        updateAllPages(key, config[key]);
    });
    
    console.log('Configuration initialized');
}

// Export functions for admin panel
if (typeof window !== 'undefined') {
    window.CONFIG = {
        load: loadConfig,
        save: saveConfig,
        update: updateConfig,
        initialize: initializeConfig,
        current: loadConfig()
    };
}

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeConfig);
    } else {
        initializeConfig();
    }
}
