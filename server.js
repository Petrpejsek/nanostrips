const express = require('express');
const path = require('path');
const app = express();

// Nastavení statických souborů
app.use(express.static('./'));

// Základní route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Spuštění serveru
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server běží na http://localhost:${PORT}`);
}); 