import User from '../domain/User'
import UserRepository from '../domain/UserRepository'
import UserEmail from '../domain/value-objects/UserEmail'
import UserId from '../domain/value-objects/UserId'
import UserName from '../domain/value-objects/UserName'
import UserPassword from '../domain/value-objects/UserPassword'
import UserCreatorRequest from './UserCreatorRequest'
import UserCase from '../../Shared/application/UseCase'

export default class UserCreator implements UserCase<UserCreatorRequest> {
  private readonly repository: UserRepository

  constructor (repository: UserRepository) {
    // Define user repository
    this.repository = repository
  }

  // Run use case method
  async run (request: UserCreatorRequest): Promise<void> {
    // Create value objects
    const id: UserId = new UserId(request.id)
    const name: UserName = new UserName(request.name)
    const password: UserPassword = new UserPassword(request.password)
    const email: UserEmail = new UserEmail(request.email)

    // Create user
    const user = new User({ id, name, password, email })

    // Save user
    await this.repository.save(user)
  }
}
