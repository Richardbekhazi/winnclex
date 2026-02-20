// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
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
                        top: targetElement.offsetTop - 80, // Offset for fixed header
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
        // Fallback for browsers without IntersectionObserver support
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
                    // Form will be submitted to Formspree automatically
                    this.submit();
                }
            } catch (error) {
                console.error('Form submission error:', error);
                showFormError('An error occurred. Please try again.');
            }
        });

        // Real-time validation
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
            this.textContent = 'Sending...';
            setTimeout(() => {
                this.disabled = false;
                this.textContent = 'Send Message';
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

        // Clear previous error
        clearFieldError(field);

        if (field.id === 'name') {
            if (value.length < 2) {
                showFieldError(field, 'Name must be at least 2 characters');
                isValid = false;
            }
        } else if (field.id === 'email') {
            if (!isValidEmail(value)) {
                showFieldError(field, 'Please enter a valid email address');
                isValid = false;
            }
        } else if (field.id === 'message') {
            if (value.length < 10) {
                showFieldError(field, 'Message must be at least 10 characters');
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
