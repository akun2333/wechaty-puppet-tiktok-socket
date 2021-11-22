import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { LoggerMiddleware } from './middleware'
import { Logger } from './service'

@Module({
  providers: [Logger]
})
export class LoggerModule implements NestModule {
  configure(
    consumer: MiddlewareConsumer
  ) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
