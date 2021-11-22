export const environment = process.env.NODE_ENV
export const isDevMode = Object.is(environment, 'dev')
export const isProdMode = !isDevMode

export const SYSTEM = {
  host: '127.0.0.1',
  port: 80,
  logger: false,
}