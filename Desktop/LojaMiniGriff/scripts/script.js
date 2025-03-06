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

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    setInterval(nextSlide, 5000);

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
})

document.querySelectorAll('.payment-method').forEach(method => {
    method.addEventListener('click', () => {
        document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
        method.classList.add('active');
        
        const paymentDetails = document.querySelector('.payment-details');
        const creditCardForm = document.querySelector('.credit-card-form');
        
        if (method.textContent.includes('Pix')) {
            paymentDetails.innerHTML = `
                <div class="pix-details">
                    <div class="qr-code">QR Code</div>
                    <div>
                        <h3>Pagamento via Pix</h3>
                        <p>Escaneie o QR Code ou copie o código para pagar instantaneamente</p>
                        <button class="cta-button">Copiar Código Pix</button>
                    </div>
                </div>
            `;
            creditCardForm.style.display = 'none';
        } else if (method.textContent.includes('Cartão')) {
            paymentDetails.innerHTML = '';
            creditCardForm.style.display = 'block';
        } else if (method.textContent.includes('Boleto')) {
            paymentDetails.innerHTML = `
                <div>
                    <h3>Boleto Bancário</h3>
                    <p>Seu boleto será gerado para pagamento em qualquer banco ou lotérica</p>
                    <p>Prazo de pagamento: até 3 dias úteis</p>
                    <button class="cta-button">Gerar Boleto</button>
                </div>
            `;
            creditCardForm.style.display = 'none';
        }
    });
});

document.getElementById('meuCarrinho').addEventListener('click', function() {
    window.location.href = '../pages/cart.html';
});

document.getElementById('login').addEventListener('click', function() {
    window.location.href = '../pages/login.html';
});

document.getElementById('header-cart').addEventListener('click', function () {
    window.location.href = '../pages/cart.html';
})












/* document.getElementById('irParaEntrega').addEventListener('click', function() {
    window.location.href = '../pages/delivery.html'; 
}); */
