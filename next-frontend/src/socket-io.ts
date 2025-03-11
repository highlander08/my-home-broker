import { io } from "socket.io-client";

export const socket = io("http://localhost:3000", {
  autoConnect: false,
  // withCredentials: true,
  // reconnectionAttempts: 5, // Tentar reconectar até 5 vezes
  // timeout: 5000, // Tempo limite de 5 segundos
});




