import User from '../domain/User'
import UserRepository from '../domain/UserRepository'
import UserEmail from '../domain/value-objects/UserEmail'
import UserName from '../domain/value-objects/UserName'
import UserPassword from '../domain/value-objects/UserPassword'
import UserCreatorRequest from './UserCreatorRequest'
import UserCase from '../../Shared/application/UseCase'
import DuplicatedUserError from './errors/DuplicatedUserError'

export default class UserCreator implements UserCase<UserCreatorRequest> {
  private readonly repository: UserRepository

  constructor (repository: UserRepository) {
    // Define user repository
    this.repository = repository
  }

  // Run use case method
  async run (request: UserCreatorRequest): Promise<void> {
    // Create value objects
    const name: UserName = new UserName(request.name)
    const password: UserPassword = new UserPassword(request.password)
    const email: UserEmail = new UserEmail(request.email)

    // Create user
    const user = new User({ name, password, email })

    // Get user from repositiory
    const repositioryUser = await this.repository.search(name)
    // Check if the user exists in repository
    if (repositioryUser === null) {
      // Save user
      await this.repository.save(user)
    } else {
      // Throw existing user error
      throw new DuplicatedUserError(`The user <${name.value}> has already registered`)
    }
  }
}
