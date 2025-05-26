// Initialize AOS
AOS.init({ duration: 1000, once: true });

// Mouse movement tracking
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let targetX = 0;
let targetY = 0;
let isMouseMoving = false;

// Track mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseMoving = true;
    
    // Parallax effect for moon
    const moonContainer = document.querySelector('.moon-container');
    const xAxis = (window.innerWidth / 2 - mouseX) / 25;
    const yAxis = (window.innerHeight / 2 - mouseY) / 25;
    moonContainer.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

// Animate stars container based on mouse position
function updateStarsPosition() {
    if (!isMouseMoving) return;
    
    const starsContainer = document.getElementById('stars-container');
    
    // Calculate target position (inverted movement for parallax effect)
    targetX = (window.innerWidth / 2 - mouseX) * 0.05;
    targetY = (window.innerHeight / 2 - mouseY) * 0.05;
    
    // Apply smooth movement while keeping container centered
    starsContainer.style.transform = `translate(-50%, -50%) translate(${targetX}px, ${targetY}px)`;
    
    requestAnimationFrame(updateStarsPosition);
}

// Start animation loop
updateStarsPosition();

// Enhanced Galaxy star animation
function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Random star color
    const colors = [
        getComputedStyle(document.documentElement).getPropertyValue('--star-color-1'),
        getComputedStyle(document.documentElement).getPropertyValue('--star-color-2'),
        getComputedStyle(document.documentElement).getPropertyValue('--star-color-3')
    ];
    const starColor = colors[Math.floor(Math.random() * colors.length)];
    star.style.setProperty('--star-color', starColor);
    
    // Enhanced size variation (1-5 pixels)
    const size = Math.random() * 4 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // Wider orbit radius (200-800 pixels)
    const orbitRadius = 200 + (Math.random() * 600);
    star.style.setProperty('--orbit-radius', `${orbitRadius}px`);
    
    // Variable duration based on orbit radius
    const duration = 20 + (orbitRadius / 15);
    star.style.setProperty('--duration', `${duration}s`);
    
    // Random starting rotation to prevent clustering
    const startRotation = Math.random() * 360;
    star.style.setProperty('--start-rotation', `${startRotation}deg`);
    
    // Random tilt with more variation
    const tilt = Math.random() * 360;
    star.style.setProperty('--tilt', `${tilt}deg`);
    
    // Dynamic opacity based on size
    const opacity = 0.6 + (size / 5) * 0.4;
    star.style.setProperty('--star-opacity', opacity);
    
    // Enhanced glow effect
    const glowSize = size * (2 + Math.random() * 3);
    star.style.setProperty('--glow-size', `${glowSize}px`);
    
    // Twinkle animation
    const twinkleDuration = 1 + Math.random() * 2;
    star.style.setProperty('--twinkle-duration', `${twinkleDuration}s`);
    
    // Scale variation for depth effect
    const scale = 0.8 + Math.random() * 0.4;
    star.style.setProperty('--scale', scale);
    
    document.getElementById('stars-container').appendChild(star);
    
    // Remove star after animation
    setTimeout(() => {
        star.remove();
    }, duration * 1000);
}

// Create initial stars gradually
let starsCreated = 0;
const totalInitialStars = 150;

function createInitialStars() {
    if (starsCreated < totalInitialStars) {
        createStar();
        starsCreated++;
        setTimeout(createInitialStars, 30);
    }
}

// Start creating initial stars
createInitialStars();

// Continue creating stars
setInterval(createStar, 200);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
}); 