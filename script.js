// Language Configuration
const languages = {
    en: { name: 'English', dir: 'ltr' },
    fr: { name: 'Français', dir: 'ltr' },
    ar: { name: 'العربية', dir: 'rtl' }
};

let currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

// Initialize Language on Page Load
document.addEventListener('DOMContentLoaded', function() {
    // Set initial language
    setLanguage(currentLanguage);

    // Language Switcher Buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    // Sticky Header
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            try {
                if (window.scrollY > 50) {
                    header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                    header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                } else {
                    header.style.backgroundColor = 'var(--white-color)';
                    header.style.boxShadow = '0 2px 10px var(--shadow-color)';
                }
            } catch (error) {
                console.error('Error in scroll handler:', error);
            }
        });
    }

    // Smooth scrolling for nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            try {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                } else {
                    console.warn('Target element not found:', targetId);
                }
            } catch (error) {
                console.error('Error in smooth scroll:', error);
            }
        });
    });

    // Scroll Animations with Intersection Observer
    const fadeElements = document.querySelectorAll('.fade-in');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                try {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                } catch (error) {
                    console.error('Error in intersection observer:', error);
                }
            });
        }, {
            threshold: 0.1
        });

        fadeElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        fadeElements.forEach(el => {
            el.classList.add('visible');
        });
    }

    // Form Validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            try {
                if (validateForm()) {
                    this.submit();
                }
            } catch (error) {
                console.error('Form submission error:', error);
                showFormError('An error occurred. Please try again.');
            }
        });

        const inputs = contactForm.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }

    // Prevent form double submission
    const submitButton = document.querySelector('.btn-submit');
    if (submitButton) {
        submitButton.addEventListener('click', function() {
            this.disabled = true;
            const originalText = this.textContent;
            this.textContent = currentLanguage === 'ar' ? 'جاري الإرسال...' : 
                               currentLanguage === 'fr' ? 'Envoi en cours...' : 'Sending...';
            setTimeout(() => {
                this.disabled = false;
                this.textContent = originalText;
            }, 3000);
        });
    }

    // Utility Functions
    function validateForm() {
        const nameInput = document.querySelector('#name');
        const emailInput = document.querySelector('#email');
        const messageInput = document.querySelector('#message');

        let isValid = true;

        if (!validateField(nameInput)) isValid = false;
        if (!validateField(emailInput)) isValid = false;
        if (!validateField(messageInput)) isValid = false;

        return isValid;
    }

    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;

        clearFieldError(field);

        if (field.id === 'name') {
            if (value.length < 2) {
                const errorMsg = currentLanguage === 'ar' ? 'يجب أن يكون الاسم 2 أحرف على الأقل' :
                                 currentLanguage === 'fr' ? 'Le nom doit contenir au moins 2 caractères' :
                                 'Name must be at least 2 characters';
                showFieldError(field, errorMsg);
                isValid = false;
            }
        } else if (field.id === 'email') {
            if (!isValidEmail(value)) {
                const errorMsg = currentLanguage === 'ar' ? 'يرجى إدخال عنوان بريد إلكتروني صحيح' :
                                 currentLanguage === 'fr' ? 'Veuillez entrer une adresse e-mail valide' :
                                 'Please enter a valid email address';
                showFieldError(field, errorMsg);
                isValid = false;
            }
        } else if (field.id === 'message') {
            if (value.length < 10) {
                const errorMsg = currentLanguage === 'ar' ? 'يجب أن تكون الرسالة 10 أحرف على الأقل' :
                                 currentLanguage === 'fr' ? 'Le message doit contenir au moins 10 caractères' :
                                 'Message must be at least 10 characters';
                showFieldError(field, errorMsg);
                isValid = false;
            }
        }

        return isValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showFieldError(field, message) {
        const errorElement = document.querySelector(`#${field.id}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            field.classList.add('form-error');
        }
    }

    function clearFieldError(field) {
        const errorElement = document.querySelector(`#${field.id}-error`);
        if (errorElement) {
            errorElement.textContent = '';
            field.classList.remove('form-error');
        }
    }

    function showFormError(message) {
        const statusElement = document.querySelector('#form-status');
        if (statusElement) {
            statusElement.textContent = message;
            statusElement.classList.add('form-error-message');
        }
    }
});

// Language Switching Function
function setLanguage(lang) {
    if (!languages[lang]) lang = 'en';
    
    currentLanguage = lang;
    localStorage.setItem('selectedLanguage', lang);

    // Update HTML lang attribute and direction
    document.documentElement.lang = lang;
    document.documentElement.dir = languages[lang].dir;

    // Update page title
    const titleElement = document.querySelector('title');
    if (titleElement && titleElement.dataset[lang]) {
        document.title = titleElement.dataset[lang];
    }

    // Update all elements with data-lang attributes
    updateElementContent();

    // Update form placeholders
    updateFormPlaceholders(lang);

    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}

function updateElementContent() {
    const elements = document.querySelectorAll('[data-en][data-fr][data-ar]');
    
    elements.forEach(element => {
        const content = element.dataset[currentLanguage];
        if (content) {
            // For elements that can have innerHTML (divs, spans, etc.)
            if (element.tagName === 'DIV' || element.tagName === 'SPAN' || 
                element.tagName === 'P' || element.tagName === 'H1' || 
                element.tagName === 'H2' || element.tagName === 'H3' || 
                element.tagName === 'H4' || element.tagName === 'LI' ||
                element.tagName === 'BUTTON' || element.tagName === 'A' ||
                element.tagName === 'LABEL' || element.tagName === 'TITLE' ||
                element.tagName === 'STRONG') {
                element.textContent = content;
            }
        }
    });
}

function updateFormPlaceholders(lang) {
    const placeholderMap = {
        name: {
            en: 'Your Name',
            fr: 'Votre Nom',
            ar: 'اسمك'
        },
        email: {
            en: 'Your Email',
            fr: 'Votre Email',
            ar: 'بريدك الإلكتروني'
        },
        message: {
            en: 'Your Message',
            fr: 'Votre Message',
            ar: 'رسالتك'
        }
    };

    Object.keys(placeholderMap).forEach(id => {
        const element = document.querySelector(`#${id}`);
        if (element && placeholderMap[id][lang]) {
            element.placeholder = placeholderMap[id][lang];
        }
    });
}

