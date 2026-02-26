/**
 * Desert Falcons Collective - Main JavaScript
 * Handles animations, navigation, and interactive elements
 */

(function() {
    'use strict';

    // ==================== DOM Elements ====================
    const cursor = document.getElementById('cursor');
    const loader = document.getElementById('loader');
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const hero = document.getElementById('hero');

    // ==================== Custom Cursor ====================

    const cursorLineTR = document.getElementById('cursorLineTR');
    const cursorLineBR = document.getElementById('cursorLineBR');
    const cursorLineBL = document.getElementById('cursorLineBL');
    const cursorLineTL = document.getElementById('cursorLineTL');
    const cursorLines = [cursorLineTR, cursorLineBR, cursorLineBL, cursorLineTL];

    if (cursor && window.innerWidth >= 1024) {
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        const speed = 0.15; // Smooth follow speed
        const armOffset = 17; // Gap + arm length (5 + 12)

        // Track mouse position
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Calculate distance to corner
        function getDistanceToCorner(x, y, cornerX, cornerY) {
            return Math.sqrt(Math.pow(cornerX - x, 2) + Math.pow(cornerY - y, 2));
        }

        // Smooth cursor animation
        function animateCursor() {
            // Lerp (linear interpolation) for smooth movement
            cursorX += (mouseX - cursorX) * speed;
            cursorY += (mouseY - cursorY) * speed;

            // Position the cross cursor
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            const screenW = window.innerWidth;
            const screenH = window.innerHeight;

            // Calculate offset position (where the arm ends)
            const offsetDiagonal = armOffset * 0.707; // cos(45deg)

            // Top-right line: from arm end to top-right area
            if (cursorLineTR) {
                const distTR = getDistanceToCorner(cursorX, cursorY, screenW, 0);
                cursorLineTR.style.left = (cursorX + offsetDiagonal) + 'px';
                cursorLineTR.style.top = (cursorY - offsetDiagonal) + 'px';
                cursorLineTR.style.height = distTR + 'px';
            }

            // Bottom-right line: from arm end to bottom-right area
            if (cursorLineBR) {
                const distBR = getDistanceToCorner(cursorX, cursorY, screenW, screenH);
                cursorLineBR.style.left = (cursorX + offsetDiagonal) + 'px';
                cursorLineBR.style.top = (cursorY + offsetDiagonal) + 'px';
                cursorLineBR.style.height = distBR + 'px';
            }

            // Bottom-left line: from arm end to bottom-left area
            if (cursorLineBL) {
                const distBL = getDistanceToCorner(cursorX, cursorY, 0, screenH);
                cursorLineBL.style.left = (cursorX - offsetDiagonal) + 'px';
                cursorLineBL.style.top = (cursorY + offsetDiagonal) + 'px';
                cursorLineBL.style.height = distBL + 'px';
            }

            // Top-left line: from arm end to top-left area
            if (cursorLineTL) {
                const distTL = getDistanceToCorner(cursorX, cursorY, 0, 0);
                cursorLineTL.style.left = (cursorX - offsetDiagonal) + 'px';
                cursorLineTL.style.top = (cursorY - offsetDiagonal) + 'px';
                cursorLineTL.style.height = distTL + 'px';
            }

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effect on interactive elements
        const hoverTargets = document.querySelectorAll('a, button, [role="button"], input, textarea, .btn, .nav-link, .pricing-card, .numbered-card, .type-card, .list-item');

        hoverTargets.forEach(function(target) {
            target.addEventListener('mouseenter', function() {
                cursor.classList.add('hover');
                cursorLines.forEach(function(line) {
                    if (line) line.style.background = 'rgba(184, 145, 90, 0.06)';
                });
            });
            target.addEventListener('mouseleave', function() {
                cursor.classList.remove('hover');
                cursorLines.forEach(function(line) {
                    if (line) line.style.background = 'rgba(255, 255, 255, 0.04)';
                });
            });
        });

        // Click effect
        document.addEventListener('mousedown', function() {
            cursor.classList.add('clicking');
        });
        document.addEventListener('mouseup', function() {
            cursor.classList.remove('clicking');
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', function() {
            cursor.classList.add('hidden');
            cursorLines.forEach(function(line) {
                if (line) line.style.opacity = '0';
            });
        });
        document.addEventListener('mouseenter', function() {
            cursor.classList.remove('hidden');
            cursorLines.forEach(function(line) {
                if (line) line.style.opacity = '1';
            });
        });
    }

    // ==================== Loading Screen ====================

    // Hide loader after 2.3 seconds (simple and reliable)
    if (loader) {
        setTimeout(function() {
            loader.classList.add('hidden');
            document.body.classList.remove('loading');
        }, 2300);
    }

    // ==================== Navigation ====================

    /**
     * Handle navbar scroll effect
     */
    function handleNavbarScroll() {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    /**
     * Toggle mobile navigation menu
     */
    function toggleMobileMenu() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    /**
     * Close mobile menu when a link is clicked
     */
    function closeMobileMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ==================== Scroll Animations ====================

    /**
     * Intersection Observer for scroll animations
     */
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Add stagger delay for elements with delay classes
                const element = entry.target;
                const delay = element.classList.contains('delay-1') ? 200 :
                              element.classList.contains('delay-2') ? 400 :
                              element.classList.contains('delay-3') ? 600 : 0;

                setTimeout(() => {
                    element.classList.add('visible');
                }, delay);

                // Unobserve after animation
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    /**
     * Initialize scroll animations
     */
    function initScrollAnimations() {
        animatedElements.forEach((element) => {
            observer.observe(element);
        });
    }

    // ==================== Parallax Effect ====================

    /**
     * Subtle parallax effect for hero background
     */
    function handleParallax() {
        if (!hero) return;

        const scrollY = window.scrollY;
        const heroHeight = hero.offsetHeight;

        // Only apply parallax when hero is in view
        if (scrollY < heroHeight) {
            const parallaxSpeed = 0.3;
            const yOffset = scrollY * parallaxSpeed;

            const heroBg = hero.querySelector('.hero-bg');
            if (heroBg) {
                heroBg.style.transform = `translateY(${yOffset}px)`;
            }
        }
    }

    // ==================== Smooth Scroll ====================

    /**
     * Smooth scroll to section when clicking nav links
     */
    function handleSmoothScroll(e) {
        const href = this.getAttribute('href');

        // Only handle anchor links
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                closeMobileMenu();
            }
        }
    }

    // ==================== Button Hover Effects ====================

    /**
     * Add glow effect on button hover
     */
    function initButtonEffects() {
        const buttons = document.querySelectorAll('.btn-primary');

        buttons.forEach((button) => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                button.style.setProperty('--mouse-x', `${x}px`);
                button.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }

    // ==================== Card Hover Effects ====================

    /**
     * Add lift effect on card hover
     */
    function initCardEffects() {
        const cards = document.querySelectorAll('.pillar-card, .role-card');

        cards.forEach((card) => {
            card.addEventListener('mouseenter', () => {
                // Add subtle scale effect
                card.style.transition = 'all 0.3s ease';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transition = 'all 0.3s ease';
            });
        });
    }

    // ==================== Letter Spacing Animation ====================

    /**
     * Animate letter spacing on headlines
     */
    function initHeadlineEffects() {
        const headlines = document.querySelectorAll('.hero-title, .section-title');

        headlines.forEach((headline) => {
            headline.addEventListener('mouseenter', () => {
                headline.style.transition = 'letter-spacing 0.3s ease';
                headline.style.letterSpacing = '0.03em';
            });

            headline.addEventListener('mouseleave', () => {
                headline.style.letterSpacing = '0.02em';
            });
        });
    }

    // ==================== Loading Animation ====================

    /**
     * Handle page load animations
     */
    function handlePageLoad() {
        document.body.classList.add('loaded');

        // Trigger hero animations
        const heroElements = document.querySelectorAll('.hero .animate-fade-up');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 200 + (index * 200));
        });
    }

    // ==================== Scroll Progress (Optional) ====================

    /**
     * Create scroll progress indicator
     */
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 2px;
            background: linear-gradient(90deg, var(--royal-green), var(--desert-gold));
            z-index: 9999;
            transition: width 0.1s linear;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = `${progress}%`;
        });
    }

    // ==================== Resize Handler ====================

    /**
     * Handle window resize events
     */
    function handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 968) {
            closeMobileMenu();
        }
    }

    // ==================== Event Listeners ====================

    function initEventListeners() {
        // Scroll events
        window.addEventListener('scroll', () => {
            handleNavbarScroll();
            handleParallax();
        }, { passive: true });

        // Mobile menu toggle
        if (navToggle) {
            navToggle.addEventListener('click', toggleMobileMenu);
        }

        // Nav link clicks
        navLinks.forEach((link) => {
            link.addEventListener('click', handleSmoothScroll);
        });

        // Window resize
        window.addEventListener('resize', handleResize);

        // Page load
        window.addEventListener('load', handlePageLoad);

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') &&
                !navMenu.contains(e.target) &&
                !navToggle.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Keyboard accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }

    // ==================== Initialize ====================

    function init() {
        initEventListeners();
        initScrollAnimations();
        initButtonEffects();
        initCardEffects();
        initHeadlineEffects();
        createScrollProgress();

        // Initial navbar check
        handleNavbarScroll();
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
