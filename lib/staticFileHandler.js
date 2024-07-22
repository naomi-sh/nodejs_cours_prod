// 1 import 'http' module
const fs = require('fs');
const http = require('http');
const path = require('path');


// 2 create server
const serveStaticFile =(request,response) =>
{
    // 3.1 parse url and determine file name
    // 3.2 if no path' is defined, return 'index.html'

    // ternary condition
    const url = request.url === '/' ? 'index.html' : request.url;

    // if (request.url === '/')
        // 'index.html'
    // else

        // http://localhost:3000/file.html ==> c:\..\file.html
        // _dirname = C:\_nodejs_course\lesson_1\file_server> node .\file_server\
        // _dirname = C:\_nodejs_course\lesson_1\file_server> node .\file_server\public
        // _dirname = C:\_nodejs_course\lesson_1\file_server> node .\file_server\public\file.html
        const filePath = path.join(__dirname,"../public",url)
        const fileExt = path.extname(filePath)
        console.log(`filepath: ${filePath}`)
        console.log(`fileExt: ${fileExt}`)

        let contentType = 'text/html';

        switch (fileExt) {
            case '.html':
                contentType = 'text/html';
                break;
            case '.css' :
                contentType = 'text/css';
                break;
            case '.gif' :
                contentType = 'image/gif';
                break;
            default :
                contentType = 'text/html';
        };

    // 3.3 look for the desired file
    // read file asynchronously
    fs.readFile(filePath,(error,content)=>{
        // 1. check for errors, if error exist return 404.html
        if (error != null){
            // check if file doesn't exist
            if (error.code === 'ENOENT'){
                const errorFile = path.join(__dirname,"../public","404.html");
                fs.readFile(errorFile,(err,data)=>{
                    // assumption, all is well
                    response.writeHead(404,{'content-type': contentType}) ;
                    response.end(data);
                })
            }else
            {
                // default error handling
                response.writeHead(500);
                response.end(`server error: ${error.code}`);
            }
        }
        // 2. if all is well,return file   
        else{
            response.writeHead(200,{'content-type':contentType}) ;
            response.end(content,'utf8'); 
        }
    });
    // 3.4 if file not found - send error
    // 3.5 if file found - return file
}
module.exports = {serveStaticFile};