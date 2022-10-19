import User from './User'

export default interface UserRepository {
  save: (user: User) => void
}
