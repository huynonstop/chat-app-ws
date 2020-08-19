import socketIOClient from 'socket.io-client';

const ENDPOINT = process.env.REACT_APP_SOCKET;

export default (endpoint) => socketIOClient(endpoint || ENDPOINT);
