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

    // Second catalog navigation
    const catalogGridSecond = document.querySelector('.content__catalogo-grid--second');
    const prevButtonSecond = document.querySelector('.content__catalogo--second .catalog-nav--prev');
    const nextButtonSecond = document.querySelector('.content__catalogo--second .catalog-nav--next');

    prevButtonSecond.addEventListener('click', () => {
        catalogGridSecond.scrollBy({
            left: -320,
            behavior: 'smooth'
        });
    });

    nextButtonSecond.addEventListener('click', () => {
        catalogGridSecond.scrollBy({
            left: 320,
            behavior: 'smooth'
        });
    });
});

/* payments */

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

/* mais codigo */

const produtos = [
    {
        id: 1,
        nome: "Vestido Infantil Kyly",
        preco: 99.90,
        imagem: "vestido.jpg",
        estoque: 10
    },
    {
        id: 2,
        nome: "Conjunto Menina Borbojafdim",
        preco: 129.90,
        imagem: "conjunto.jpg",
        estoque: 5
    }
];

// Cupons válidos
const cupons = {
    "PRIMEIRO10": 0.1,
    "VERAO2024": 0.15
};

// Classe para gerenciar o carrinho
class Carrinho {
    constructor() {
        this.itens = [];
        this.desconto = 0;
    }

    adicionarItem(produto, quantidade = 1) {
        const itemExistente = this.itens.find(item => item.id === produto.id);
        
        if (itemExistente) {
            itemExistente.quantidade += quantidade;
        } else {
            this.itens.push({...produto, quantidade});
        }
        
        this.atualizarCarrinho();
    }

    removerItem(id) {
        this.itens = this.itens.filter(item => item.id !== id);
        this.atualizarCarrinho();
    }

    aplicarCupom(codigoCupom) {
        if (cupons[codigoCupom]) {
            this.desconto = this.calcularSubtotal() * cupons[codigoCupom];
            this.atualizarCarrinho();
            return true;
        }
        return false;
    }

    calcularSubtotal() {
        return this.itens.reduce((total, item) => total + (item.preco * item.quantidade), 0);
    }

    calcularTotal() {
        return this.calcularSubtotal() - this.desconto;
    }

    atualizarCarrinho() {
        const cartItems = document.getElementById('cart-items');
        const sidebarCartItems = document.getElementById('sidebar-cart-items');
        cartItems.innerHTML = '';
        sidebarCartItems.innerHTML = '';

        this.itens.forEach(item => {
            // Linha na tabela principal
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${item.nome}</td>
                <td>R$ ${item.preco.toFixed(2)}</td>
                <td>
                    <button onclick="carrinho.mudarQuantidade(${item.id}, -1)">-</button>
                    ${item.quantidade}
                    <button onclick="carrinho.mudarQuantidade(${item.id}, 1)">+</button>
                </td>
                <td>R$ ${(item.preco * item.quantidade).toFixed(2)}</td>
                <td>
                    <button onclick="carrinho.removerItem(${item.id})">🗑️</button>
                </td>
            `;
            cartItems.appendChild(linha);

            // Item na sidebar
            const sidebarItem = document.createElement('div');
            sidebarItem.innerHTML = `
                <p>${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}</p>
            `;
            sidebarCartItems.appendChild(sidebarItem);
        });

        // Atualizar totais
        document.getElementById('cart-subtotal').textContent = this.calcularSubtotal().toFixed(2);
        document.getElementById('cart-discount').textContent = this.desconto.toFixed(2);
        document.getElementById('cart-total').textContent = this.calcularTotal().toFixed(2);
    }

    mudarQuantidade(id, delta) {
        const item = this.itens.find(item => item.id === id);
        if (item) {
            item.quantidade = Math.max(1, item.quantidade + delta);
            this.atualizarCarrinho();
        }
    }
}

// Inicializar carrinho
const carrinho = new Carrinho();

// Adicionar produtos iniciais
produtos.forEach(produto => {
    carrinho.adicionarItem(produto);
});

// Evento de aplicar cupom
document.getElementById('apply-coupon').addEventListener('click', () => {
    const couponInput = document.getElementById('coupon-input');
    const success = carrinho.aplicarCupom(couponInput.value.toUpperCase());
    
    if (success) {
        alert('Cupom aplicado com sucesso!');
    } else {
        alert('Cupom inválido');
    }
});

// Mostrar modal de cupons
document.getElementById('coupon-input').addEventListener('focus', () => {
    document.getElementById('coupon-modal').style.display = 'flex';
});

// Fechar modal de cupons
document.getElementById('coupon-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('coupon-modal')) {
        document.getElementById('coupon-modal').style.display = 'none';
    }
});

// Validações de formulário (próximas telas)
function validarDadosPessoais() {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    
    let valido = true;
    
    if (nome.length < 2) {
        document.getElementById('nome-erro').style.display = 'block';
        valido = false;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
        document.getElementById('email-erro').style.display = 'block';
        valido = false;
    }
    
    if (!/^\d{11}$/.test(cpf.replace(/\D/g, ''))) {
        document.getElementById('cpf-erro').style.display = 'block';
        valido = false;
    }
    
    return valido;
}

function validarCartao() {
    const numero = document.getElementById('numero-cartao').value.replace(/\D/g, '');
    const nome = document.getElementById('nome-cartao').value.trim();
    const cvv = document.getElementById('cvv').value.trim();
    
    let valido = true;
    
    if (!/^\d{13,19}$/.test(numero)) {
        document.getElementById('cartao-erro').style.display = 'block';
        valido = false;
    }
    
    if (nome.length < 3) {
        document.getElementById('nome-cartao-erro').style.display = 'block';
        valido = false;
    }
    
    if (!/^\d{3,4}$/.test(cvv)) {
        document.getElementById('cvv-erro').style.display = 'block';
        valido = false;
    }
    
    return valido;
}

// Máscaras para formulários
function mascararCPF(input) {
    let valor = input.value.replace(/\D/g, '');
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    input.value = valor;
}

function mascararCartao(input) {
    let valor = input.value.replace(/\D/g, '');
    valor = valor.replace(/(\d{4})(\d)/, "$1 $2");
    valor = valor.replace(/(\d{4})(\d)/, "$1 $2");
    valor = valor.replace(/(\d{4})(\d)/, "$1 $2");
    input.value = valor;
}