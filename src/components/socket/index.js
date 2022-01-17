import io from "socket.io-client";

// let ENDPOINT = "https://workapp-back-end.herokuapp.com";
let ENDPOINT = "http://localhost:3000";

let socket = io(ENDPOINT);

export default socket;