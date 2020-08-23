import IOClient from 'socket.io-client';

const ENDPOINT = process.env.REACT_APP_SOCKET;
localStorage.debug = 'socket.io-client:socket';

export default (endpoint) => IOClient(endpoint || ENDPOINT, { transports: ['websocket'], upgrade: false });
