const http = require('http');

const app =http.createServer((req, res) => {
    console.log(req);
    res.end('Hello there welcome to Data Store');
})

app.listen('5000', '127.0.0.1', () => {
    console.log('Server is up');
})

