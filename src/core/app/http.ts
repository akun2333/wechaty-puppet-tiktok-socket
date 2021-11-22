import { NestApplication, NestFactory } from '@nestjs/core'
import { SYSTEM } from 'src/config'
import { AppModule } from './module'
import { AppOption } from './option'
import { AppMiddleware } from './middleware'

export async function httpServer() {
  process.env.TZ = 'Asia/Shanghai'
  const app = await NestFactory.create(
    AppModule,
    AppOption,
  ) as NestApplication
  await AppMiddleware(app)
  await app.listen(SYSTEM.port)
}

// import { NestApplication, NestFactory } from '@nestjs/core'
// import { ExpressAdapter } from '@nestjs/platform-express'
// import { AppModule } from './module'
// import { AppOption } from './option'
// import { AppMiddleware } from './middleware'
// import { isProdMode, SYSTEM, sslProd, sslDev } from 'src/config'
// import { createServer as http } from 'http'
// import { createServer as spdy } from 'spdy'
// import express from 'express'

// export async function httpsServer() {
//   const server = express()
//   const app = (await NestFactory.create(
//     AppModule,
//     new ExpressAdapter(server),
//     AppOption,
//   )) as NestApplication
//   await AppMiddleware(app)
//   await app.init()
//   http(server).listen(SYSTEM.port)
//   spdy(isProdMode ? sslProd : sslDev, server).listen(443)
// }