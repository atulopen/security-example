const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');
const helmet = require('helmet');

const app = express();
const PORT = 3000;

app.use(helmet());

app.use('/secret', (req, res) => {
    res.send('Your personal secret value is 42');
});

app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = https.createServer({
    cert: fs.readFileSync('cert.pem'),
    key: fs.readFileSync('key.pem'),
}, app);

server.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
})
