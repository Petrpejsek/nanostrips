const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Nastavení serveru pro statické soubory (HTML, CSS, obrázky)
app.use(express.static('./'));

// Základní route pro hlavní stránku
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Spuštění serveru
app.listen(port, () => {
    console.log(`Server běží na http://localhost:${port}`);
}); 