import { Injectable, ConsoleLogger } from '@nestjs/common'
import { keyWord, mkdir, requestUrl } from 'src/util'
import { appendFileSync } from 'fs'
import { Request } from 'express'
import { resolve } from 'path'
import { stringify } from 'querystring'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { SYSTEM } from 'src/config'
dayjs.extend(utc)

@Injectable()
export class Logger extends ConsoleLogger {
  private logsPath = './logs'
  private accessPath = 'request'

  constructor() {
    super()
    SYSTEM.logger && mkdir(`${this.logsPath}/${this.accessPath}`)
  }

  log(message: any, ...option: any[]): any {
    const filter = ['RoutesResolver', 'RouterExplorer', 'InstanceLoader']
    if (keyWord(option, filter)) return
    this.storage(message, 'logger')
    super.log(message, option)
  }

  error(message: any, ...option: any[]): any {
    this.storage(message, 'error')
    super.error(message, option)
  }

  warn(message: any, ...option: any[]): any {
    this.storage(message, 'warn')
    super.warn(message, option)
  }

  debug(message: any, ...option: any[]): any {
    this.storage(message, 'debug')
    super.debug(message, option)
  }

  verbose(message: any, ...option: any[]): any {
    this.storage(message, 'verbose')
    super.verbose(message, option)
  }

  request(
    req: Request,
    file = dayjs().format('YYYYMMDD')
  ) {
    const log = JSON.stringify({
      time: dayjs().utcOffset(480).format(),
      url: requestUrl(req),
      method: req.method,
      address: req.ip,
      host: req.headers.host,
      'user-agent': req.headers['user-agent'],
      query: stringify(req.query as {}, null, null, {
        encodeURIComponent: (str) => str,
      }),
      body: stringify(req.body as {}, null, null, {
        encodeURIComponent: (str) => str,
      })
    }, null, 2)
    this.storage(log, `request/${file}`)
  }

  storage(
    data: string | Uint8Array,
    file: 'logger' | 'error' | 'warn' | 'debug' | 'verbose' | String = 'logger'
  ) {
    SYSTEM.logger && appendFileSync(resolve(`${this.logsPath}/${file}.log`), `${data}\n`)
  }
}