import { Logger } from '@nestjs/common'
import { SYSTEM } from 'src/config'
import { httpServer, } from './http'

export async function bootstrap() {
  const url = new URL(`http://${SYSTEM.host}:${SYSTEM.port}`)
  await httpServer()
  Logger.log(url.href, 'NestApplication')
}