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
    let cardWidth = cards[0].offsetWidth + 30; // Including gap
    let maxIndex = Math.max(0, cards.length - Math.floor(track.offsetWidth / cardWidth));

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function scrollToIndex(index) {
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        updateDots();
    }

    // Event listeners for navigation buttons
    prevButton.addEventListener('click', () => scrollToIndex(currentIndex - 1));
    nextButton.addEventListener('click', () => scrollToIndex(currentIndex + 1));

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => scrollToIndex(index));
    });

    // Auto-play functionality
    let autoplayInterval = setInterval(() => {
        scrollToIndex((currentIndex + 1) % (maxIndex + 1));
    }, 5000);

    // Pause auto-play on hover
    track.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    track.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(() => {
            scrollToIndex((currentIndex + 1) % (maxIndex + 1));
        }, 5000);
    });

    // Update card width and maxIndex on window resize
    window.addEventListener('resize', () => {
        cardWidth = cards[0].offsetWidth + 30;
        maxIndex = Math.max(0, cards.length - Math.floor(track.offsetWidth / cardWidth));
        scrollToIndex(currentIndex);
    });
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