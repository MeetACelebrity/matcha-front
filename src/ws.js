import { useState, useCallback } from 'react';
import { w3cwebsocket as WebSocketClient } from 'websocket';

class WS {
    constructor() {
        this.ws = new WebSocketClient('ws://localhost:8080/', 'echo-protocol');
    }

    setup() {
        console.log('hi !');

        this.ws.onerror = () => {
            console.log('Connection Error');
        };

        this.ws.onopen = () => {
            console.log('WebSocket Client Connected');

            const sendNumber = () => {
                if (this.ws.readyState === this.ws.OPEN) {
                    var number = Math.round(Math.random() * 0xfffffff);
                    this.ws.send(JSON.stringify({ number: number }));
                    setTimeout(sendNumber, 1000);
                }
            };

            sendNumber();
        };

        this.ws.onclose = () => {
            console.log('echo-protocol Client Closed');
        };

        this.ws.onmessage = e => {
            if (typeof e.data === 'string') {
                console.log("Received: '" + e.data + "'");
            }
        };
    }
}

export function useWS() {
    const [ws, setWS] = useState(null);
    const setupWS = useCallback(() => {
        const ws = new WS();
        ws.setup();

        setWS(ws);
    }, [setWS]);

    return [ws, setupWS];
}
