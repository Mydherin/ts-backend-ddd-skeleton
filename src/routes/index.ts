import { Router, Request, Response } from 'express'
import glob from 'glob'
import { ValidationError, validationResult } from 'express-validator'
import httpStatus from 'http-status'
import path from 'path'

export function registerRoutes (router: Router): void {
  const routes = glob.sync(path.join(__dirname, '/**/*.route.*'))
  routes.map(route => register(route, router))
}

function register (routePath: string, router: Router): void {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const route = require(routePath)
  route.register(router)
}

export function validateReqSchema (req: Request, res: Response, next: Function): Response {
  const validationErrors = validationResult(req)
  if (validationErrors.isEmpty()) {
    return next()
  }
  const errors = validationErrors.array().map((err: ValidationError) => ({ [err.param]: err.msg }))

  return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
    errors
  })
}
