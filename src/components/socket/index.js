import io from "socket.io-client";

let ENDPOINT = "http://localhost:3000";

let socket = io(ENDPOINT);

export default socket;