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
      const io = new SocketIOServer(res.socket.server);

      io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);
  
        socket.on('sendMessage', (message) => {
          console.log('Received message:', message);
          io.emit('newMessage', message); 
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