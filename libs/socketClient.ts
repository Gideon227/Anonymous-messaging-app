"use client";
import { io } from 'socket.io-client';
export const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
    transports: ['websocket'], 
    autoConnect: true,
})

socket.on("connect", () => {
    console.log("Socket connected with id:", socket.id);
});
  