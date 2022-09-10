import { UnauthorizedError } from '@application/helpers/api-erros'
import { isValid } from '@infra/jwt'
import { NextFunction, Request, Response } from 'express'

const expressVerifyToken = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization

  if (authToken === undefined) {
    throw new UnauthorizedError('Token is missing')
  }

  const [, token] = authToken.split(' ')

  if (isValid(token)) return next()

  throw new UnauthorizedError('Invalid token')
}

export { expressVerifyToken }
