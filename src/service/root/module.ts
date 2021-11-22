import { Module } from '@nestjs/common'
import { RootController } from './controller'
import { EventsGateway } from './provides'

@Module({
  controllers: [RootController],
  providers: [EventsGateway]
})
export class RootModule { }