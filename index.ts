import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";
import * as fs from "fs";
import * as path from "path";
import * as url from "url";

const server = http.createServer();


const publicDir = path.resolve(__dirname, 'public')
server.on('request', (request: IncomingMessage, response: ServerResponse) => {
    const {method, url: path2, headers} = request
    const obj = url.parse(path2);
    const {pathname, search} = obj;
    switch (pathname) {
        case '/index.html':
            response.setHeader('Content-Type', 'text/html; charset=utf-8');
            fs.readFile(path.resolve(publicDir, 'index.html'), (error, data) => {
                if (error) throw error
                response.end(data.toString())
            })
            break
        case '/style.css':
            fs.readFile(path.resolve(publicDir, 'style.css'), (error, data) => {
                if (error) throw error
                response.setHeader('Content-Type', 'text/css; charset=utf-8')
                response.end(data.toString())
            })
            break
        case '/main.js':
            fs.readFile(path.resolve(publicDir, 'main.js'), (error, data) => {
                if (error) throw error
                response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
                response.end(data.toString())
            })
            break
    }
})
server.listen('8888')
