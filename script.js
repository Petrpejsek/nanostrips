// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a, .nav-links button');

    // Toggle menu
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        
        // Toggle menu icon
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close menu when clicking on a link
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
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