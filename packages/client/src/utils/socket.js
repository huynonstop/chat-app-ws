import socketIOClient from 'socket.io-client';

const ENDPOINT = process.env.REACT_APP_API;

export default (endpoint) => socketIOClient(endpoint || ENDPOINT);
