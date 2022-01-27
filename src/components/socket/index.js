import io from "socket.io-client";
import {BASE_URL} from "../../enviroment";

let ENDPOINT = BASE_URL;


let socket = io(ENDPOINT);

export default socket;