// 1. Dark Mode
const themeBtn = document.getElementById('theme-btn');
const icon = themeBtn.querySelector('i');

// Verifica preferência salva
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    icon.className = 'fas fa-sun';
}

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    const isDark = document.body.classList.contains('dark-theme');
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// 2. Animação de Scroll (Fade In)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));