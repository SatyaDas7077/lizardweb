document.addEventListener('DOMContentLoaded', () => {
    // Particle animation
    const particleContainer = document.getElementById('particle-container');
    for (let i = 0; i < 50; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.transform = `scale(${Math.random()})`;
        particle.style.opacity = Math.random();
        particleContainer.appendChild(particle);

        animateParticle(particle);
    }

    function animateParticle(particle) {
        const animation = particle.animate(
            [
                { transform: 'translate(0, 0)' },
                { transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)` }
            ],
            {
                duration: Math.random() * 3000 + 2000,
                direction: 'alternate',
                iterations: Infinity
            }
        );
    }

    // Custom scroll animation
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in-element');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);
            
            if (isVisible) {
                element.classList.add('visible');
            }
        });
    };

    // Initial check for elements in view
    animateOnScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', () => {
        animateOnScroll();
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Animated counter for plan prices
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    const priceElements = document.querySelectorAll('.plan-price .amount');
    priceElements.forEach(el => {
        const finalPrice = parseInt(el.innerText);
        el.innerText = '0';
        animateValue(el, 0, finalPrice, 1500);
    });

    // Hover effect for plan cards
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('featured')) {
                card.style.transform = 'translateY(-10px) scale(1.05)';
            }
            card.style.boxShadow = '0 10px 20px rgba(158, 80, 187, 0.3)';
        });
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('featured')) {
                card.style.transform = 'translateY(0) scale(1)';
            }
            card.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.37)';
        });
    });

    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        // Toggle navigation
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Animate links
        navLinksItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Close mobile menu when clicking a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            
            navLinksItems.forEach(link => {
                link.style.animation = '';
            });
        });
    });
});