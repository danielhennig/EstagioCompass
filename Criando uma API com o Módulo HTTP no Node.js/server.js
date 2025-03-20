const { createServer } = require('node:http');
const { URL } = require('node:url');

const hostname = '127.0.0.1';
const port = 3000;

// Função para verificar se um número é primo
const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

const server = createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');

    try {
        const url = new URL(request.url, `http://${hostname}:${port}`);
        const urlPath = url.pathname;

        // Endpoint de Health Check
        if (request.method === 'GET' && urlPath === '/health-check') {
            response.statusCode = 200;
            return response.end(JSON.stringify({ success: true, timestamp: Date.now() }));
        }

        // Endpoint para verificar número primo
        else if (request.method === 'GET' && urlPath.startsWith('/is-prime-number/')) {
            const number = parseInt(urlPath.split('/').pop(), 10);

            if (isNaN(number)) {
                response.statusCode = 400;
                return response.end(JSON.stringify({ error: 'Invalid number' }));
            }

            response.statusCode = 200;
            return response.end(JSON.stringify({ number, isPrime: isPrime(number) }));
        }

        // Endpoint para contar pares e ímpares
        else if (request.method === 'POST' && urlPath === '/count') {
            let body = '';

            request.on('data', chunk => {
                body += chunk.toString();
            });

            request.on('end', () => {
                try {
                    const parsedBody = JSON.parse(body);

                    if (!Array.isArray(parsedBody)) {
                        response.statusCode = 400;
                        return response.end(JSON.stringify({ error: 'Body must be an array of numbers' }));
                    }

                    const count = parsedBody.reduce((acc, num) => {
                        if (typeof num !== 'number') {
                            response.statusCode = 400;
                            return response.end(JSON.stringify({ error: 'Array must contain only numbers' }));
                        }
                        acc[num % 2 === 0 ? 'even' : 'odd']++;
                        return acc;
                    }, { even: 0, odd: 0 });

                    response.statusCode = 200;
                    return response.end(JSON.stringify(count));
                } catch (error) {
                    response.statusCode = 400;
                    return response.end(JSON.stringify({ error: 'Invalid JSON body' }));
                }
            });

        } else {
            response.statusCode = 404;
            response.end(JSON.stringify({ error: 'Route not found' }));
        }

    } catch (error) {
        console.error(error);
        response.statusCode = 500;
        response.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
