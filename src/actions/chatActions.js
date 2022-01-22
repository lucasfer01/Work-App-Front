// impprtamos axios
import axios from "axios";
import socket from "../components/socket";
import { types } from "../types/types";

const userChats = async (userId) => {
    let userChats = [];
    socket.emit("chat-data", userId);
    socket.on("chat-data", async (data) => {
        userChats = await data;
    });
    return userChats;
}

export const getUserChats = (userId) => {
    return async (dispatch) => {
        const userChats = await userChats(userId);
        dispatch({ type: types.getUserChats, payload: userChats });
    };
}

