const { createServer } = require('node:http');
const { URL } = require('node:url');

const hostname = '127.0.0.1';
const port = 3000;

// Função para buscar o preço do Bitcoin na API do CoinGecko
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

// Criando o servidor HTTP
const server = createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    try {
        // Criando o objeto URL para capturar parâmetros
        const url = new URL(req.url, `http://${hostname}:${port}`);
        const urlPath = url.pathname;

        // Endpoint para buscar preço do Bitcoin
        if (req.method === 'GET' && urlPath === '/stock-insight') {
            const currency = url.searchParams.get('currency') || 'usd';

            if (!['usd', 'brl'].includes(currency)) {
                res.statusCode = 400;
                return res.end(JSON.stringify({ message: 'Moeda inválida. Use currency=usd ou currency=brl' }));
            }

            try {
                const bitcoinPrice = await getBitcoinPrice(currency);
                res.statusCode = 200;
                return res.end(JSON.stringify({
                    bitcoinPrice,
                    currency
                }));
            } catch (error) {
                res.statusCode = 500;
                return res.end(JSON.stringify({ error: 'Erro ao buscar preço do Bitcoin' }));
            }
        }

        // Rota padrão para servidor rodando
        if (req.method === 'GET' && urlPath === '/') {
            res.statusCode = 200;
            return res.end(JSON.stringify({ message: 'Servidor Rodando!' }));
        }

        // Caso nenhuma rota seja encontrada
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Rota não encontrada' }));

    } catch (error) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Erro interno do servidor' }));
    }
});

// Iniciando o servidor
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
