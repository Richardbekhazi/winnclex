# Global NCLEX Prep - Strategic Coaching Platform

## 🎯 Overview

**Global NCLEX Prep** is a professional NCLEX coaching platform designed to help nursing students pass the National Council Licensure Examination (NCLEX) with confidence. Our approach goes beyond memorization—we teach the strategies, clinical reasoning, and test-taking techniques that the NCLEX actually tests.

## ✨ Key Features

### Comprehensive Course Content
- **Strategy & Core Concepts** - Prioritization, Delegation, Infection Control, Medication Safety, Lab Values
- **Medical-Surgical Nursing** - Cardiac, Respiratory, Endocrine, Neurological, GI systems
- **Pharmacology** - Drug Toxicity, Classifications, Psychotropic Medications, Administration Safety
- **Special Populations** - Maternal/Newborn, Pediatrics, Psychiatric, Gerontology
- **Fundamentals & Basic Care** - Nutrition, Fluid/Electrolytes, Pain Management, Mobility
- **NGN & Clinical Judgment** - Unfolding case studies, Bowtie/Trend questions, Matrix strategies

### Multilingual Support
- 🇬🇧 English
- 🇫🇷 French
- 🇸🇦 Arabic

### Expert Coaching
- Strategies for NCLEX-style question decoding
- Mastery of prioritization and safety principles
- Clinical reasoning frameworks
- Common exam traps and pitfalls guidance
- Test-day confidence building

## 🚀 Technologies Used

- **HTML5** - Semantic markup with accessibility (ARIA) support
- **CSS3** - Responsive design, animations, and modern styling
- **JavaScript (Vanilla)** - Form validation, smooth scrolling, intersection observers
- **Formspree** - Contact form backend integration

## 📱 Responsive Design

Fully responsive layout optimized for:
- Desktop (1200px+)
- Tablet (768px - 1024px)
- Mobile (480px and below)

## ♿ Accessibility Features

- WCAG 2.1 compliant
- Semantic HTML with proper roles and labels
- ARIA attributes for screen readers
- Keyboard navigation support
- Focus management
- Color contrast compliance
- Reduced motion support

## 🔒 Form Features

- **Client-side validation** with real-time feedback
- Email format validation
- Minimum character requirements
- Error messages with ARIA alerts
- Accessible form controls with labels
- Integration with Formspree for email delivery

## 📦 Project Structure

```
winnclex/
├── index.html          # Main HTML file with complete page structure
├── style.css           # All styling and responsive design
├── script.js           # Form validation and interactive features
├── README.md           # This file
├── .gitignore          # Git ignore rules
└── LICENSE             # MIT License
```

## 🛠️ Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/Richardbekhazi/winnclex.git
cd winnclex
```

2. Open in your browser:
```bash
# Simply open index.html in your preferred browser
# Or use a local server for testing
python -m http.server 8000
# Then visit http://localhost:8000
```

## 🌐 Deployment

### GitHub Pages
This project is ready for GitHub Pages deployment:
1. Go to repository Settings → Pages
2. Select "Deploy from a branch"
3. Choose the `main` branch
4. Your site will be live at `https://Richardbekhazi.github.io/winnclex/`

### Other Platforms
- Netlify (drag & drop deployment)
- Vercel
- Any static hosting service

## 📝 Contact Form Integration

The contact form uses **Formspree** for email delivery. To update the form endpoint:

1. Visit [formspree.io](https://formspree.io)
2. Create a new form
3. Update the `action` attribute in the form:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

## 🎨 Customization

### Color Scheme
Edit the CSS variables in `style.css`:
```css
:root {
    --primary-color: #0a4d90;      /* Navy blue */
    --secondary-color: #007bff;    /* Bright blue */
    --background-color: #f4f7fc;   /* Light blue background */
    --text-color: #333;            /* Dark text */
    --error-color: #dc3545;        /* Red for errors */
}
```

### Content Updates
- Edit testimonials in the testimonials section
- Update topic cards with new course content
- Modify hero section messaging
- Update footer information

## 📊 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔄 Version History

**v1.0.0** (February 2026)
- Initial launch
- 6 comprehensive topic categories
- 6 multilingual testimonials
- Full form validation and error handling
- Accessibility compliance
- Responsive mobile design

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💼 Author

**Global NCLEX Prep**
- GitHub: [@Richardbekhazi](https://github.com/Richardbekhazi)
- Website: [winnclex.com](https://Richardbekhazi.github.io/winnclex/)

## 🤝 Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📮 Support

For questions or support, please use the contact form on the website or open an issue on GitHub.

## ⚖️ Disclaimer

This is an independent educational coaching service and is not affiliated with the NCSBN® or NCLEX®. Our goal is to provide supplementary strategic coaching to help nursing students prepare for the NCLEX examination.

---

**Pass the NCLEX with Confidence! 🎓**
