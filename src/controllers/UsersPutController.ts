import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { Controller } from './Controller'
import getContainer from '../factories'
import UserCreator from '../Context/User/application/UserCreator'
import InvalidUuidError from '../Context/Shared/domain/errors/InvalidUuidError'
import InvalidArgument from '../Context/Shared/domain/errors/InvalidArgument'
import InvalidUsernamedError from '../Context/Shared/domain/errors/InvalidUsernameError'
import InvalidPasswordError from '../Context/Shared/domain/errors/InvalidPasswordError'
import InvalidEmailError from '../Context/Shared/domain/errors/InvalidEmailError'

export default class UsersPutController implements Controller {
  async run (req: Request, res: Response): Promise<void> {
    // Instance container dependency injection
    const container = await getContainer()
    // Instance the use case
    const useCase: UserCreator = container.get('App.Context.User.application.UserCreator')
    // Get data from request
    const { id, name, password, email } = req.body
    try {
      // Run use case
      useCase.run({ id, name, password, email })
      // Return response
      res.status(httpStatus.CREATED).send()
    } catch (error) {
      // If an argument is not valid
      if (error instanceof InvalidArgument) {
        const errors = []
        if (error instanceof InvalidUuidError) { // Invalid UUID error
          errors.push({
            id: 'Invalid value'
          })
        } else if (error instanceof InvalidUsernamedError) {
          errors.push({
            name: 'Invalid value'
          })
        } else if (error instanceof InvalidPasswordError) {
          errors.push({
            password: 'Invalid value'
          })
        } else if (error instanceof InvalidEmailError) {
          errors.push({
            email: 'Invalid value'
          })
        }
        res.status(httpStatus.UNPROCESSABLE_ENTITY).json(errors)
      } else {
        throw error
      }
    }
  }
}
