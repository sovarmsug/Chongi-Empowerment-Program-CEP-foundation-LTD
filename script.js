// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Initialize all components
    initNewHeader();
    initSidebar();
    initSmoothScrolling();
    initCounters();
    initContactForm();
    initScrollToTop();
    initAnimations();
});

// New Header functionality with dynamic animations
function initNewHeader() {
    const header = document.querySelector('.main-header');
    const headerTop = document.querySelector('.header-top');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-list .nav-link');
    const headerLogo = document.querySelector('.header-logo');
    const headerSearch = document.querySelector('.header-search');
    const headerActions = document.querySelector('.header-actions');
    
    let scrollTimer = null;
    let lastScrollY = window.scrollY;
    let isScrollingUp = false;

    // Handle header scroll effect with animations
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        isScrollingUp = currentScrollY < lastScrollY;
        lastScrollY = currentScrollY;

        // Clear existing timer
        clearTimeout(scrollTimer);
        
        // Add scrolled class to make upper header the main header and hide navigation
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
            
            // Upper header becomes fixed main header with gradient background
            
            // Navigation bar is hidden via CSS
            
            // Add subtle animations to upper header when scrolled
            if (isScrollingUp) {
                headerTop.style.transform = 'translateY(0) scale(1)';
                headerTop.style.opacity = '1';
            } else {
                headerTop.style.transform = 'translateY(-5px) scale(0.95)';
                headerTop.style.opacity = '0.9';
            }
            
            // Animate elements in upper header
            if (currentScrollY > 150) {
                headerLogo.style.transform = 'scale(0.9)';
                headerLogo.style.opacity = '1';
                headerSearch.style.transform = 'scale(0.95)';
                headerSearch.style.opacity = '1';
            } else {
                headerLogo.style.transform = 'scale(1)';
                headerLogo.style.opacity = '1';
                headerSearch.style.transform = 'scale(1)';
                headerSearch.style.opacity = '1';
            }
        } else {
            header.classList.remove('scrolled');
            
            // Reset all positions when scrolled back to top
            headerTop.style.transform = 'translateY(0)';
            headerTop.style.opacity = '1';
            mainNav.style.transform = 'translateY(0)';
            mainNav.style.opacity = '1';
            headerLogo.style.transform = 'scale(1) rotateY(0deg)';
            headerLogo.style.opacity = '1';
            headerSearch.style.transform = 'scale(1)';
            headerSearch.style.opacity = '1';
        }

        // Set timer to reset animations when scrolling stops
        scrollTimer = setTimeout(function() {
            if (currentScrollY > 50) {
                headerTop.style.transform = 'translateY(0) scale(0.95)';
                headerTop.style.opacity = '0.9';
            }
        }, 150);
    });

    // Handle active nav link
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Handle nav link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Upper header is always the main header now
                const headerHeight = 140; // Upper header height
                const offsetTop = targetSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Sidebar functionality
function initSidebar() {
    const menuToggle = document.getElementById('menuToggle');
    const floatingMenuBtn = document.getElementById('floatingMenuBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebarLinks = document.querySelectorAll('.sidebar-nav-link');

    // Open sidebar from main menu toggle
    menuToggle.addEventListener('click', function() {
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Open sidebar from floating menu button
    if (floatingMenuBtn) {
        floatingMenuBtn.addEventListener('click', function() {
            sidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close sidebar
    function closeSidebar() {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close sidebar when clicking overlay
    sidebarOverlay.addEventListener('click', closeSidebar);

    // Close sidebar when clicking close button
    sidebarClose.addEventListener('click', closeSidebar);

    // Close sidebar when clicking nav links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Upper header is always the main header now
                const headerHeight = 140; // Upper header height
                const offsetTop = targetSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            closeSidebar();
        });
    });

    // Close sidebar on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
}

// Smooth scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Counter animation
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const count = parseInt(counter.innerText);
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    };

    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const impactSection = document.getElementById('impact');
    if (impactSection) {
        counterObserver.observe(impactSection);
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<span class="loading"></span> Sending...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Show success message
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

// Scroll to top button
function initScrollToTop() {
    // Create scroll to top button
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-to-top';
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollButton);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });

    // Scroll to top when clicked
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Enhanced Animations
function initAnimations() {
    // Add entrance animations to elements
    const animatedElements = document.querySelectorAll('.service-card, .event-card, .blog-card, .about-card, .impact-stat');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation for multiple elements
                if (entry.target.classList.contains('service-card')) {
                    const delay = Array.from(animatedElements).indexOf(entry.target) * 0.1;
                    entry.target.style.transition = `all 0.6s ease ${delay}s`;
                }
            }
        });
    }, observerOptions);
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Add floating animation to hero elements
    const heroElements = document.querySelectorAll('.hero-title, .hero-description');
    heroElements.forEach((el, index) => {
        el.style.animation = `floatUp 1s ease ${index * 0.2}s forwards`;
        el.style.opacity = '0';
    });

    // Add pulse animation to CTA buttons
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-danger');
    ctaButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.5s ease';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Add floating animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(style);

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)} me-2"></i>
            <span>${message}</span>
            <button class="notification-close" aria-label="Close notification">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;

    // Add to DOM
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);

    // Add close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        removeNotification(notification);
    });
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    return colors[type] || '#17a2b8';
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimizations
const optimizedScrollHandler = throttle(() => {
    // Handle scroll-related updates here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if there are lazy images
if (document.querySelectorAll('img[data-src]').length > 0) {
    initLazyLoading();
}

// Handle phone number formatting
function formatPhoneNumber(phoneNumber) {
    // Format the phone number for display
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{4})(\d{3})(\d{4})$/);
    if (match) {
        return `${match[1]} ${match[2]} ${match[3]}`;
    }
    return phoneNumber;
}

// Format all phone numbers on the page
document.addEventListener('DOMContentLoaded', function() {
    const phoneElements = document.querySelectorAll('[href^="tel:"]');
    phoneElements.forEach(element => {
        const phoneNumber = element.getAttribute('href').replace('tel:', '');
        if (element.textContent === phoneNumber) {
            element.textContent = formatPhoneNumber(phoneNumber);
        }
    });
});

// Add loading states to external links
document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add loading indicator for external links
            const originalText = this.innerHTML;
            this.innerHTML = '<span class="loading"></span> Opening...';
            
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        });
    });
});

// Enhanced form validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateInput(this);
            });
            
            input.addEventListener('input', function() {
                clearError(this);
            });
        });
    });
}

function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing error
    clearError(input);

    // Required field validation
    if (input.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }

    // Email validation
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }

    // Phone validation
    if (input.type === 'tel' && value) {
        const phoneRegex = /^\d{10}$/;
        const cleanedPhone = value.replace(/\D/g, '');
        if (!phoneRegex.test(cleanedPhone)) {
            isValid = false;
            errorMessage = 'Please enter a valid 10-digit phone number';
        }
    }

    if (!isValid) {
        showInputError(input, errorMessage);
    }

    return isValid;
}

function showInputError(input, message) {
    input.classList.add('is-invalid');
    
    let errorElement = input.parentNode.querySelector('.invalid-feedback');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'invalid-feedback';
        input.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearError(input) {
    input.classList.remove('is-invalid');
    const errorElement = input.parentNode.querySelector('.invalid-feedback');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

// Initialize form validation
initFormValidation();

// Add CSS for form validation
const validationStyles = document.createElement('style');
validationStyles.textContent = `
    .is-invalid {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
    }
    
    .invalid-feedback {
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 5px;
        display: none;
    }
`;
document.head.appendChild(validationStyles);