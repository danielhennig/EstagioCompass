const fetch = require('node:fetch');

async function getBitcoinPrice(currency) {
    try {
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currency}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Erro ao buscar preço:', error);
    }
}

getBitcoinPrice('usd');
