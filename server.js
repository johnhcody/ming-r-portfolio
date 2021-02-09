const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();
app.prepare().then(() => {

    server.all('*', (req, res) => {
        return handle(req, res);
    })

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, (err) => {
        if (err) { console.log(err); }
        console.log(`> Ready on port ${PORT}`)
    })
})

module.exports = server;