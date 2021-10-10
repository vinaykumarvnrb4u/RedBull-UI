import io from 'socket.io-client';
console.log(process.env);
const { REACT_APP_SOCKET_URL, REACT_APP_ENV } = process.env;

let socket;
if (REACT_APP_ENV === 'development') {
    socket = io.connect(REACT_APP_SOCKET_URL);
} else { // listen on server port
    socket = io.connect();
}

socket.on('connect', () => {
    console.log('connected to socket');
});

export default socket;