document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.banner__slide');
    const dots = document.querySelectorAll('.banner__dot');
    let currentSlide = 0;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[n].classList.add('active');
        dots[n].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Adiciona eventos de clique aos dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Alterna slides automaticamente a cada 5 segundos
    setInterval(nextSlide, 5000);

    // Add scroll animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.catalogo__item').forEach(item => {
        observer.observe(item);
    });

    // Catalog navigation
    const catalogGrid = document.querySelector('.content__catalogo-grid');
    const prevButton = document.querySelector('.catalog-nav--prev');
    const nextButton = document.querySelector('.catalog-nav--next');

    prevButton.addEventListener('click', () => {
        catalogGrid.scrollBy({
            left: -320,
            behavior: 'smooth'
        });
    });

    nextButton.addEventListener('click', () => {
        catalogGrid.scrollBy({
            left: 320,
            behavior: 'smooth'
        });
    });
});