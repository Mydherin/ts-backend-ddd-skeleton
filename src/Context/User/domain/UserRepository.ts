import User from './User'
import UserId from './value-objects/UserId'

export default interface UserRepository {
  save: (user: User) => Promise<void>
  search: (id: UserId) => Promise<User | null>
}
