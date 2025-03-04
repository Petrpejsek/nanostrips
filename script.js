// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = mobileMenuBtn.querySelector('i');

    function toggleMenu() {
        navLinks.classList.toggle('active');
        menuIcon.classList.toggle('fa-bars');
        menuIcon.classList.toggle('fa-times');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    // Toggle menu when clicking the button
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a, button').forEach(item => {
        item.addEventListener('click', () => {
            toggleMenu();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            toggleMenu();
        }
    });

    // Prevent menu from closing when clicking inside
    navLinks.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

// Reviews carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.reviews-track');
    const cards = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.prev-review');
    const nextButton = document.querySelector('.next-review');

    let currentIndex = 0;
    let startX;
    let scrollLeft;
    let isDragging = false;

    // Přidáme transition pro plynulý přechod
    track.style.transition = 'transform 0.3s ease-out';

    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth;
        const gap = parseInt(window.getComputedStyle(track).gap) || 30;
        const offset = currentIndex * (cardWidth + gap);
        track.style.transform = `translateX(-${offset}px)`;
        
        // Aktualizace teček
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });

        // Kontrola tlačítek
        prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextButton.style.opacity = currentIndex === cards.length - 1 ? '0.5' : '1';
    }

    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, cards.length - 1));
        updateCarousel();
    }

    // Event listeners pro tlačítka
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            goToSlide(currentIndex + 1);
        }
    });

    // Event listeners pro tečky
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    // Aktualizace při změně velikosti okna
    window.addEventListener('resize', updateCarousel);

    // Počáteční nastavení
    updateCarousel();
});

// Funkce pro ovládání množství produktů
document.querySelectorAll('.quantity-selector').forEach(selector => {
    const minusBtn = selector.querySelector('.minus');
    const plusBtn = selector.querySelector('.plus');
    const input = selector.querySelector('.quantity-input');

    minusBtn.addEventListener('click', () => {
        const currentValue = parseInt(input.value);
        if (currentValue > 1) {
            input.value = currentValue - 1;
        }
    });

    plusBtn.addEventListener('click', () => {
        const currentValue = parseInt(input.value);
        if (currentValue < 10) {
            input.value = currentValue + 1;
        }
    });

    input.addEventListener('change', () => {
        let value = parseInt(input.value);
        if (isNaN(value) || value < 1) {
            input.value = 1;
        } else if (value > 10) {
            input.value = 10;
        }
    });
});

// Funkce pro přidání do košíku
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.product-card');
        const productName = card.querySelector('h3').textContent;
        const quantity = card.querySelector('.quantity-input').value;
        const price = card.querySelector('.price').textContent;
        
        // Zde můžete implementovat logiku pro přidání do košíku
        // Pro ukázku zobrazíme alert
        alert(`Přidáno do košíku:
Produkt: ${productName}
Množství: ${quantity}
Cena: ${price}`);
        
        // Animace tlačítka
        button.classList.add('added');
        setTimeout(() => {
            button.classList.remove('added');
        }, 1000);
    });
}); 