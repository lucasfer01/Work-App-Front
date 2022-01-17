import io from "socket.io-client";

// let ENDPOINT = "http://localhost:3000";
let ENDPOINT = "https://workapp-back-end.herokuapp.com/";


let socket = io(ENDPOINT);

export default socket;