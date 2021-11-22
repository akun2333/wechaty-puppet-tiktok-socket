import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>()
    const ex = exception instanceof HttpException
    const code = ex ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    const msg = exception.message || HttpStatus[code]
    return response.json({ time: Date.now(), code, msg })
  }
}