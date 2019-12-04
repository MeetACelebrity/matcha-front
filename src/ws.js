import { useState, useMemo, useCallback } from 'react';
import { w3cwebsocket as WebSocketClient } from 'websocket';

class PubSub {
    constructor() {
        this._map = new Map();
        this._subscribers = new Map();
        this._listeners = new Set();
    }

    subscribe(key, cb, init = true) {
        const subscribers = this._subscribers.get(key) || [];

        this._subscribers.set(key, [...subscribers, cb]);

        if (init === true) {
            cb(this._map.get(key));
        }
    }

    unsubscribe(key, cb) {
        const subscribers = this._subscribers.get(key);
        if (subscribers === undefined) return;

        this._subscribers.set(
            key,
            subscribers.filter(subscriber => subscriber !== cb)
        );
    }

    listen(cb, init = true) {
        this._listeners.add(cb);

        if (init === true) {
            cb([...this._map.values()]);
        }
    }

    unlisten(cb) {
        this._listeners.delete(cb);
    }

    reset() {
        this._map.clear();
        this._subscribers.clear();
    }

    _publish(key, value) {
        this._map.set(key, value);

        const subscribers = this._subscribers.get(key) || [];

        for (const subscriber of subscribers) {
            subscriber(value);
        }

        this._listeners.forEach(listener => listener([...this._map.values()]));
    }

    _get(key) {
        return this._map.get(key);
    }
}

export const WS_MESSAGES_TYPES = {
    INIT: 'INIT',
};

export const WS_RESPONSES_TYPES = {
    CONVERSATIONS: 'CONVERSATIONS',
    NEW_CONVERSATION: 'NEW_CONVERSATION',
    NEW_MESSAGE: 'NEW_MESSAGE',
};

class WS {
    constructor(pubsub) {
        this.ws = new WebSocketClient('ws://localhost:8080/', 'echo-protocol');
        this.pubsub = pubsub;
    }

    setup() {
        this.ws.onerror = () => {
            console.log('Connection Error');
        };

        this.ws.onopen = () => {
            console.log('WebSocket Client Connected');

            const init = () => {
                if (this.ws.readyState !== this.ws.OPEN) {
                    setTimeout(init, 10);
                    return;
                }

                this.send({
                    type: WS_MESSAGES_TYPES.INIT,
                });
            };

            init();
        };

        this.ws.onclose = () => {
            console.log('echo-protocol Client Closed');
        };

        this.ws.onmessage = e => {
            if (typeof e.data === 'string') {
                const message = JSON.parse(e.data);

                if (
                    Object.values(WS_RESPONSES_TYPES).includes(message.type) ===
                    false
                )
                    return;

                switch (message.type) {
                    case WS_RESPONSES_TYPES.CONVERSATIONS: {
                        const { conversations } = message.payload;
                        if (!Array.isArray(conversations)) break;

                        for (const conversation of conversations) {
                            console.log('gotten conversation', conversation);

                            this.pubsub._publish(
                                conversation.uuid,
                                conversation
                            );
                        }
                        break;
                    }
                    case WS_RESPONSES_TYPES.NEW_CONVERSATION: {
                        const conversation = message.payload;

                        this.pubsub._publish(conversation.uuid, conversation);
                        break;
                    }
                    case WS_RESPONSES_TYPES.NEW_MESSAGE: {
                        const {
                            conversationId,
                            ...messageProps
                        } = message.payload;
                        const conversation = this.pubsub._get(conversationId);

                        this.pubsub._publish(conversationId, {
                            ...conversation,
                            messages: [...conversation.messages, messageProps],
                        });
                        break;
                    }
                    default:
                        return;
                }

                console.log('message =', message);
            }
        };
    }

    send(msg) {
        this.ws.send(JSON.stringify(msg));
    }
}

export function useWS() {
    const pubsub = useMemo(() => new PubSub(), []);

    const [ws, setWS] = useState(null);
    const setupWS = useCallback(() => {
        const ws = new WS(pubsub);
        ws.setup();

        setWS(ws);
    }, [pubsub]);

    return [ws, setupWS, pubsub];
}
