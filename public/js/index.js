// Enhanced Portfolio JavaScript

// Toggle mobile menu
function toggleMenu() {
    const mobileNav = document.querySelector('.mobile-nav');
    mobileNav.classList.toggle('hidden');
}

// Theme toggle functionality
function toggleTheme() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    const themeIcon = document.querySelector('.theme-icon i');
    themeIcon.className = isDarkMode ? 'fas fa-moon' : 'fas fa-sun';
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
}

// Download CV functionality
function downloadCV() {
    const link = document.createElement('a');
    link.href = './files/Adhiambo_IvyNovareen_CV.pdf';
    link.download = 'Adhiambo_IvyNovareen_CV.pdf';
    link.target = '_blank';
    link.click();
}

// Smooth scrolling to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Back to top functionality
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize back to top button
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.card, .project, .service, .experience-item');
    
    sections.forEach(section => observer.observe(section));
    cards.forEach(card => observer.observe(card));
}

// Active navigation highlighting
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}` || 
                (current === '' && link.getAttribute('href') === '#')) {
                link.classList.add('active');
            }
        });
    });
}

// Form handling
function initFormHandling() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.firstname || !data.lastname || !data.email || !data.subject || !data.message) {
        showAlert('Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showAlert('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    showAlert('Sending message...', 'info');
    
    setTimeout(() => {
        showAlert('Message sent successfully! I\'ll get back to you soon.', 'success');
        e.target.reset();
    }, 2000);
}

// Load saved theme
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const themeIcon = document.querySelector('.theme-icon i');
        if (themeIcon) {
            themeIcon.className = 'fas fa-moon';
        }
    }
}

// Alert system
function showAlert(message, type = "info") {
    const alertBox = document.getElementById("alert-box");
    const alertMessage = document.getElementById("alert-message");
    const alertIcon = document.getElementById("alert-icon");

    alertBox.classList.remove("success", "error", "info");
    alertIcon.className = "alert-icon";

    switch (type) {
        case "success":
            alertBox.classList.add("success");
            alertIcon.classList.add("fa-solid", "fa-circle-check");
            break;
        case "error":
            alertBox.classList.add("error");
            alertIcon.classList.add("fa-solid", "fa-circle-xmark");
            break;
        case "info":
        default:
            alertBox.classList.add("info");
            alertIcon.classList.add("fa-solid", "fa-circle-info");
            break;
    }

    alertMessage.textContent = message;
    document.getElementById("custom-alert").style.display = "flex";
}

function closeAlert() {
    document.getElementById("custom-alert").style.display = "none";
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    const themeIcon = document.querySelector('.theme-icon i');
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeIcon.className = isDarkMode ? 'fas fa-moon' : 'fas fa-sun';
    
    initBackToTop();
    initScrollAnimations();
    initActiveNavigation();
    initFormHandling();
    loadSavedTheme();
});
