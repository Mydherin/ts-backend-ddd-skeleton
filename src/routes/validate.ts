import { ValidationError, validationResult } from 'express-validator'
import httpStatus from 'http-status'
import { Request, Response } from 'express'

export default function validateReqSchema (req: Request, res: Response, next: Function): void {
  // Do the validation
  const validationErrors = validationResult(req)
  if (validationErrors.isEmpty()) {
    // Continue if everything is success
    return next()
  }

  // Parse errors
  const errors = validationErrors.array().map((err: ValidationError) => ({ [err.param]: err.msg }))

  // Send errors in a response
  res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
    errors
  })
}
