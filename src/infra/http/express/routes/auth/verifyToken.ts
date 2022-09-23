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

  try {
    const valid = isValid(authToken.split(' ')[1])
    if (valid) return next()
  } catch (_error) {
    throw new UnauthorizedError('Invalid token')
  }
}

export { expressVerifyToken }
