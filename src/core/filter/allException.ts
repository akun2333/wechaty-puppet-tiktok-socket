import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, Logger } from '@nestjs/common'
import { Request, Response } from 'express'
import { requestUrl } from 'src/util'

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const reqeust = host.switchToHttp().getRequest<Request>()
    const response = host.switchToHttp().getResponse<Response>()
    const code = HttpStatus.INTERNAL_SERVER_ERROR
    const msg = HttpStatus[code]
    Logger.error(requestUrl(reqeust).href, 'HttpExceptionFilter')
    Logger.error(exception, 'HttpExceptionFilter')
    console.error(exception)
    return response.json({ time: Date.now(), code, msg })
  }
}