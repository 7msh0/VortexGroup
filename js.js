// ============================================
// VORTEX GROUP WEBSITE - ENHANCED JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Vortex Group Website Initializing...');
    
    // ========== THEME TOGGLE ==========
    const themeToggle = document.getElementById('themeToggle');
    let currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeButton();
    
    function toggleTheme() {
        console.log('Theme toggle clicked!');
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
        updateThemeButton();
        
        // Add transition effect
        document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 500);
    }
    
    function updateThemeButton() {
        if (!themeToggle) return;
        
        const icon = themeToggle.querySelector('i');
        if (!icon) return;
        
        if (currentTheme === 'dark') {
            icon.className = 'fas fa-moon';
            themeToggle.title = 'Switch to Light Mode';
            console.log('Theme set to: Dark Mode');
        } else {
            icon.className = 'fas fa-sun';
            themeToggle.title = 'Switch to Dark Mode';
            console.log('Theme set to: Light Mode');
        }
    }
    
    // ========== LANGUAGE TOGGLE ==========
    const langToggle = document.getElementById('langToggle');
    let currentLang = localStorage.getItem('lang') || 'en';
    
    // FIX 1: Set the data-lang attribute on the HTML element IMMEDIATELY on page load
    document.documentElement.setAttribute('data-lang', currentLang); // ← NEW
    // Initialize language
    updateLanguage();
    
    function toggleLanguage() {
        console.log('Language toggle clicked!');
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        localStorage.setItem('lang', currentLang);
        
        // FIX 2: Update the data-lang attribute on the HTML element when toggling
        document.documentElement.setAttribute('data-lang', currentLang); // ← Ensure this is here
        
        updateLanguage();
        
        // DON'T change the direction - keep it LTR
        console.log('Language changed to:', currentLang, 'Direction remains LTR');
    }
    
    function updateLanguage() {
        // Update button text
        if (langToggle) {
            const langText = langToggle.querySelector('.lang-text');
            if (langText) {
                langText.textContent = currentLang === 'en' ? 'AR' : 'EN';
            }
            langToggle.title = currentLang === 'en' ? 'Switch to Arabic' : 'Switch to English';
        }
        
        // Update all translatable text on page
        document.querySelectorAll('[data-en], [data-ar]').forEach(element => {
            if (element.hasAttribute(`data-${currentLang}`)) {
                const text = element.getAttribute(`data-${currentLang}`);
                
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = text;
                } else {
                    element.textContent = text;
                }
            }
        });
        
        console.log('Language set to:', currentLang);
    }
    
    // ========== MOBILE MENU ==========
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        console.log('Menu toggled');
    }
    
    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // ========== PORTFOLIO SLIDER ==========
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;
    
    function initSlider() {
        if (!sliderTrack || slides.length === 0) return;
        
        updateSlider();
        
        // Auto slide every 5 seconds
        startAutoSlide();
    }
    
    function updateSlider() {
        if (!sliderTrack) return;
        
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Update slides
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
        resetAutoSlide();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
        resetAutoSlide();
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
        resetAutoSlide();
    }
    
    function startAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }
    
    // Pause auto-slide on hover
    if (sliderTrack) {
        sliderTrack.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        sliderTrack.addEventListener('mouseleave', startAutoSlide);
    }
    
    // ========== CONTACT FORM ==========
    const form = document.getElementById('projectForm');
    
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const projectName = document.getElementById('projectName').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (!name || !projectName || !message) {
            alert(currentLang === 'en' 
                ? 'Please fill in all required fields.' 
                : 'يرجى ملء جميع الحقول المطلوبة.');
            return;
        }
        
        // Format message for WhatsApp
        const formattedMessage = `*New Project Inquiry from Vortex Group Website*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Project Name/Idea:* ${projectName}%0A*Project Details:* ${message}`;
        
        // WhatsApp URL - CHANGE THIS TO YOUR ACTUAL NUMBER
        const whatsappUrl = `https://wa.me/+963945349776?text=${formattedMessage}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Reset form
        form.reset();
        
        // Show success message
        alert(currentLang === 'en' 
            ? 'Your message has been prepared for WhatsApp. Please send it to complete your inquiry.' 
            : 'تم إعداد رسالتك للواتساب. يرجى إرسالها لإكمال استفسارك.');
    }
    
    // ========== ANIMATIONS ==========
    function initAnimations() {
        // Add scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        document.querySelectorAll('.service-card, .team-card, .slide, .section-title').forEach(el => {
            observer.observe(el);
        });
        
        // Add CSS class for animation
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                animation: fadeInUp 0.6s ease forwards;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ========== SMOOTH SCROLLING ==========
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    closeMenu();
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ========== SCROLL SPY ==========
    function initScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }
    
    // ========== NAVBAR SCROLL EFFECT ==========
    function initNavbarScroll() {
        let lastScroll = 0;
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                navbar.classList.remove('scroll-up');
                return;
            }
            
            if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
                // Scroll Down
                navbar.classList.remove('scroll-up');
                navbar.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
                // Scroll Up
                navbar.classList.remove('scroll-down');
                navbar.classList.add('scroll-up');
            }
            
            lastScroll = currentScroll;
        });
    }
    
    // ========== INITIALIZE EVERYTHING ==========
    console.log('Initializing components...');
    
    // Initialize all components
    initSlider();
    initSmoothScroll();
    initScrollSpy();
    initAnimations();
    initNavbarScroll();
    
    // Add event listeners
    if (themeToggle) {
        console.log('✅ Theme toggle button found');
        themeToggle.addEventListener('click', toggleTheme);
    } else {
        console.error('❌ Theme toggle button NOT found! Check HTML ID');
    }
    
    if (langToggle) {
        console.log('✅ Language toggle button found');
        langToggle.addEventListener('click', toggleLanguage);
    } else {
        console.error('❌ Language toggle button NOT found! Check HTML ID');
    }
    
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active') && 
            !e.target.closest('.nav-menu') && 
            !e.target.closest('.hamburger')) {
            closeMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
    
    console.log('✅ Vortex Group Website Initialized Successfully!');
    
    // ========== DEBUG HELPERS ==========
    window.debugButtons = {
        toggleTheme: toggleTheme,
        toggleLanguage: toggleLanguage,
        currentTheme: () => currentTheme,
        currentLang: () => currentLang
    };
    
    console.log('💡 Type "debugButtons.toggleTheme()" or "debugButtons.toggleLanguage()" in console to test buttons');
});

// ========== KEYBOARD SHORTCUTS ==========
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + T for theme
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) themeToggle.click();
    }
    
    // Ctrl/Cmd + L for language
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        const langToggle = document.getElementById('langToggle');
        if (langToggle) langToggle.click();
    }
});

// ========== LOADING ANIMATION ==========
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('🌐 Website fully loaded!');
});