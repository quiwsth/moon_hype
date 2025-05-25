// Initialize AOS
AOS.init({ duration: 1000, once: true });

// Parallax effect
document.addEventListener('mousemove', (e) => {
    const moonContainer = document.querySelector('.moon-container');
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    moonContainer.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add stars to background
function createStars() {
    const body = document.body;
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        body.appendChild(star);
    }
}

// Call createStars when DOM is loaded
document.addEventListener('DOMContentLoaded', createStars); 