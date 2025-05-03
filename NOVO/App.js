// Espera o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona elementos do carrossel
    const slide = document.querySelector('.carousel-slide');
    const images = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    // Variáveis de controle
    let counter = 0;
    const size = images[0].clientWidth;
    
    // Cria os indicadores (dots)
    function createDots() {
        images.forEach((img, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if(index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    // Atualiza a posição do carrossel
    function updateCarousel() {
        slide.style.transform = `translateX(${-size * counter}px)`;
        updateDots();
    }
    
    // Atualiza os dots ativos
    function updateDots() {
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === counter);
        });
    }
    
    // Navega para um slide específico
    function goToSlide(index) {
        counter = index;
        updateCarousel();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
        if(counter < images.length - 1) {
            counter++;
            updateCarousel();
        }
    });
    
    prevBtn.addEventListener('click', () => {
        if(counter > 0) {
            counter--;
            updateCarousel();
        }
    });
    
    // Redimensionamento responsivo
    window.addEventListener('resize', () => {
        slide.style.transition = 'none';
        slide.style.transform = `translateX(${-images[0].clientWidth * counter}px)`;
        setTimeout(() => slide.style.transition = 'transform 0.5s ease-in-out');
    });
    
    // Inicialização
    createDots();
    slide.style.transform = `translateX(${-size * counter}px)`;
});