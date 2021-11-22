import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus, } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    return next.handle().pipe(map(value => {
      if (!this.toValidate(value)) return value
      if (typeof value != 'object') return value
      const { code = 0, msg = { 0: 'success', 250: '嘤嘤嘤', ...HttpStatus }[code], data, total, challenge, ...option } = value
      return {
        time: Date.now(), code, msg, total, challenge,
        data: value.constructor == Array ? value : (data || (Object.keys(option).length ? option : undefined))
      }
    }))
  }

  toValidate(value: any) {
    if (!value) return false
    const types: Function[] = [Array, Object]
    return types.includes(value.constructor)
  }
}
