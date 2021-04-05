import React,{ useState, createContext } from 'react'
import io from "socket.io-client";

export const SocketContext = createContext();

function SocketContextApi(props) {

    const socket = io("http://localhost:3333", { transport : ['websocket'] });
    const socketVal = {socket}

    return (
        <SocketContext.Provider value={socketVal} >
            {props.children}
        </SocketContext.Provider>
    )
}

export default SocketContextApi
