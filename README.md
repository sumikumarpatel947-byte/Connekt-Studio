# Connekt Studio - Yoga & Fitness Website

A modern, professional website for Connekt Studio offering online yoga, fitness, and meditation classes with payment integration and class management.

## 🧘‍♀️ Features

- **Modern Design**: Clean, professional interface with white, light green, and soft beige theme
- **Responsive Layout**: Fully mobile-responsive design that works on all devices
- **Class Management**: Display various yoga and fitness classes with detailed information
- **Payment System**: Integrated payment UI supporting UPI, Credit Cards, and Net Banking
- **Class Details**: Modal popups showing comprehensive class information
- **Access System**: Post-purchase access instructions for Zoom/Google Meet links
- **Testimonials**: Student reviews and ratings for trust building
- **Contact Form**: Functional contact form with validation
- **Smooth Animations**: Professional animations and transitions throughout

## 📁 Project Structure

```
Connekt Studio/
├── index.html          # Main HTML file
├── styles.css          # Complete CSS styling
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation

1. **Download/Clone the project** to your local machine

2. **Open the website**:
   - Simply open `index.html` in your web browser
   - Or use a local web server for better development experience

### Using a Local Server (Optional)

If you want to use a local server for development:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using Live Server extension in VS Code
Right-click on index.html → Open with Live Server
```

Then navigate to `http://localhost:8000` in your browser.

## 💻 Website Sections

### 1. Hero Section
- Compelling headline and call-to-action
- Professional yoga imagery
- Clear navigation to key sections

### 2. About Section
- Focus on mind-body wellness
- Key benefits of yoga and fitness
- Professional presentation

### 3. Online Classes
- **6 Different Classes**:
  - Yoga for Beginners
  - Power Yoga
  - Meditation & Mindfulness
  - Fitness Training
  - Prenatal Yoga
  - Weight Loss Program

### 4. Class Details Modal
- Comprehensive class information
- Instructor details
- Schedule and pricing
- Features and benefits
- Direct enrollment option

### 5. Payment System
- **Multiple Payment Methods**:
  - UPI (Google Pay, PhonePe, PayTM)
  - Credit/Debit Cards
  - Net Banking
- Secure payment interface
- Transaction confirmation

### 6. Access System
- Post-payment success screen
- Access instructions for live classes
- Email confirmation details
- Community access information

### 7. Pricing Plans
- Beginner: ₹1,499/month
- Intermediate: ₹2,499/month (Most Popular)
- Advanced: ₹3,999/month

### 8. Testimonials
- Real student reviews
- Star ratings
- Student photos and experiences

### 9. Contact Section
- Contact information (Phone, WhatsApp, Email)
- Functional contact form
- Professional layout

## 🎨 Design Features

### Color Scheme
- **Primary**: #2d6a4f (Deep Green)
- **Secondary**: #40916c (Light Green)
- **Background**: #ffffff (White)
- **Accent**: #f8f9fa (Light Gray)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, professional
- **Body**: Clean, readable

### Responsive Design
- **Desktop**: Full-featured layout
- **Tablet**: Optimized spacing
- **Mobile**: Compact, touch-friendly

## ⚡ Interactive Features

### Animations
- Smooth scroll animations
- Hover effects on cards
- Parallax scrolling on hero
- Fade-in animations
- Loading states

### User Experience
- Intuitive navigation
- Clear call-to-actions
- Modal interactions
- Form validation
- Success/error messages

### Functional Elements
- Working contact form
- Payment processing simulation
- Class enrollment flow
- Mobile menu toggle
- Smooth scrolling

## 🔧 Customization

### Adding New Classes

Edit `script.js` and add to the `classes` array:

```javascript
{
    id: 7,
    name: "New Class Name",
    description: "Class description",
    duration: "1 Month",
    price: "₹1,999",
    level: "All Levels",
    schedule: "Mon, Wed, Fri - 6:00 AM",
    instructor: "Instructor Name",
    experience: "5 years",
    students: 500,
    rating: 4.9,
    features: [
        "Feature 1",
        "Feature 2",
        "Feature 3"
    ],
    image: "🧘‍♀️"
}
```

### Customizing Colors

Edit `styles.css` and modify the CSS variables:

```css
:root {
    --primary-color: #2d6a4f;
    --secondary-color: #40916c;
    --background-color: #ffffff;
    --accent-color: #f8f9fa;
}
```

### Updating Contact Information

Edit the contact section in `index.html`:

```html
<div class="contact-item">
    <i class="fas fa-phone"></i>
    <div>
        <h3>Phone</h3>
        <p>Your Phone Number</p>
    </div>
</div>
```

## 📱 Mobile Optimization

The website is fully responsive and includes:

- **Touch-friendly buttons** and navigation
- **Optimized layouts** for mobile screens
- **Compressed animations** for better performance
- **Readable text** on small screens
- **Accessible forms** with proper input types

## 🔒 Security Considerations

- **Payment simulation** (no real payment processing)
- **Form validation** on client-side
- **Secure external links**
- **No sensitive data storage**

## 🌐 Browser Support

- **Chrome** (Recommended)
- **Firefox**
- **Safari**
- **Edge**
- **Mobile browsers**

## 📈 Performance

- **Optimized images** using Unsplash CDN
- **Minified CSS** (production-ready)
- **Efficient JavaScript** with event delegation
- **Lazy loading** considerations
- **Smooth animations** using CSS transforms

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For any questions or support regarding this website:

- **Email**: info@connektstudio.com
- **Phone**: +91 98765 43210
- **WhatsApp**: +91 98765 43210

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Unsplash** for professional stock images
- **Font Awesome** for icons
- **Google Fonts** for typography
- **Reference**: Adhyatma Yog website structure

---

**Built with ❤️ for Connekt Studio**

Transform your body and mind naturally through yoga, fitness, and meditation.
