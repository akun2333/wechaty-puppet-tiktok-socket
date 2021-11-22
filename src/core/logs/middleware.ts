import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { SYSTEM } from 'src/config'
import { Logger } from './service'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private logger: Logger
  ) { }

  use(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    SYSTEM.logger && this.logger.request(req)
    return next()
  }
}
