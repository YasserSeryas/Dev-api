import http, { request } from 'http'

const server = http.createServer((request,response) => {
    if(request.url === '/api/products' && request.method === 'GET') {
        response.writeHead(200, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({
            id: 1,
            name: 'Product 1',
            price: 1.99,
        }))
    } else{
        response.writeHead(404, {'Content-Type': 'application/json'})
                response.end(JSON.stringify({
                    message : "Error"
                }))
    }
    response.end()
})
const PORT = process.env.PORT || 5002

server.listen(PORT, () => { console.log('listening on port ' + PORT) })

