// Initialize everything
document.addEventListener('DOMContentLoaded', function () {
    initializeAnimations();
    setupScrollAnimations();
    startFireworks();
});

/* ================= FIREWORKS ================= */
function createFirework() {
    const container = document.getElementById("fireworks");
    if (!container) return;

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * (window.innerHeight / 2);

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement("div");
        particle.classList.add("firework");

        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 120;

        particle.style.left = x + "px";
        particle.style.top = y + "px";

        particle.style.setProperty("--x", Math.cos(angle) * distance + "px");
        particle.style.setProperty("--y", Math.sin(angle) * distance + "px");

        particle.style.background = `hsl(${Math.random() * 360}, 100%, 60%)`;

        container.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1500);
    }
}

// Launch fireworks continuously
function startFireworks() {
    setInterval(createFirework, 1200);
}

/* ================= ANIMATIONS ================= */
function initializeAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
        element.style.animationDelay = (index * 0.2) + 's';
    });
}

/* ================= SCROLL ANIMATIONS ================= */
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');

                if (entry.target.classList.contains('message-card')) {
                    animateMessageText();
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const elements = document.querySelectorAll('.section-title, .message-card, .photo-card');
    elements.forEach(el => observer.observe(el));
}

/* ================= MESSAGE TEXT ANIMATION ================= */
function animateMessageText() {
    const texts = document.querySelectorAll('.message-text');
    texts.forEach((text, index) => {
        setTimeout(() => {
            text.classList.add('fade-in-animate');
        }, index * 400);
    });
}

/* ================= SMOOTH SCROLL ================= */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/* ================= LIKE BUTTON ================= */
function toggleLike(button) {
    const heartIcon = button.querySelector('.heart-icon');
    button.classList.toggle('liked');

    if (button.classList.contains('liked')) {
        heartIcon.textContent = '❤️';
        createFloatingHeart(button);
    } else {
        heartIcon.textContent = '🤍';
    }
}

function createFloatingHeart(button) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'absolute';
    heart.style.fontSize = '1.5rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';

    const rect = button.getBoundingClientRect();
    heart.style.left = rect.left + 'px';
    heart.style.top = rect.top + 'px';

    document.body.appendChild(heart);

    heart.animate([
        { transform: 'translateY(0px)', opacity: 1 },
        { transform: 'translateY(-60px)', opacity: 0 }
    ], {
        duration: 1200,
        easing: 'ease-out'
    }).onfinish = () => heart.remove();
}

/* ================= PARALLAX ================= */
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');

    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

/* ================= BUTTON RIPPLE ================= */
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);

        ripple.style.cssText = `
            position:absolute;
            width:${size}px;
            height:${size}px;
            left:${e.clientX - rect.left - size / 2}px;
            top:${e.clientY - rect.top - size / 2}px;
            background:rgba(255,255,255,0.4);
            border-radius:50%;
            transform:scale(0);
            animation:ripple 0.6s ease-out;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

/* Ripple animation */
const style = document.createElement('style');
style.textContent = `
@keyframes ripple {
    to {
        transform: scale(2);
        opacity: 0;
    }
}`;
document.head.appendChild(style);

/* ================= PHOTO ANIMATION ================= */
const photoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target.querySelector('img');
            if (img) {
                img.style.animation = 'photoEnter 0.8s ease-out forwards';
            }
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.photo-card').forEach(card => {
    photoObserver.observe(card);
});

const photoStyle = document.createElement('style');
photoStyle.textContent = `
@keyframes photoEnter {
    from {
        transform: scale(0.8);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}`;
document.head.appendChild(photoStyle);