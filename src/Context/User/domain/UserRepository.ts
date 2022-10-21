import User from './User'
import UserName from './value-objects/UserName'

export default interface UserRepository {
  save: (user: User) => Promise<void>
  search: (name: UserName) => Promise<User | null>
}
