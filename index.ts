import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";

const server = http.createServer();


server.on('request', (request: IncomingMessage, response: ServerResponse) => {
    const arr = [];
    request.on('data', (chunk) => {
        arr.push(chunk);
    })

    request.on('end', () => {
        const body = Buffer.concat(arr).toString();
        console.log(body)
        response.end('hi')
    })
})


server.listen('8888')
