import { Module } from '@nestjs/common'
import { CoreModule } from 'src/core/module'
import { ServiceModule } from 'src/service/module'

@Module({
  imports: [CoreModule, ServiceModule]
})
export class AppModule { }
