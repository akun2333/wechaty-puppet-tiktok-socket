import { NestApplicationOptions } from '@nestjs/common'
import { Logger } from '../logs'

export const AppOption: NestApplicationOptions = {
  logger: new Logger()
}