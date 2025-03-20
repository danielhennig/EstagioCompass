const { createServer } = require('node:http');
const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
    res.setHeader('content-type', 'application/json');

    res.statusCode = 200;
    res.end(JSON.stringify({ message: 'Servidor Rodando!' }));

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


const fecth = require('node-fetch');

async function getBitcoinPrice(currency) {
    try {
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currency}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.bitcoin[currency];

    } catch (error) {
        throw new Error('Erro ao buscar preço do Bitcoin');
    }
}