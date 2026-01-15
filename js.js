// ============================================
// VORTEX GROUP WEBSITE - MAIN JAVASCRIPT FILE
// ============================================

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Vortex Group Website Initializing...');
    
    // ========== THEME TOGGLE ==========
    const themeToggle = document.getElementById('themeToggle');
    let currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeButton();
    
    // Theme toggle function
    function toggleTheme() {
        console.log('Theme toggle clicked!');
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
        updateThemeButton();
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
    
    // Initialize language
    updateLanguage();
    
    // Language toggle function
    function toggleLanguage() {
        console.log('Language toggle clicked!');
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        localStorage.setItem('lang', currentLang);
        updateLanguage();
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
        console.log('Menu toggled');
    }
    
    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // ========== PORTFOLIO SLIDER ==========
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    function initSlider() {
        if (!sliderTrack || slides.length === 0) return;
        
        updateSlider();
        
        // Auto slide every 5 seconds
        setInterval(nextSlide, 5000);
    }
    
    function updateSlider() {
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
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }
    
    // ========== CONTACT FORM ==========
    const form = document.getElementById('projectForm');
    
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const projectName = document.getElementById('projectName').value;
        const message = document.getElementById('message').value;
        
        // Format message for WhatsApp
        const formattedMessage = `*New Project Inquiry from Vortex Group Website*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Project Name/Idea:* ${projectName}%0A*Project Details:* ${message}`;
        
        // WhatsApp URL - CHANGE THIS TO YOUR ACTUAL NUMBER
        const whatsappUrl = `https://wa.me/1234567890?text=${formattedMessage}`;
        
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
        // 3D Cube floating animation
        const cubeContainer = document.querySelector('.cube-container');
        if (cubeContainer) {
            let floatValue = 0;
            let direction = 1;
            
            function floatCube() {
                floatValue += 0.005 * direction;
                if (floatValue > 0.5 || floatValue < -0.5) {
                    direction *= -1;
                }
                cubeContainer.style.transform = `translateY(${floatValue}rem)`;
                requestAnimationFrame(floatCube);
            }
            floatCube();
        }
        
        // Add hover effects to interactive elements
        const interactiveElements = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-link, .social-link, .floating-btn, .slider-btn');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.style.boxShadow = '0 0 15px rgba(138, 43, 226, 0.7), 0 0 25px rgba(138, 43, 226, 0.5)';
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.boxShadow = '';
            });
        });
        
        // 3D tilt effect for cards
        const cards = document.querySelectorAll('.service-card, .team-card, .slide');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateY = (x - centerX) / 25;
                const rotateX = (centerY - y) / 25;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
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
    
    // ========== INITIALIZE EVERYTHING ==========
    console.log('Initializing components...');
    
    // Initialize all components
    initSlider();
    initSmoothScroll();
    initScrollSpy();
    initAnimations();
    
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
    
    console.log('✅ Vortex Group Website Initialized Successfully!');
    
    // ========== DEBUG HELPERS ==========
    // Add this to test buttons manually in console
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
