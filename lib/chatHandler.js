const http = require('http');
const path = require('path');
const fs = require('fs');
const WebSocket = require('ws');

const chatHandler = server => {

// 2. initialize the ws server
const wss = new WebSocket.Server({server});

// handling client 
wss.on('connection',ws => {
    // a) in case of a message from a client
    // שליחת הודעה מהקליינט לסרבר
    ws.on('message',message => {
        console.log(`received : ${message}`)

        wss.clients.forEach(c => {
            // האם הקליינט הנוכחי פנוי ואפשר לתקשר איתו
            if (c.readyState === WebSocket.OPEN){
                // מחזירים הודעה מהסרבר לקליינט
                c.send(message);
            }

        })
    });

    // b) send a 'connection' message
    console.log('connecting to the server')
    ws.send('welcome the chat');
})
}
module.exports = {chatHandler}

