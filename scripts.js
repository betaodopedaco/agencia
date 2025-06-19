// Configuração do efeito de partículas
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#6e44ff" },
        shape: { 
            type: "circle",
            stroke: { width: 0, color: "#000000" },
            polygon: { nb_sides: 5 }
        },
        opacity: {
            value: 0.3,
            random: true,
            anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
        },
        size: {
            value: 3,
            random: true,
            anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#6e44ff",
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: true, rotateX: 600, rotateY: 1200 }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" },
            resize: true
        },
        modes: {
            grab: { distance: 140, line_linked: { opacity: 0.5 } },
            push: { particles_nb: 4 }
        }
    },
    retina_detect: true
});

// Menu Hamburguer
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.innerHTML = navMenu.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Fade-in on scroll
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

fadeElements.forEach(element => {
    observer.observe(element);
});

// Lightbox functionality
const portfolioItems = document.querySelectorAll('.portfolio-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 90,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// Portfolio filtering
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Filter functionality would go here in a real implementation
    });
});

// Efeito 3D avançado para portfolio
portfolioItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleY = (x - centerX) / 25;
        const angleX = (centerY - y) / 25;
        
        item.style.transform = `perspective(1000px) rotateY(${angleY}deg) rotateX(${angleX}deg) translateZ(50px)`;
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(20px)';
    });
});

// Efeito de parallax para elementos
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    document.querySelectorAll('.floating').forEach(el => {
        const speed = parseFloat(el.getAttribute('data-speed')) || 0.1;
        const offset = scrollY * speed;
        el.style.transform = `translateY(${offset}px) translateZ(${offset}px)`;
    });
});

// Carrossel functionality
const carouselInner = document.getElementById('carouselInner');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicators = document.querySelectorAll('.indicator');
let currentIndex = 0;

// Inicializar carrossel
updateCarousel();

// Event listeners
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + indicators.length) % indicators.length;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % indicators.length;
    updateCarousel();
});

// Indicadores clicáveis
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
    });
});

// Auto avançar carrossel
setInterval(() => {
    currentIndex = (currentIndex + 1) % indicators.length;
    updateCarousel();
}, 6000);

function updateCarousel() {
    // Atualizar posição
    carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Atualizar indicadores
    indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
              }
