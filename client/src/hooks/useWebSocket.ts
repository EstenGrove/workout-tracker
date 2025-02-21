import { useRef, useEffect, useCallback } from "react";

interface WSOptions {
	deferConnect?: boolean;
	onMessage: (msg: MessageEvent) => void;
	onConnect?: (socket: unknown) => void;
	onClose?: (e: CloseEvent) => void;
	onError?: (err: Event) => void;
	onTerminate?: () => void;
}

const useWebSocket = (url: string, options: WSOptions) => {
	const {
		deferConnect = true,
		onConnect,
		onClose,
		onError,
		onMessage,
		onTerminate,
	} = options;
	const wss = useRef<WebSocket>();

	// MIGHT NEED TO SET THIS TO RUN ONCE VIA '[]' EMPTY DEPS ARRAY
	const setup = useCallback(() => {
		const wsConnection = new WebSocket(url);
		// add event listeners
		wsConnection.onopen = (socket) => {
			if (onConnect) onConnect(socket);
		};
		wsConnection.onclose = (code: CloseEvent) => {
			if (onClose) onClose(code);
		};
		wsConnection.onmessage = (msg: MessageEvent) => {
			if (onMessage) onMessage(msg);
		};
		wsConnection.onerror = (e: Event) => {
			if (onError) onError(e);
		};

		wss.current = wsConnection as WebSocket;
	}, [onClose, onConnect, onError, onMessage, url]);

	const send = (type: string, msg: object) => {
		if (!wss.current) {
			throw new Error("WSS Connection is required to send data!");
		}
		const socket = wss.current as WebSocket;
		const data = {
			type: type,
			data: msg,
		};
		socket.send(JSON.stringify(data));
	};

	const terminate = () => {
		if (!wss.current) {
			throw new Error("WSS Connection is required to terminate!");
		}

		const socket = wss.current as WebSocket;
		socket.close();

		if (onTerminate) onTerminate();
	};

	// setup connections & events, if not deferred
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		if (!deferConnect) {
			setup();
		}

		return () => {
			isMounted = false;
		};
	}, [deferConnect, setup]);

	return {
		wss: wss.current as WebSocket,
		send: send,
		connect: setup,
		disconnect: terminate,
	};
};

export { useWebSocket };
