document.addEventListener('DOMContentLoaded', () => {

    const canvas = document.getElementById('spooky-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = 100;
    const colors = ['#8A2BE2', '#FFA500', '#4B0082', '#FF8C00'];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() * 2 - 1) * 0.5;
            this.speedY = (Math.random() * 2 - 1) * 0.5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
            }
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    const wisp = document.getElementById('wisp');
    
    window.addEventListener('mousemove', (e) => {
        wisp.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    const title = document.getElementById('title');
    setInterval(() => {
        if (Math.random() > 0.1) {
            title.style.opacity = '1';
            title.style.textShadow = '0 0 10px #FFA500, 0 0 20px #FF8C00, 0 0 40px #E65C00';
        } else {
            title.style.opacity = '0.7';
            title.style.textShadow = '0 0 5px #FFA500, 0 0 10px #FF8C00';
        }
    }, 120);

    const joinButton = document.getElementById('join-btn');
    
    joinButton.addEventListener('mouseenter', () => {
        joinButton.classList.add('shake-it');
    });

    joinButton.addEventListener('animationend', () => {
        joinButton.classList.remove('shake-it');
    });

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = [];
        initParticles();
    });

});