import { BinaryLike, createHash } from 'crypto'
import { Request } from 'express'
import { existsSync, mkdirSync } from 'fs'
import { dirname, resolve } from 'path'

export function requestUrl(req: Request): URL {
  return new URL(`${req.protocol}://${req.headers.host}${req.originalUrl}`)
}

export function md5(data: BinaryLike): string {
  return createHash('md5').update(data).digest('hex')
}

export async function delay(ms: number): Promise<unknown> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function keyWord(
  text: string | string[],
  keyword: string[],
): string | undefined {
  return keyword.find((value) => text.includes(value))
}

export function mkdir(path: string) {
  path = resolve(path)
  if (existsSync(path)) return true
  if (mkdir(dirname(path))) {
    mkdirSync(path)
    return true
  }
}
