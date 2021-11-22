import { NestApplication } from '@nestjs/core'
import { join } from 'path'

export const AppMiddleware = async (app: NestApplication) => {
  useAssets(app)
}

function useAssets(app: NestApplication) {
  app.useStaticAssets(join(process.cwd(), 'public'), {
    immutable: true,
    maxAge: 60 * 60 * 24 * 1000,
  })
}