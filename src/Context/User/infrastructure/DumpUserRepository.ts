import User from '../domain/User'
import UserRepository from '../domain/UserRepository'

export default class DumpUserRepository implements UserRepository {
  save (_user: User): void {
    console.log('User saved!')
  }
}
