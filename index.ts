import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";
import * as fs from "fs";
import * as path from "path";
import * as url from "url";

const server = http.createServer();


const publicDir = path.resolve(__dirname, 'public')
let cacheAge = 3600 * 24 *365
server.on('request', (request: IncomingMessage, response: ServerResponse) => {
    const {method, url: path2, headers} = request
    const obj = url.parse(path2);
    const {pathname, search} = obj;

    if(method !== 'GET') {
        response.statusCode = 405
        response.end()
        return
    }

    let filename = pathname.substring(1);

    if(filename === '') {
        filename = 'index.html'
    }
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    fs.readFile(path.resolve(publicDir, filename), (error, data) => {
        if (error) {
            if (error.errno === -4058) {
                response.statusCode = 404
                fs.readFile(path.resolve(publicDir, '404.html'), (error, data) => {
                    response.end(data)
                })

            }else if(error.errno === -4068){
                response.statusCode = 403
                response.end('无权访问目录')
            } else {
                response.end('服务器繁忙')
            }
        } else {
            response.setHeader('Cache-Control', `public, max-age=${cacheAge}`)
            response.end(data)

        }
    })
})
server.listen('8888')
