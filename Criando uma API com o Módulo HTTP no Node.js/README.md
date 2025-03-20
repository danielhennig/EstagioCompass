## Explicação das Modificações ##
GET /health-check

Retorna { success: true, timestamp: Date.now() }.
GET /is-prime-number/:number

Extrai um número da URL e verifica se ele é primo.
Se não for um número válido, retorna 400 Bad Request.
POST /count

Espera um array de números no corpo da requisição.
Retorna um JSON com a contagem de pares e ímpares.
Se o corpo não for um array ou conter valores inválidos, retorna 400 Bad Request.