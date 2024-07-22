let ws;
let value;

function connectWebSocket(){
    // 1. create an instance of a websocket  pointing to a specific server and port
    ws = new WebSocket('wss://nodejs-cours-prod.onrender.com')
    
    // 2. event handling - onopen, onmessage, onclose
    
    // connection as made to the server
    // eventing
    ws.onopen = ()=>{
        console.log('connection to ws server ')

    };

    // server sends a message to me
    ws.onmessage = (event)=>{
        // server sends data as a 'blob'- event.data;
        // blob- מערך "בייתים"
        //FileReader - עוזר לפענח את ה BLOB
        const reader = new FileReader();

        const chat = document.getElementById('chat')
        const message = document.createElement('div')

        // asynchrony function
        reader.onload = () => {
            message.textContent = reader.result;
         //   console.log(reader.result);
            chat.appendChild(message)
        }

        if (event.data instanceof Blob) {
            reader.readAsText(event.data);
        }

    };

    // connection to server closed
    ws.onclose = ()=>{

    };
}

function sendMessage(){
    if (ws.readyState === WebSocket.OPEN){
        const input = document.getElementById('message')
        ws.send(input.value);
        input.value ='';
    }
}


connectWebSocket();