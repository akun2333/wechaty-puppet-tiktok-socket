import { Module } from '@nestjs/common'
import { FilterModule } from './filter/module'
import { InterceptorModule } from './interceptor/module'
import { LoggerModule } from './logs/module'

@Module({
  imports: [
    InterceptorModule,
    LoggerModule,
    FilterModule,
  ],
})
export class CoreModule { }
