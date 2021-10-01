import io from 'socket.io-client';

const { REACT_APP_SOCKET_URL } = process.env;

const socket = io(REACT_APP_SOCKET_URL);
socket.on('connect', () => {
    console.log('connected to socket');
});

export default socket;