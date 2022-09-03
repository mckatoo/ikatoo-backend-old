import { isValid } from '@infra/jwt'
import { NextFunction, Request, Response } from 'express'
import { UnauthorizedError } from '../helpers/api-erros'

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
