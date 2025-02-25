const { createCanvas } = require('canvas');
const fs = require('fs');

// Funkce pro vytvoření gradientu
function createGradientBackground(ctx, width, height, colors) {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    colors.forEach((color, index) => {
        gradient.addColorStop(index / (colors.length - 1), color);
    });
    return gradient;
}

// Vytvoření obrázku pro mentolovou příchuť
function createMintImage() {
    const canvas = createCanvas(800, 600);
    const ctx = canvas.getContext('2d');

    // Pozadí s gradientem
    const gradient = createGradientBackground(ctx, 800, 600, ['#00f2fe', '#4facfe']);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);

    // Přidání efektu "mražení"
    for (let i = 0; i < 50; i++) {
        ctx.beginPath();
        ctx.arc(
            Math.random() * 800,
            Math.random() * 600,
            Math.random() * 30,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fill();
    }

    // Uložení obrázku
    const buffer = canvas.toBuffer('image/jpeg');
    fs.writeFileSync('./images/mint.jpg', buffer);
}

// Vytvoření obrázku pro tropickou příchuť
function createTropicalImage() {
    const canvas = createCanvas(800, 600);
    const ctx = canvas.getContext('2d');

    // Pozadí s gradientem
    const gradient = createGradientBackground(ctx, 800, 600, ['#FF8C00', '#FF0080']);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);

    // Přidání "tropických" elementů
    for (let i = 0; i < 30; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * 800, Math.random() * 600);
        ctx.lineTo(
            Math.random() * 800,
            Math.random() * 600
        );
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = Math.random() * 5;
        ctx.stroke();
    }

    // Uložení obrázku
    const buffer = canvas.toBuffer('image/jpeg');
    fs.writeFileSync('./images/tropical.jpg', buffer);
}

// Vytvoření obrázku pro lesní ovoce
function createBerryImage() {
    const canvas = createCanvas(800, 600);
    const ctx = canvas.getContext('2d');

    // Pozadí s gradientem
    const gradient = createGradientBackground(ctx, 800, 600, ['#6441A5', '#2a0845']);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);

    // Přidání "bobulových" elementů
    for (let i = 0; i < 40; i++) {
        ctx.beginPath();
        ctx.arc(
            Math.random() * 800,
            Math.random() * 600,
            Math.random() * 20 + 5,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = `rgba(${Math.random() * 100 + 155}, 0, ${Math.random() * 100 + 155}, 0.3)`;
        ctx.fill();
    }

    // Uložení obrázku
    const buffer = canvas.toBuffer('image/jpeg');
    fs.writeFileSync('./images/berry.jpg', buffer);
}

// Vytvoření všech obrázků
createMintImage();
createTropicalImage();
createBerryImage(); 