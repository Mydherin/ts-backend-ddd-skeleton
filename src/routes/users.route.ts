import { Router, Request, Response } from 'express'
import { body } from 'express-validator'
import UsersPutController from '../controllers/UsersPutController'
import validateReqSchema from './validate'

export default function register (router: Router): void {
  // Define validation schema
  const reqSchema = [
    body('id').exists().isString(),
    body('name').exists().isString(),
    body('password').exists().isString(),
    body('email').exists().isString()
  ]
  // Instance controller
  const controller = new UsersPutController()
  // Handle the request
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.put('/users', reqSchema, validateReqSchema, async (req: Request, res: Response) => {
    await controller.run(req, res)
  })
}
