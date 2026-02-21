// Language Configuration
const languages = {
    en: { name: 'English', dir: 'ltr' },
    fr: { name: 'Français', dir: 'ltr' },
    ar: { name: 'العربية', dir: 'rtl' }
};

let currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', function() {
    setLanguage(currentLanguage);

    // Language Selector
    const languageToggle = document.querySelector('.language-toggle');
    const languageMenu = document.querySelector('.language-menu');

    if (languageToggle && languageMenu) {
        languageToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            languageToggle.classList.toggle('active');
            languageMenu.classList.toggle('show');
        });

        document.querySelectorAll('.language-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const lang = option.getAttribute('data-lang');
                setLanguage(lang);
                document.querySelectorAll('.language-option').forEach(o => o.classList.remove('active'));
                option.classList.add('active');
                setTimeout(() => {
                    languageToggle.classList.remove('active');
                    languageMenu.classList.remove('show');
                }, 200);
            });
        });

        document.addEventListener('click', (e) => {
            if (!languageToggle.contains(e.target) && !languageMenu.contains(e.target)) {
                languageToggle.classList.remove('active');
                languageMenu.classList.remove('show');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                languageToggle.classList.remove('active');
                languageMenu.classList.remove('show');
            }
        });
    }

    // Sticky Header
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 12px 48px rgba(0, 0, 0, 0.12)';
            } else {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
            }
        });
    }

    // Smooth Scroll Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const languageToggle = document.querySelector('.language-toggle');
                const languageMenu = document.querySelector('.language-menu');
                if (languageToggle && languageMenu) {
                    languageToggle.classList.remove('active');
                    languageMenu.classList.remove('show');
                }
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // Fade-in Animations
    const fadeElements = document.querySelectorAll('.fade-in');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        fadeElements.forEach(el => observer.observe(el));
    } else {
        fadeElements.forEach(el => el.classList.add('visible'));
    }

    // Form Validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateForm()) {
                contactForm.submit();
            }
        });

        contactForm.querySelectorAll('.form-control').forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
    }

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

    // Validation Utilities
    function validateForm() {
        const nameInput = document.querySelector('#name');
        const emailInput = document.querySelector('#email');
        const messageInput = document.querySelector('#message');
        return validateField(nameInput) && validateField(emailInput) && validateField(messageInput);
    }

    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        clearFieldError(field);

        if (field.id === 'name' && value.length < 2) {
            showFieldError(field, currentLanguage === 'ar' ? 'يجب أن يكون الاسم 2 أحرف على الأقل' :
                                  currentLanguage === 'fr' ? 'Le nom doit contenir au moins 2 caractères' :
                                  'Name must be at least 2 characters');
            isValid = false;
        } else if (field.id === 'email' && !isValidEmail(value)) {
            showFieldError(field, currentLanguage === 'ar' ? 'يرجى إدخال عنوان بريد إلكتروني صحيح' :
                                  currentLanguage === 'fr' ? 'Veuillez entrer une adresse e-mail valide' :
                                  'Please enter a valid email address');
            isValid = false;
        } else if (field.id === 'message' && value.length < 10) {
            showFieldError(field, currentLanguage === 'ar' ? 'يجب أن تكون الرسالة 10 أحرف على الأقل' :
                                  currentLanguage === 'fr' ? 'Le message doit contenir au moins 10 caractères' :
                                  'Message must be at least 10 characters');
            isValid = false;
        }
        return isValid;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
});

// Language Switching Functions
function setLanguage(lang) {
    if (!languages[lang]) lang = 'en';
    currentLanguage = lang;
    localStorage.setItem('selectedLanguage', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = languages[lang].dir;

    const titleElement = document.querySelector('title');
    if (titleElement && titleElement.dataset[lang]) {
        document.title = titleElement.dataset[lang];
    }

    updateElementContent();
    updateFormPlaceholders(lang);
    updateLanguageLabel(lang);
}

function updateElementContent() {
    document.querySelectorAll('[data-en][data-fr][data-ar]').forEach(element => {
        const content = element.dataset[currentLanguage];
        if (content && ['DIV', 'SPAN', 'P', 'H1', 'H2', 'H3', 'H4', 'LI', 'BUTTON', 'A', 'LABEL', 'TITLE', 'STRONG'].includes(element.tagName)) {
            element.textContent = content;
        }
    });
}

function updateFormPlaceholders(lang) {
    const placeholderMap = {
        name: { en: 'Your Name', fr: 'Votre Nom', ar: 'اسمك' },
        email: { en: 'Your Email', fr: 'Votre Email', ar: 'بريدك الإلكتروني' },
        message: { en: 'Your Message', fr: 'Votre Message', ar: 'رسالتك' }
    };

    Object.entries(placeholderMap).forEach(([id, translations]) => {
        const element = document.querySelector(`#${id}`);
        if (element && translations[lang]) {
            element.placeholder = translations[lang];
        }
    });
}

function updateLanguageLabel(lang) {
    const langLabel = document.querySelector('.lang-label');
    if (langLabel) {
        langLabel.textContent = languages[lang].name;
    }
}
