import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { Socket } from "socket.io";
import { tiktok } from "src/util";
import { EventsGateway } from "./provides";
import { MessageBaseDto } from './dto'

@Controller()
export class RootController {

  private token: {
    [key: string]: { from_user_id: string }
  } = {}

  constructor(
    private gateway: EventsGateway
  ) { }

  @Get('login')
  async login(
    @Query() { code, state }
  ) {
    const { client_key, client_secret } = tiktok
    const token = await tiktok.request({
      method: '/oauth/access_token/',
      grant_type: 'authorization_code',
      code, client_key, client_secret,
    })
    const { open_id } = token
    this.gateway.client[open_id] = state
    this.token[open_id] = token
    return 'Authorization succeeded'
  }

  @Post('mockHook')
  mockHook(
    @Body() body: MessageBaseDto
  ) {
    console.log('mock hook', body)
    const { event, from_user_id, to_user_id } = body
    return ({
      'receive_msg': async () => (await this.client(to_user_id)).emit(event, body),
    }[event]?.() && body) || {
      event: "receive_msg", client_key: "awc3mc10ujmzpxsd",
      from_user_id: "", to_user_id: "", log_id: "",
      content: { message_type: "text", text: "mockTemplate" }
    }
  }

  @Post('/')
  PostRoot(
    @Body() body: MessageBaseDto
  ) {
    console.log('tiktok webhook', body)
    const { from_user_id, to_user_id, event, content: { challenge } } = body
    return ({
      'verify_webhook': () => ({ challenge }),
      'authorize': () => this.emitEvent(from_user_id, event, this.token[from_user_id]),
      'unauthorize': () => this.emitEvent(from_user_id, event, body),
      'receive_msg': async () => (await this.client(to_user_id)).emit(event, body),
    }[event])?.() || {}
  }

  async emitEvent(
    from_user_id: string,
    event: string,
    body: any,
  ) {
    const client = await this.client(from_user_id)
    client && client.emit(event, body)
  }

  async client(id: string): Promise<Socket> {
    const [client] = await this.gateway.server
      .in(this.gateway.client[id])
      .fetchSockets()
    return client as unknown as Socket
  }
}