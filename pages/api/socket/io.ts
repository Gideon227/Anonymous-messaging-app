import { NextApiRequest, NextApiResponse } from 'next';
import { Server as NetServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

type NextApiResponseServer = NextApiResponse & {
  socket: {
    server: NetServer & {
      io?: SocketIOServer;
    };
  };
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServer) => {
  if (!res.socket.server.io) {
      console.log('*First use, starting Socket.IO');

      const path = "/api/socket/io";
      const httpServer: NetServer = res.socket.server as any

      const io = new SocketIOServer(httpServer,{
        path: path,
        addTrailingSlash: false
      });

      io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);
  
        socket.on('joinRoom', (roomId) => {
            socket.join(roomId);
            console.log(`${socket.id} joined room: ${roomId}`);
        });
        
        socket.on('sendMessage', ({ room, message }) => {
            console.log(`Message from ${socket.id} in ${room}:`, message);
            io.to(room).emit('newMessage', message);
        });
  
        socket.on('leaveRoom', (roomId) => {
            socket.leave(roomId);
        });

        socket.on('disconnect', () => {
          console.log('Client disconnected:', socket.id);
        });
      });
      res.socket.server.io = io;
  }
  res.end();
};

export default ioHandler;