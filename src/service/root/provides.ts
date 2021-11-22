import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;
  client: { [key: string]: string } = {};

  async handleConnection(
    client: Socket
  ) {
    console.log(client.id)
  }
}
